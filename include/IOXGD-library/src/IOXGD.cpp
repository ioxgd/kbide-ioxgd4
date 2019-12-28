#ifndef __IOXGD_CPP__
#define __IOXGD_CPP__

#include "IOXGD.h"

static Ticker tickLV; /* timer for interrupt handler */
#define LVGL_TICK_PERIOD 20

#define DISPLAY_BUFFER_SIZE 512000
static lv_disp_buf_t disp_buf;
static lv_color_t buf[DISPLAY_BUFFER_SIZE];

static void disp_flush(lv_disp_drv_t *disp, const lv_area_t *area, lv_color_t *color_p) {
    lcd.startPushColor(area->x1, area->y1, area->x2, area->y2);
    lcd.pushColorBlock((uint16_t*)color_p, (area->y2 - area->y1 + 1) * (area->x2 - area->x1 + 1));
    lcd.stopPushColor();

    lv_disp_flush_ready(disp); /* tell lvgl that flushing is done */
}

static void lv_tick_handler(void) {
    lv_tick_inc(LVGL_TICK_PERIOD);
}

static bool touch_pointer(lv_indev_drv_t * drv, lv_indev_data_t*data) {
    uint16_t x, y;
    data->state = touch.read(&x, &y) > 0 ? LV_INDEV_STATE_PR : LV_INDEV_STATE_REL;
    data->point.x = x;
    data->point.y = y;
    return false;
}

static File f;

static lv_fs_res_t lv_sd_open(lv_fs_drv_t * drv, void * file_p, const char * fn, lv_fs_mode_t mode) {
  if (!SD.exists(fn)) {
    Serial.print("File ");
    Serial.print(fn);
    Serial.println(" doesn't exist.");

    return LV_FS_RES_UNKNOWN;
  }

  f = SD.open(fn, mode == LV_FS_MODE_WR ? FILE_WRITE : FILE_READ);
  if (!f) {
    Serial.println("Open " + String(fn) + " fail");
    return LV_FS_RES_UNKNOWN;
  }
  f.seek(0);

  return LV_FS_RES_OK;
}

static lv_fs_res_t lv_sd_close(lv_fs_drv_t * drv, void * file_p) {
  f.close();
  return LV_FS_RES_OK;
}

static lv_fs_res_t lv_sd_read(lv_fs_drv_t * drv, void * file_p, void * buf, uint32_t btr, uint32_t * br) {
  *br = f.read((uint8_t*)buf, btr);
  return LV_FS_RES_OK;
}

static lv_fs_res_t lv_sd_write(lv_fs_drv_t *drv, void *file_p, const void *buf, uint32_t btw, uint32_t *bw) {
  uint32_t write_size = f.write((uint8_t*)buf, btw);
  if (bw) {
    *bw = write_size;
  }
  return LV_FS_RES_OK;
}

static lv_fs_res_t lv_sd_seek(lv_fs_drv_t * drv, void * file_p, uint32_t pos) {
  f.seek(pos);
  return LV_FS_RES_OK;
}

static lv_fs_res_t lv_sd_tell(lv_fs_drv_t * drv, void * file_p, uint32_t * pos_p) {
  *pos_p = f.position();
  return LV_FS_RES_OK;
}

static lv_fs_res_t lv_sd_size(lv_fs_drv_t *drv, void *file_p, uint32_t *size_p) {
  *size_p = f.size();
  return LV_FS_RES_OK;
}

IOXGD::IOXGD() { }

void IOXGD::begin(uint16_t option) {
    if (option & SETUP_LVGL) {
        lcd.init();
        touch.init();

        lv_init();

        lv_disp_buf_init(&disp_buf, buf, NULL, DISPLAY_BUFFER_SIZE);

        /*Initialize the display*/
        lv_disp_drv_t disp_drv;
        lv_disp_drv_init(&disp_drv);
        disp_drv.hor_res = LCD_WIDTH;
        disp_drv.ver_res = LCD_HEIGHT;
        disp_drv.flush_cb = disp_flush;
        disp_drv.buffer = &disp_buf;
        lv_disp_drv_register(&disp_drv);

        /*Initialize the Input*/
        lv_indev_drv_t indev_drv;
        lv_indev_drv_init(&indev_drv);
        indev_drv.type = LV_INDEV_TYPE_POINTER;
        indev_drv.read_cb = touch_pointer;
        lv_indev_drv_register(&indev_drv);

        /*Initialize the graphics library's tick*/
        tickLV.attach_ms(LVGL_TICK_PERIOD, lv_tick_handler);
    }

    if (option & SETUP_EEPROM) {
        EEPROM.begin();
    }

    if (option & SETUP_BUZZER) {
        pinMode(BUZZER_PIN, OUTPUT);
    }

    if (option & SETUP_SD) {
        if (!SD.begin(29)) {
            Serial.println("initialization SD card failed.");
        } else {
            lv_fs_drv_t drv;
            lv_fs_drv_init(&drv);

            drv.letter = 'S';
            drv.file_size = 0;
            drv.open_cb = lv_sd_open;
            drv.close_cb = lv_sd_close;
            drv.read_cb = lv_sd_read;
            drv.write_cb = lv_sd_write;
            drv.seek_cb = lv_sd_seek;
            drv.tell_cb = lv_sd_tell;
            drv.size_cb = lv_sd_size;

            lv_fs_drv_register(&drv);
        }
    }

    if (option & SETUP_PNG_DECODE) {
        png_decoder_init();
    }
}

void IOXGD::startFreeRTOS() {
    xTaskCreate([](void*) {
        while (1) {
            lv_task_handler();
            vTaskDelay(5 / portTICK_PERIOD_MS);
        }
    }, "lvLoopTask", 32768, NULL, 1, NULL);

    systemEventGroup = xEventGroupCreate();

    if (systemEventGroup != NULL) {
        xTaskCreate([](void*) {
            while (1) {
                EventBits_t uxBits = xEventGroupWaitBits(systemEventGroup, 0x01, pdTRUE, pdFALSE, portMAX_DELAY);
                if((uxBits & 0x01) != 0) {
                    tone(BUZZER_PIN, 2.7E3);
                    vTaskDelay(50 / portTICK_PERIOD_MS);
                    noTone(BUZZER_PIN);
                }
            }
        }, "soundTask", 512, NULL, 5, NULL);
    } else {
        Serial.println("The event group was not created because there was insufficient, FreeRTOS heap available.");
    }

    vTaskStartScheduler();
}

void IOXGD::beep() {
    if (systemEventGroup != NULL) {
        xEventGroupSetBits(systemEventGroup, 0x01);
    } else {
        tone(BUZZER_PIN, 2.7E3);
        delay(50);
        noTone(BUZZER_PIN);
    }
}

IOXGD gd;

#endif