#ifndef __IOXGD_H__
#define __IOXGD_H__

#include "Arduino.h"
#include "lcd/R61408.h"
#include "touch/FT5216.h"
#include "eeprom/I2CEEPROM.h"
#include "pngdecode/png_decoder.h"
#include "rtc/DS3231.h"

// WiFi
#include "wifi/ESP32WiFi.h"
#include "wifi/ESP32HTTP.h"
#include "wifi/ESP32NTP.h"
#include "wifi/ESP32BT.h"
#include "wifi/ESP32TCP.h"
#include "wifi/ESP32UDP.h"

#include <lvgl.h>
#include <Ticker.h>

#include <SPI.h>
#include <SD.h>

#include <FreeRTOS.h>
#include <task.h>
#include <event_groups.h>

#define BUZZER_PIN 37

#define SETUP_LVGL       0x01
#define SETUP_EEPROM     0x02
#define SETUP_SD         0x04
#define SETUP_PNG_DECODE 0x08
#define SETUP_BUZZER     0x10

#define SETUP_ALL (SETUP_LVGL|SETUP_EEPROM|SETUP_SD|SETUP_PNG_DECODE|SETUP_BUZZER)

static EventGroupHandle_t systemEventGroup = NULL;

class IOXGD {
    private:
        

    public:
        IOXGD();

        void begin(uint16_t option = SETUP_ALL) ;
        void startFreeRTOS() ;
        void beep() ;

};

extern IOXGD gd;

#endif