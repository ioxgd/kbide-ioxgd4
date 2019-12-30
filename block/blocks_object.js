module.exports = function(Blockly) {
    let fineObject = (objectList) => {
        let list;
        if (typeof objectList === "object") {
            list = Vue.prototype.$global.ioxgd.component.filter((comp) => objectList.indexOf(comp.name) >= 0).map((comp) => [ comp.property.name, comp.property.name]);
        } else {
            list = Vue.prototype.$global.ioxgd.component.map((comp) => [ comp.property.name, comp.property.name]);
        }
        if (list.length <= 0) {
            list = [ [ 'NULL', 'NULL' ] ];
        }
        return list;
    };

    Blockly.Blocks['object_on_click'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("on click");
            this.appendStatementInput("callback")
                .setCheck(null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Button" ]);
        }
    };

    Blockly.Blocks['object_on_value_changed'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("on value changed");
            this.appendStatementInput("callback")
                .setCheck(null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Switch", "Slider" ]);
        }
    };

    Blockly.Blocks['object_show'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("Show");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject();
        }
    };

    Blockly.Blocks['object_hide'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("Hide");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject();
        }
    };

    Blockly.Blocks['object_set_text'] = {
        init: function() {
            this.appendValueInput("text")
                .setCheck(null)
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("set text");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Button", "Label" ]);
        }
    };

    Blockly.Blocks['object_led_on'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("set ON");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "LED" ]);
        }
    };

    Blockly.Blocks['object_led_off'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("set OFF");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "LED" ]);
        }
    };

    Blockly.Blocks['object_led_set_bright'] = {
        init: function() {
            this.appendValueInput("brightness")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("set brightness");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "LED" ]);
        }
    };

    Blockly.Blocks['object_slider_get_value'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("get value");
            this.setInputsInline(true);
            this.setOutput(true, "Number");
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Slider" ]);
        }
    };

    Blockly.Blocks['object_slider_set_value'] = {
        init: function() {
            this.appendValueInput("value")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("set value");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Slider" ]);
        }
    };

    Blockly.Blocks['object_chart_add_data'] = {
        init: function() {
            this.appendValueInput("data")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("add data");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Chart" ]);
        }
    };

    Blockly.Blocks['object_switch_get_state'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("get state");
            this.setInputsInline(true);
            this.setOutput(true, ["Boolean", "Number"]);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Switch" ]);
        }
    };

    Blockly.Blocks['object_switch_on'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("set ON");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Switch" ]);
        }
    };

    Blockly.Blocks['object_switch_off'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.generateOptions), "object")
                .appendField("set OFF");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        generateOptions: function() {
            return fineObject([ "Switch" ]);
        }
    };
};  