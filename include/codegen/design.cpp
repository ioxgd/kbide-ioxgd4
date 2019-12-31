#include "lvgl.h"

LV_FONT_DECLARE(supermarket_60);
LV_FONT_DECLARE(supermarket_120);
LV_FONT_DECLARE(supermarket_30);
static lv_style_t txt1_style;
lv_obj_t* txt1;
static lv_style_t txt2_style;
lv_obj_t* txt2;
static lv_style_t txt3_style;
lv_obj_t* txt3;
static lv_style_t obj1_style;
lv_obj_t* obj1;


void loadPage(){
static lv_style_t style_screen;
lv_style_copy(&style_screen, &lv_style_plain);
style_screen.body.main_color = lv_color_hex(0x1F3DFF);
style_screen.body.grad_color = lv_color_hex(0x40FFA6);
lv_obj_set_style(lv_scr_act(), &style_screen);

lv_style_copy(&txt1_style, &lv_style_plain);
txt1_style.text.color = lv_color_hex(0xFFFFFF);
txt1_style.text.font = &supermarket_60;

txt1 = lv_label_create(lv_scr_act(), NULL);
lv_label_set_style(txt1, LV_LABEL_STYLE_MAIN, &txt1_style);
lv_label_set_long_mode(txt1, LV_LABEL_LONG_EXPAND);
lv_label_set_align(txt1, LV_LABEL_ALIGN_LEFT);
lv_label_set_text(txt1, "นาฬิกาดิจิทัล");
lv_obj_set_size(txt1, 0, 0);
lv_obj_align(txt1, NULL, LV_ALIGN_IN_TOP_MID, 0, 30);

lv_obj_set_hidden(txt1, false);
lv_style_copy(&txt2_style, &lv_style_plain);
txt2_style.text.color = lv_color_hex(0xFFFFFF);
txt2_style.text.font = &supermarket_120;

txt2 = lv_label_create(lv_scr_act(), NULL);
lv_label_set_style(txt2, LV_LABEL_STYLE_MAIN, &txt2_style);
lv_label_set_long_mode(txt2, LV_LABEL_LONG_EXPAND);
lv_label_set_align(txt2, LV_LABEL_ALIGN_LEFT);
lv_label_set_text(txt2, "Loading...");
lv_obj_set_size(txt2, 0, 0);
lv_obj_align(txt2, NULL, LV_ALIGN_CENTER, 0, 20);

lv_obj_set_hidden(txt2, false);
lv_style_copy(&txt3_style, &lv_style_plain);
txt3_style.text.color = lv_color_hex(0x000000);
txt3_style.text.font = &supermarket_30;

txt3 = lv_label_create(lv_scr_act(), NULL);
lv_label_set_style(txt3, LV_LABEL_STYLE_MAIN, &txt3_style);
lv_label_set_long_mode(txt3, LV_LABEL_LONG_EXPAND);
lv_label_set_align(txt3, LV_LABEL_ALIGN_LEFT);
lv_label_set_text(txt3, "พัฒนาด้วย IOXGD Designer & KBIDE");
lv_obj_set_size(txt3, 0, 0);
lv_obj_align(txt3, NULL, LV_ALIGN_IN_BOTTOM_MID, 0, -20);

lv_obj_set_hidden(txt3, false);
lv_style_copy(&obj1_style, &lv_style_plain);
obj1_style.body.main_color = lv_color_hex(0xFFFFFF);
obj1_style.body.grad_color = lv_color_hex(0xFFFFFF);
obj1_style.body.radius = 0;
obj1_style.body.opa = 255;
obj1_style.body.border.color = lv_color_hex(0x000000);
obj1_style.body.border.width = 0;
obj1_style.body.border.opa = 255;
obj1_style.body.shadow.color = lv_color_hex(0x000000);
obj1_style.body.shadow.width = 0;
obj1_style.body.shadow.type = LV_SHADOW_FULL;

obj1 = lv_obj_create(lv_scr_act(), NULL);
lv_obj_set_style(obj1, &obj1_style);
lv_obj_set_size(obj1, 200, 6);
lv_obj_align(obj1, NULL, LV_ALIGN_IN_TOP_MID, 0, 110);

lv_obj_set_hidden(obj1, false);

}