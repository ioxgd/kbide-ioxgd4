let defineObject = (name) => `#VARIABLEextern lv_obj_t *${name};#END`;

module.exports = function(Blockly) {
    Blockly.JavaScript['object_load_page'] = function(block) {
        var code = `
        #VARIABLEextern void loadPage();#END
        #SETUPloadPage();#END
        `;
        return code;
    };
    
    Blockly.JavaScript['object_on_click'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
        var code = 
        `${defineObject(dropdown_object)}
        #BLOCKSETUP
        lv_obj_set_event_cb(${dropdown_object}, [](lv_obj_t * obj, lv_event_t event) {
            if(event == LV_EVENT_CLICKED) {
                ${statements_callback}
            }
        });\n
        #END`;
        return code;
    };

    Blockly.JavaScript['object_on_value_changed'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
        var code = 
        `${defineObject(dropdown_object)}
        #BLOCKSETUP
        lv_obj_set_event_cb(${dropdown_object}, [](lv_obj_t * obj, lv_event_t event) {
            if(event == LV_EVENT_VALUE_CHANGED) {
                ${statements_callback}
            }
        });\n
        #END`;
        return code;
    };

    Blockly.JavaScript['object_show'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_obj_set_hidden(${dropdown_object}, false);\n`;
        return code;
    };

    Blockly.JavaScript['object_hide'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_obj_set_hidden(${dropdown_object}, true);\n`;
        return code;
    };

    Blockly.JavaScript['object_set_text'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var value_name = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${defineObject(dropdown_object)}\n lv_label_set_text(${dropdown_object}, String(${value_name}).c_str());\n`;
        return code;
    };

    Blockly.JavaScript['object_led_on'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_led_on(${dropdown_object});\n`;
        return code;
    };

    Blockly.JavaScript['object_led_off'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_led_off(${dropdown_object});\n`;
        return code;
    };

    Blockly.JavaScript['object_led_set_bright'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var value_brightness = Blockly.JavaScript.valueToCode(block, 'brightness', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${defineObject(dropdown_object)}\n lv_led_set_bright(${dropdown_object}, ${value_brightness});\n`;
        return code;
    };

    Blockly.JavaScript['object_slider_get_value'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_slider_get_value(${dropdown_object})`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.JavaScript['object_slider_set_value'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${defineObject(dropdown_object)}\n lv_slider_set_value(${dropdown_object}, ${value_value}, LV_ANIM_ON);\n`;
        return code;
    };

    Blockly.JavaScript['object_chart_add_data'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${defineObject(dropdown_object)}\n lv_chart_set_next(${dropdown_object}, ser1, ${value_data});\n`;
        return code;
    };

    Blockly.JavaScript['object_switch_get_state'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_sw_get_state(${dropdown_object})`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };

      Blockly.JavaScript['object_switch_on'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_sw_on(${dropdown_object}, LV_ANIM_ON);\n`;
        return code;
    };

    Blockly.JavaScript['object_switch_off'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_sw_off(${dropdown_object}, LV_ANIM_ON);\n`;
        return code;
    };
};
