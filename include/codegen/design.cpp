#include "lvgl.h"

LV_FONT_DECLARE(supermarket_60);
static lv_style_t btn1_rel_style;
static lv_style_t btn1_pr_style;
lv_obj_t* btn1;
static lv_style_t btn1_label_style;
lv_obj_t* btn1_label;
static lv_style_t btn2_rel_style;
static lv_style_t btn2_pr_style;
lv_obj_t* btn2;
static lv_style_t btn2_label_style;
lv_obj_t* btn2_label;
static lv_style_t led1_style;
lv_obj_t* led1;
static lv_style_t txt1_style;
lv_obj_t* txt1;


void loadPage(){
lv_style_copy(&btn1_rel_style, &lv_style_plain);
btn1_rel_style.body.main_color = lv_color_hex(0x76A2D0);
btn1_rel_style.body.grad_color = lv_color_hex(0x193A5D);
btn1_rel_style.body.radius = 6;
btn1_rel_style.body.border.color = lv_color_hex(0x0B1928);
btn1_rel_style.body.border.width = 2;

lv_style_copy(&btn1_pr_style, &lv_style_plain);
btn1_pr_style.body.main_color = lv_color_hex(0x336294);
btn1_pr_style.body.grad_color = lv_color_hex(0x10263C);
btn1_pr_style.body.radius = 6;
btn1_pr_style.body.border.color = lv_color_hex(0x0B1928);
btn1_pr_style.body.border.width = 2;

btn1 = lv_btn_create(lv_scr_act(), NULL);
// lv_obj_set_event_cb(btn1, event_handler); // TODO
lv_btn_set_style(btn1, LV_BTN_STATE_REL, &btn1_rel_style);
lv_btn_set_style(btn1, LV_BTN_STATE_PR, &btn1_pr_style);
lv_obj_set_size(btn1, 200, 100);
lv_obj_align(btn1, NULL, LV_ALIGN_CENTER, -110, 90);

lv_style_copy(&btn1_label_style, &lv_style_plain);
btn1_label_style.text.color = lv_color_hex(0xFFFFFF);
btn1_label_style.text.font = &supermarket_60;
btn1_label = lv_label_create(btn1, NULL);
lv_label_set_style(btn1_label, LV_LABEL_STYLE_MAIN, &btn1_label_style);
lv_label_set_text(btn1_label, "เปิด");

lv_obj_set_hidden(btn1, false);
lv_style_copy(&btn2_rel_style, &lv_style_plain);
btn2_rel_style.body.main_color = lv_color_hex(0x76A2D0);
btn2_rel_style.body.grad_color = lv_color_hex(0x193A5D);
btn2_rel_style.body.radius = 6;
btn2_rel_style.body.border.color = lv_color_hex(0x0B1928);
btn2_rel_style.body.border.width = 2;

lv_style_copy(&btn2_pr_style, &lv_style_plain);
btn2_pr_style.body.main_color = lv_color_hex(0x336294);
btn2_pr_style.body.grad_color = lv_color_hex(0x10263C);
btn2_pr_style.body.radius = 6;
btn2_pr_style.body.border.color = lv_color_hex(0x0B1928);
btn2_pr_style.body.border.width = 2;

btn2 = lv_btn_create(lv_scr_act(), NULL);
// lv_obj_set_event_cb(btn2, event_handler); // TODO
lv_btn_set_style(btn2, LV_BTN_STATE_REL, &btn2_rel_style);
lv_btn_set_style(btn2, LV_BTN_STATE_PR, &btn2_pr_style);
lv_obj_set_size(btn2, 200, 100);
lv_obj_align(btn2, NULL, LV_ALIGN_CENTER, 110, 90);

lv_style_copy(&btn2_label_style, &lv_style_plain);
btn2_label_style.text.color = lv_color_hex(0xFFFFFF);
btn2_label_style.text.font = &supermarket_60;
btn2_label = lv_label_create(btn2, NULL);
lv_label_set_style(btn2_label, LV_LABEL_STYLE_MAIN, &btn2_label_style);
lv_label_set_text(btn2_label, "ปิด");

lv_obj_set_hidden(btn2, false);
lv_style_copy(&led1_style, &lv_style_plain);
led1_style.body.main_color = lv_color_hex(0xB00F48);
led1_style.body.grad_color = lv_color_hex(0x500702);
led1_style.body.radius = LV_RADIUS_CIRCLE;
led1_style.body.border.color = lv_color_hex(0xFA0F00);
led1_style.body.border.width = 3;
led1_style.body.border.opa = 255;
led1_style.body.shadow.color = lv_color_hex(0xB00F48);
led1_style.body.shadow.width = 2;

led1 = lv_led_create(lv_scr_act(), NULL);
lv_obj_set_style(led1, &led1_style);
lv_obj_set_size(led1, 100, 100);
lv_obj_align(led1, NULL, LV_ALIGN_CENTER, 0, -50);
lv_led_set_bright(led1, 255);

lv_obj_set_hidden(led1, false);
lv_style_copy(&txt1_style, &lv_style_plain);
txt1_style.text.color = lv_color_hex(0xFF00B3);
txt1_style.text.font = &supermarket_60;

txt1 = lv_label_create(lv_scr_act(), NULL);
lv_label_set_style(txt1, LV_LABEL_STYLE_MAIN, &txt1_style);
lv_label_set_long_mode(txt1, LV_LABEL_LONG_EXPAND);
lv_label_set_align(txt1, LV_LABEL_ALIGN_LEFT);
lv_label_set_text(txt1, "หน้านี้เขียนด้วย KBProIDE");
lv_obj_set_size(txt1, 0, 0);
lv_obj_align(txt1, NULL, LV_ALIGN_IN_TOP_MID, 0, 20);

lv_obj_set_hidden(txt1, false);

}