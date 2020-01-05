const { exec } = require('child_process');
const remote = require('electron').remote;
const dialog = remote.dialog;
const fs = require("fs");
const path = require('path');
const { promisify } = require('util');
const http = require('http');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

var gdContent;

var lv_font_conv = `${__dirname}/bin/`;
if (process.platform === 'win32') {
    if (process.arch === 'x64') {
        lv_font_conv += 'lv_font_conv_v0.4.1_x64.exe';
    } else {
        lv_font_conv += 'lv_font_conv_v0.4.1_x86.exe';
    }
} else if (process.platform === 'darwin') {
    lv_font_conv += 'lv_font_conv_v0.4.1_darwin';
} else if (process.platform === 'linux') {
    lv_font_conv += 'lv_font_conv_v0.4.1_linux';
}
lv_font_conv = path.resolve(lv_font_conv);

function execShellCommand(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
            console.warn(error);
            }
            resolve(stdout, stderr);
        });
    });
}

let fileDownload = (url, dest) => {
    let file = fs.createWriteStream(dest);
    return new Promise((resolve, reject) => {
        http.get(url, function(response) {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest);
            reject(err.message);
        });
    });
}

let getFontFromName = (name) => gdContent.font.find((item) => item.name === name);

let propertyToAlign = (property) => {
    let obj_align;
    if (property.alignX === 0 && property.alignY === 0) {
      obj_align = "LV_ALIGN_IN_TOP_LEFT";
    } else if (property.alignX === 1 && property.alignY === 0) {
      obj_align = "LV_ALIGN_IN_TOP_MID";
    } else if (property.alignX === 2 && property.alignY === 0) {
      obj_align = "LV_ALIGN_IN_TOP_RIGHT";
    } else if (property.alignX === 0 && property.alignY === 1) {
      obj_align = "LV_ALIGN_IN_LEFT_MID";
    } else if (property.alignX === 1 && property.alignY === 1) {
      obj_align = "LV_ALIGN_CENTER";
    } else if (property.alignX === 2 && property.alignY === 1) {
      obj_align = "LV_ALIGN_IN_RIGHT_MID";
    } else if (property.alignX === 0 && property.alignY === 2) {
      obj_align = "LV_ALIGN_IN_BOTTOM_LEFT";
    } else if (property.alignX === 1 && property.alignY === 2) {
      obj_align = "LV_ALIGN_IN_BOTTOM_MID";
    } else if (property.alignX === 2 && property.alignY === 2) {
      obj_align = "LV_ALIGN_IN_BOTTOM_RIGHT";
    }
    return obj_align;
}

let build = {
    Object: async function() {
        let header = "";
        let code = "";
  
        header += `static lv_style_t ${this.property.name}_style;\n`;
  
        code += `lv_style_copy(&${this.property.name}_style, &lv_style_plain);\n`;
        code += `${this.property.name}_style.body.main_color = lv_color_hex(0x${this.property.main_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.grad_color = lv_color_hex(0x${this.property.grad_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.radius = ${this.property.radius};\n`;
        code += `${this.property.name}_style.body.opa = ${this.property.opacity};\n`;
        code += `${this.property.name}_style.body.border.color = lv_color_hex(0x${this.property.border_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.border.width = ${this.property.border_width};\n`;
        code += `${this.property.name}_style.body.border.opa = ${this.property.border_opacity};\n`;
        code += `${this.property.name}_style.body.shadow.color = lv_color_hex(0x${this.property.shadow_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.shadow.width = ${this.property.shadow_width};\n`;
        code += `${this.property.name}_style.body.shadow.type = ${this.property.shadow_type == 0 ? 'LV_SHADOW_BOTTOM' : 'LV_SHADOW_FULL'};\n`;
        code += `\n`;
    
        header += `lv_obj_t* ${this.property.name};\n`;
  
        code += `${this.property.name} = lv_obj_create(lv_scr_act(), NULL);\n`;
        code += `lv_obj_set_style(${this.property.name}, &${this.property.name}_style);\n`;
        code += `lv_obj_set_size(${this.property.name}, ${this.property.width}, ${this.property.height});\n`;
        code += `lv_obj_align(${this.property.name}, NULL, ${propertyToAlign(this.property)}, ${this.property.x}, ${this.property.y});\n`;
        code += `\n`;
        
        code += `lv_obj_set_hidden(${this.property.name}, ${this.property.hidden === 0 ? 'true' : 'false'});`;
        code += `\n`;
  
        return { header, code };
    },
    Label: async function() {
        let long_mode_list = [
          'LV_LABEL_LONG_EXPAND',
          'LV_LABEL_LONG_BREAK',
          'LV_LABEL_LONG_DOTS',
          'LV_LABEL_LONG_SROLL',
          'LV_LABEL_LONG_SROLL_CIRC',
          'LV_LABEL_LONG_CROP'
        ];
        let text_align_list = [
          'LV_LABEL_ALIGN_LEFT',
          'LV_LABEL_ALIGN_CENTER',
          'LV_LABEL_ALIGN_RIGHT'
        ];
    
        let font = getFontFromName(this.property.font);
    
        let code = "";
        let header = "";
    
        // Style
        header += `static lv_style_t ${this.property.name}_style;\n`;
    
        code += `lv_style_copy(&${this.property.name}_style, &lv_style_plain);\n`;
        code += `${this.property.name}_style.text.color = lv_color_hex(0x${this.property.color.substring(1)});\n`;
        code += `${this.property.name}_style.text.font = &${typeof font.variable !== "undefined" ? font.variable : font.name};\n`;
        code += `\n`;
    
        // Label object
        header += `lv_obj_t* ${this.property.name};\n`;
    
        code += `${this.property.name} = lv_label_create(lv_scr_act(), NULL);\n`;
        code += `lv_label_set_style(${this.property.name}, LV_LABEL_STYLE_MAIN, &${this.property.name}_style);\n`;
        code += `lv_label_set_long_mode(${this.property.name}, ${long_mode_list[this.property.mode]});\n`;
        code += `lv_label_set_align(${this.property.name}, ${text_align_list[this.property.text_align]});\n`;
        code += `lv_label_set_text(${this.property.name}, "${this.property.text}");\n`;
        code += `lv_obj_set_size(${this.property.name}, ${this.property.width}, ${this.property.height});\n`;
        code += `lv_obj_align(${this.property.name}, NULL, ${propertyToAlign(this.property)}, ${this.property.x}, ${this.property.y});\n`;
        code += `\n`;
    
        code += `lv_obj_set_hidden(${this.property.name}, ${this.property.hidden === 0 ? 'true' : 'false'});`;
        code += `\n`;
    
        return { header, code };
    },
    Button: async function() {
        let font = getFontFromName(this.property.font);

        let code = "";
        let header = "";

        // Button REL Style
        header += `static lv_style_t ${this.property.name}_rel_style;\n`;

        code += `lv_style_copy(&${this.property.name}_rel_style, &lv_style_plain);\n`;
        code += `${this.property.name}_rel_style.body.main_color = lv_color_hex(0x${this.property.rel_main_color.substring(1)});\n`;
        code += `${this.property.name}_rel_style.body.grad_color = lv_color_hex(0x${this.property.rel_grad_color.substring(1)});\n`;
        code += `${this.property.name}_rel_style.body.radius = ${this.property.radius};\n`;
        code += `${this.property.name}_rel_style.body.border.color = lv_color_hex(0x${this.property.border_color.substring(1)});\n`;
        code += `${this.property.name}_rel_style.body.border.width = ${this.property.border_width};\n`;
        code += `\n`;

        // Button PR Style
        header += `static lv_style_t ${this.property.name}_pr_style;\n`;

        code += `lv_style_copy(&${this.property.name}_pr_style, &lv_style_plain);\n`;
        code += `${this.property.name}_pr_style.body.main_color = lv_color_hex(0x${this.property.pr_main_color.substring(1)});\n`;
        code += `${this.property.name}_pr_style.body.grad_color = lv_color_hex(0x${this.property.pr_grad_color.substring(1)});\n`;
        code += `${this.property.name}_pr_style.body.radius = ${this.property.radius};\n`;
        code += `${this.property.name}_pr_style.body.border.color = lv_color_hex(0x${this.property.border_color.substring(1)});\n`;
        code += `${this.property.name}_pr_style.body.border.width = ${this.property.border_width};\n`;
        code += `\n`;

        // Button object
        header += `lv_obj_t* ${this.property.name};\n`;
        
        code += `${this.property.name} = lv_btn_create(lv_scr_act(), NULL);\n`;
        code += `// lv_obj_set_event_cb(${this.property.name}, event_handler); // TODO\n`;
        code += `lv_btn_set_style(${this.property.name}, LV_BTN_STATE_REL, &${this.property.name}_rel_style);\n`;
        code += `lv_btn_set_style(${this.property.name}, LV_BTN_STATE_PR, &${this.property.name}_pr_style);\n`;
        code += `lv_obj_set_size(${this.property.name}, ${this.property.width}, ${this.property.height});\n`;
        code += `lv_obj_align(${this.property.name}, NULL, ${propertyToAlign(this.property)}, ${this.property.x}, ${this.property.y});\n`;
        code += `\n`;

        // Label object
        header += `static lv_style_t ${this.property.name}_label_style;\n`;

        code += `lv_style_copy(&${this.property.name}_label_style, &lv_style_plain);\n`;
        code += `${this.property.name}_label_style.text.color = lv_color_hex(0x${this.property.color.substring(1)});\n`;
        code += `${this.property.name}_label_style.text.font = &${typeof font.variable !== "undefined" ? font.variable : font.name};\n`;

        header += `lv_obj_t* ${this.property.name}_label;\n`;

        code += `${this.property.name}_label = lv_label_create(${this.property.name}, NULL);\n`;
        code += `lv_label_set_style(${this.property.name}_label, LV_LABEL_STYLE_MAIN, &${this.property.name}_label_style);\n`;
        code += `lv_label_set_text(${this.property.name}_label, "${this.property.text}");\n`;
        code += `\n`;

        code += `lv_obj_set_hidden(${this.property.name}, ${this.property.hidden === 0 ? 'true' : 'false'});`;
        code += `\n`;

        return { header, code };
    },
    LED: async function() {
        let code = "";
        let header = "";
    
        // Style
        header += `static lv_style_t ${this.property.name}_style;\n`;
    
        code += `lv_style_copy(&${this.property.name}_style, &lv_style_plain);\n`;
        code += `${this.property.name}_style.body.main_color = lv_color_hex(0x${this.property.main_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.grad_color = lv_color_hex(0x${this.property.grad_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.radius = LV_RADIUS_CIRCLE;\n`;
        code += `${this.property.name}_style.body.border.color = lv_color_hex(0x${this.property.border_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.border.width = ${this.property.border_width};\n`;
        code += `${this.property.name}_style.body.border.opa = ${this.property.border_opacity};\n`;
        code += `${this.property.name}_style.body.shadow.color = lv_color_hex(0x${this.property.shadow_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.shadow.width = ${this.property.shadow_width};\n`;
        code += `\n`;
    
        // LED object
        header += `lv_obj_t* ${this.property.name};\n`;
    
        code += `${this.property.name} = lv_led_create(lv_scr_act(), NULL);\n`;
        code += `lv_obj_set_style(${this.property.name}, &${this.property.name}_style);\n`;
        code += `lv_obj_set_size(${this.property.name}, ${this.property.width}, ${this.property.height});\n`;
        code += `lv_obj_align(${this.property.name}, NULL, ${propertyToAlign(this.property)}, ${this.property.x}, ${this.property.y});\n`;
        code += `lv_led_set_bright(${this.property.name}, ${this.property.bright});\n`;
        code += `\n`;
    
        code += `lv_obj_set_hidden(${this.property.name}, ${this.property.hidden === 0 ? 'true' : 'false'});`;
        code += `\n`;

        return { header, code };
    },
    Image: async function() {
        let code = "";
        let header = "";
    
        // Image object
        header += `lv_obj_t* ${this.property.name};\n`;
        
        code += `${this.property.name} = lv_img_create(lv_scr_act(), NULL);\n`;
        code += `// lv_img_set_src(${this.property.name}, "${this.property.src}"); // TODO\n`;
        code += `lv_obj_align(${this.property.name}, NULL, ${propertyToAlign(this.property)}, ${this.property.x}, ${this.property.y});\n`;
        code += `\n`;
    
        code += `lv_obj_set_hidden(${this.property.name}, ${this.property.hidden === 0 ? 'true' : 'false'});`;
        code += `\n`;

        return { header, code };
    },
    Chart: async function() {
        let code = "";
        let header = "";
    
        // Button PR Style
        header += `static lv_style_t ${this.property.name}_style;\n`;
    
        code += `lv_style_copy(&${this.property.name}_style, &lv_style_plain);\n`;
        code += `${this.property.name}_style.body.main_color = lv_color_hex(0x${this.property.background_main_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.grad_color = lv_color_hex(0x${this.property.background_grad_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.radius = ${this.property.radius};\n`;
        code += `${this.property.name}_style.body.border.color = lv_color_hex(0x${this.property.border_color.substring(1)});\n`;
        code += `${this.property.name}_style.body.border.width = ${this.property.border_width};\n`;
        code += `${this.property.name}_style.line.color = lv_color_hex(0x${this.property.line_color.substring(1)});\n`;
        code += `${this.property.name}_style.line.width = ${this.property.line_width};\n`;
        code += `\n`;
    
        // Button object
        header += `lv_obj_t* ${this.property.name};\n`;
    
        code += `${this.property.name} = lv_chart_create(lv_scr_act(), NULL);\n`;
        code += `lv_chart_set_style(${this.property.name}, LV_CHART_STYLE_MAIN, &${this.property.name}_style);\n`;
        code += `lv_obj_set_size(${this.property.name}, ${this.property.width}, ${this.property.height});\n`;
        code += `lv_obj_align(${this.property.name}, NULL, ${propertyToAlign(this.property)}, ${this.property.x}, ${this.property.y});\n`;
        code += `lv_chart_set_type(${this.property.name}, LV_CHART_TYPE_POINT | LV_CHART_TYPE_LINE);\n`;
        code += `lv_chart_set_series_opa(${this.property.name}, LV_OPA_70);\n`;
        code += `lv_chart_set_series_width(${this.property.name}, ${this.property.series_width});\n`;
        code += `lv_chart_set_div_line_count(${this.property.name}, ${this.property.division_h}, ${this.property.division_v});\n`;
        code += `lv_chart_set_range(${this.property.name}, ${this.property.range_min}, ${this.property.range_max});\n`;
        code += `\n`;
    
        code += `lv_obj_set_hidden(${this.property.name}, ${this.property.hidden === 0 ? 'true' : 'false'});`;
        code += `\n`;
    
        return { header, code };
    },
    Switch: async function() {
        let code = "";
        let header = "";
    
        // Style
        header += `static lv_style_t ${this.property.name}_bg_style;\n`;
        header += `static lv_style_t ${this.property.name}_indic_style;\n`;
        header += `static lv_style_t ${this.property.name}_knob_on_style;\n`;
        header += `static lv_style_t ${this.property.name}_knob_off_style;\n`;
        header += "\n";
    
        code += `lv_style_copy(&${this.property.name}_bg_style, &lv_style_pretty);\n`;
        code += `${this.property.name}_bg_style.body.radius = LV_RADIUS_CIRCLE;\n`;
        code += `${this.property.name}_bg_style.body.main_color = lv_color_hex(0x${this.property.background_main_color.substring(1)});\n`;
        code += `${this.property.name}_bg_style.body.grad_color = lv_color_hex(0x${this.property.background_grad_color.substring(1)});\n`;
        code += `${this.property.name}_bg_style.body.padding.left = 0;\n`;
        code += `${this.property.name}_bg_style.body.padding.right = 0;\n`;
        code += `${this.property.name}_bg_style.body.padding.top = ${this.property.padding};\n`;
        code += `${this.property.name}_bg_style.body.padding.bottom = ${this.property.padding};\n`;
        code += `${this.property.name}_bg_style.body.border.color = lv_color_hex(0x${this.property.background_border_color.substring(1)});\n`;
        code += `${this.property.name}_bg_style.body.border.width = ${this.property.background_border_width};\n`;
        code += "\n";
    
        code += `lv_style_copy(&${this.property.name}_indic_style, &lv_style_pretty_color);\n`;
        code += `${this.property.name}_indic_style.body.radius = LV_RADIUS_CIRCLE;\n`;
        code += `${this.property.name}_indic_style.body.main_color = lv_color_hex(0x${this.property.indicator_main_color.substring(1)});\n`;
        code += `${this.property.name}_indic_style.body.grad_color = lv_color_hex(0x${this.property.indicator_grad_color.substring(1)});\n`;
        code += `${this.property.name}_indic_style.body.padding.left = 0;\n`;
        code += `${this.property.name}_indic_style.body.padding.right = 0;\n`;
        code += `${this.property.name}_indic_style.body.padding.top = 0;\n`;
        code += `${this.property.name}_indic_style.body.padding.bottom = 0;\n`;
        code += `${this.property.name}_indic_style.body.border.color = lv_color_hex(0x${this.property.indicator_border_color.substring(1)});\n`;
        code += `${this.property.name}_indic_style.body.border.width = ${this.property.indicator_border_width};\n`;
        code += "\n";
    
        code += `lv_style_copy(&${this.property.name}_knob_off_style, &lv_style_pretty);\n`;
        code += `${this.property.name}_knob_off_style.body.main_color = lv_color_hex(0x${this.property.knob_off_main_color.substring(1)});\n`;
        code += `${this.property.name}_knob_off_style.body.grad_color = lv_color_hex(0x${this.property.knob_off_grad_color.substring(1)});\n`;
        code += `${this.property.name}_knob_off_style.body.radius = LV_RADIUS_CIRCLE;\n`;
        code += `${this.property.name}_knob_off_style.body.shadow.color = lv_color_hex(0x${this.property.knob_shadow_color.substring(1)});\n`;
        code += `${this.property.name}_knob_off_style.body.shadow.width = ${this.property.knob_shadow_width};\n`;
        code += `${this.property.name}_knob_off_style.body.shadow.type = LV_SHADOW_BOTTOM;\n`;
        code += `${this.property.name}_knob_off_style.body.border.color = lv_color_hex(0x${this.property.knob_off_border_color.substring(1)});\n`;
        code += `${this.property.name}_knob_off_style.body.border.width = ${this.property.knob_off_border_width};\n`;
        code += "\n";
    
        code += `lv_style_copy(&${this.property.name}_knob_on_style, &lv_style_pretty_color);\n`;
        code += `${this.property.name}_knob_on_style.body.main_color = lv_color_hex(0x${this.property.knob_on_main_color.substring(1)});\n`;
        code += `${this.property.name}_knob_on_style.body.grad_color = lv_color_hex(0x${this.property.knob_on_grad_color.substring(1)});\n`;
        code += `${this.property.name}_knob_on_style.body.radius = LV_RADIUS_CIRCLE;\n`;
        code += `${this.property.name}_knob_on_style.body.shadow.color = lv_color_hex(0x${this.property.knob_shadow_color.substring(1)});\n`;
        code += `${this.property.name}_knob_on_style.body.shadow.width = ${this.property.knob_shadow_width};\n`;
        code += `${this.property.name}_knob_on_style.body.shadow.type = LV_SHADOW_BOTTOM;\n`;
        code += `${this.property.name}_knob_on_style.body.border.color = lv_color_hex(0x${this.property.knob_on_border_color.substring(1)});\n`;
        code += `${this.property.name}_knob_on_style.body.border.width = ${this.property.knob_on_border_width};\n`;
        code += "\n";
        
        header += `lv_obj_t* ${this.property.name};\n`;
    
        code += `${this.property.name} = lv_sw_create(lv_scr_act(), NULL);\n`;
        code += `lv_sw_set_style(${this.property.name}, LV_SW_STYLE_BG, &${this.property.name}_bg_style);\n`;
        code += `lv_sw_set_style(${this.property.name}, LV_SW_STYLE_INDIC, &${this.property.name}_indic_style);\n`;
        code += `lv_sw_set_style(${this.property.name}, LV_SW_STYLE_KNOB_ON, &${this.property.name}_knob_on_style);\n`;
        code += `lv_sw_set_style(${this.property.name}, LV_SW_STYLE_KNOB_OFF, &${this.property.name}_knob_off_style);\n`;
        code += `lv_obj_set_size(${this.property.name}, ${this.property.width}, ${this.property.height});\n`;
        code += `lv_obj_align(${this.property.name}, NULL, ${propertyToAlign(this.property)}, ${this.property.x}, ${this.property.y});\n`;
        code += `// lv_obj_set_event_cb(${this.property.name}, event_handler);\n`;
    
        if (this.property.value) {
          code += "\n";
          code += `lv_sw_on(${this.property.name}, LV_ANIM_OFF);\n`;
        }
        code += `\n`;
    
        code += `lv_obj_set_hidden(${this.property.name}, ${this.property.hidden === 0 ? 'true' : 'false'});`;
        code += `\n`;

        return { header, code };
    },
    Slider: async function() {
        let code = "";
        let header = "";
    
        // Style
        header += `static lv_style_t ${this.property.name}_bg_style;\n`;
        header += `static lv_style_t ${this.property.name}_indic_style;\n`;
        header += `static lv_style_t ${this.property.name}_knob_style;\n`;
        header += "\n";
    
        code += `lv_style_copy(&${this.property.name}_bg_style, &lv_style_pretty);\n`;
        code += `${this.property.name}_bg_style.body.radius = ${this.property.background_radius};\n`;
        code += `${this.property.name}_bg_style.body.main_color = lv_color_hex(0x${this.property.background_main_color.substring(1)});\n`;
        code += `${this.property.name}_bg_style.body.grad_color = lv_color_hex(0x${this.property.background_grad_color.substring(1)});\n`;
        code += `${this.property.name}_bg_style.body.padding.left = ${this.property.background_padding};\n`;
        code += `${this.property.name}_bg_style.body.padding.right = ${this.property.background_padding};\n`;
        code += `${this.property.name}_bg_style.body.padding.top = ${this.property.background_padding};\n`;
        code += `${this.property.name}_bg_style.body.padding.bottom = ${this.property.background_padding};\n`;
        code += `${this.property.name}_bg_style.body.border.color = lv_color_hex(0x${this.property.background_border_color.substring(1)});\n`;
        code += `${this.property.name}_bg_style.body.border.width = ${this.property.background_border_width};\n`;
        code += "\n";
    
        code += `lv_style_copy(&${this.property.name}_indic_style, &lv_style_pretty_color);\n`;
        code += `${this.property.name}_indic_style.body.radius = ${this.property.indicator_radius};\n`;
        code += `${this.property.name}_indic_style.body.main_color = lv_color_hex(0x${this.property.indicator_main_color.substring(1)});\n`;
        code += `${this.property.name}_indic_style.body.grad_color = lv_color_hex(0x${this.property.indicator_grad_color.substring(1)});\n`;
        code += `${this.property.name}_indic_style.body.padding.left = ${this.property.indicator_padding};\n`;
        code += `${this.property.name}_indic_style.body.padding.right = ${this.property.indicator_padding};\n`;
        code += `${this.property.name}_indic_style.body.padding.top = ${this.property.indicator_padding};\n`;
        code += `${this.property.name}_indic_style.body.padding.bottom = ${this.property.indicator_padding};\n`;
        code += `${this.property.name}_indic_style.body.border.color = lv_color_hex(0x${this.property.indicator_border_color.substring(1)});\n`;
        code += `${this.property.name}_indic_style.body.border.width = ${this.property.indicator_border_width};\n`;
        code += "\n";
    
        code += `lv_style_copy(&${this.property.name}_knob_style, &lv_style_pretty);\n`;
        code += `${this.property.name}_knob_style.body.main_color = lv_color_hex(0x${this.property.knob_main_color.substring(1)});\n`;
        code += `${this.property.name}_knob_style.body.grad_color = lv_color_hex(0x${this.property.knob_grad_color.substring(1)});\n`;
        code += `${this.property.name}_knob_style.body.radius = LV_RADIUS_CIRCLE;\n`;
        code += `${this.property.name}_knob_style.body.border.color = lv_color_hex(0x${this.property.knob_border_color.substring(1)});\n`;
        code += `${this.property.name}_knob_style.body.border.width = ${this.property.knob_border_width};\n`;
        code += "\n";
        
        header += `lv_obj_t* ${this.property.name};\n`;
    
        code += `${this.property.name} = lv_slider_create(lv_scr_act(), NULL);\n`;
        code += `lv_slider_set_style(${this.property.name}, LV_SLIDER_STYLE_BG, &${this.property.name}_bg_style);\n`;
        code += `lv_slider_set_style(${this.property.name}, LV_SLIDER_STYLE_INDIC, &${this.property.name}_indic_style);\n`;
        code += `lv_slider_set_style(${this.property.name}, LV_SLIDER_STYLE_KNOB, &${this.property.name}_knob_style);\n`;
        code += `lv_obj_set_size(${this.property.name}, ${this.property.width}, ${this.property.height});\n`;
        code += `lv_obj_align(${this.property.name}, NULL, ${propertyToAlign(this.property)}, ${this.property.x}, ${this.property.y});\n`;
        code += `// lv_obj_set_event_cb(${this.property.name}, event_handler);\n`;
    
        code += "\n";
        code += `lv_slider_set_range(${this.property.name}, ${this.property.range_min}, ${this.property.range_max});\n`;
        code += `lv_slider_set_value(${this.property.name}, ${this.property.value}, LV_ANIM_OFF);\n`;
        code += `\n`;
    
        code += `lv_obj_set_hidden(${this.property.name}, ${this.property.hidden === 0 ? 'true' : 'false'});`;
        code += `\n`;
        
        return { header, code };
    }
};

module.exports = async (file, cb) => {
    if (file.file) {
        gdContent = JSON.parse(fs.readFileSync(file.file));
    } else if (file.content) {
        gdContent = JSON.parse(file.content);
    }
    if (!cb) cb = () => { };

    if (!fs.existsSync(lv_font_conv)) {
        console.log('Downloading font converter');
        cb(false, `Downloading font converter`);
        await fileDownload(`http://dl.ioxgd.com/lv_font_conv-0.4.1/${path.basename(lv_font_conv)}`, lv_font_conv);
        cb(false, `Downloaded font converter`);
        console.log('Downloaded font converter');
    }

    let header = "", code = "";
    
    // ----- Font Convart ----- //
    for (let font of gdContent.font) {
        if (typeof font.variable !== "undefined") {
            continue;
        }

        header += `LV_FONT_DECLARE(${font.name});\n`;

        try {
            let output = path.resolve(`${__dirname}/../include/codegen/${font.name}.c`);
            if (fs.existsSync(output)) {
                console.log(`${font.name} use cache file`);
                cb(false, `${font.name} use cache file.`);
                continue;
            }
            if (!fs.existsSync(font.file)) {
                dialog.showErrorBox('Oops! Something went wrong!', `${font.name} can't convert to C array, ${font.file} not found.`);
                cb(true, `${font.name} can't convert to C array, ${font.file} not found.`);
                continue;
            }
            let cmd = `"${lv_font_conv}" --font "${font.file}" --bpp 4 --size ${font.size} -r ${font.range} --format lvgl --no-compress -o "${output}"`;
            // await execShellCommand(cmd);
            
            execShellCommand(cmd).then(async (stdout, stderr) => {
                if (stderr) {
                    dialog.showErrorBox('Oops! Something went wrong!', `${font.name} can't convert to C array, ${stderr}`);
                    cb(true, `${font.name} can't convert to C array, ${stderr}`);
                    return;
                }

                // Repalce Include
                const data = await readFileAsync(output, 'utf8');
                var result = data.replace(/#include \"lvgl\/lvgl.h\"/g, '#include "lvgl.h"');
                writeFileAsync(output, result, 'utf8').then(() => {
                  console.log(`${font.name} convarted`);
                  cb(false, `${font.name} convarted`);
                });
            });
            
        } catch(e) {
            dialog.showErrorBox('Oops! Something went wrong!', `${font.name} can't convert to C array`);
        }
    }
    // ----- END of Font Convart ----- //

    code += "static lv_style_t style_screen;\n";
    code += "lv_style_copy(&style_screen, &lv_style_plain);\n";
    code += `style_screen.body.main_color = lv_color_hex(0x${gdContent.page[0].background.main_color.substring(1)});\n`;
    code += `style_screen.body.grad_color = lv_color_hex(0x${gdContent.page[0].background.grad_color.substring(1)});\n`;
    code += "lv_obj_set_style(lv_scr_act(), &style_screen);\n"
    code += "\n";

    // ----- Componant Convart ----- //
    for (let [name, component] of Object.entries(gdContent.page[0].component)) {
        compCode = await build[component.name].bind(component)();
        header += compCode.header;
        code += compCode.code;
    }
    // ----- END of Componant Convart ----- //

    let cppout = path.resolve(`${__dirname}/../include/codegen/design.cpp`);
    await writeFileAsync(cppout, `
#include "lvgl.h"
    
${header}
    
void loadPage(){
  ${code}
}`);
    console.log("design.cpp write ok.");
    cb(false, `design.cpp write ok.`);
};
