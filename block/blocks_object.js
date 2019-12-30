module.exports = function(Blockly) {
    Blockly.Blocks['object_on_click'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("btn1", null, ["LVGL.Object"], ["LVGL.Object"]), "object")
                .appendField("on click");
            this.appendStatementInput("callback")
                .setCheck(null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['object_on_value_changed'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("slider1", null, ["LVGL.Object"], ["LVGL.Object"]), "object")
                .appendField("on value changed");
            this.appendStatementInput("callback")
                .setCheck(null);
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };


};  