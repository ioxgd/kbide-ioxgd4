module.exports = function(Blockly){
    Blockly.Blocks['wifi_connect'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("connect WiFi ssid")
                .appendField(new Blockly.FieldTextInput("test"), "ssid")
                .appendField("password")
                .appendField(new Blockly.FieldTextInput("test"), "password");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("connect WiFi");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['wifi_http_get'] = {
        init: function() {
            this.appendValueInput("url")
                .setCheck("String")
                .appendField(new Blockly.FieldImage("/static/icons/icons8_wifi_26px.png", 15, 15, "*"))
                .appendField("http GET url : ");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(270);
            this.setTooltip("send HTTP GET");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['wifi_http_post'] = {
        init: function() {
            this.appendValueInput("url")
                .setCheck("String")
                .appendField(new Blockly.FieldImage("/static/icons/icons8_wifi_26px.png", 15, 15, "*"))
                .appendField("http POST url : ");
            this.appendValueInput("data")
                .setCheck("String")
                .appendField("data");
            this.appendDummyInput()
                .appendField("content-type")
                .appendField(new Blockly.FieldDropdown([["text/html","text/html"], ["application/json","application/json"], ["application/x-www-form-urlencoded","application/x-www-form-urlencoded"], ["application/xml","application/xml"], ["multipart/form-data","multipart/form-data"], ["text/plain","text/plain"], ["text/xml","text/xml"], ["image/jpeg","image/jpeg"]]), "content_type");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(270);
            this.setTooltip("sent http POST to server");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['wifi_get_ip_addr'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("get IP address");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(270);
            this.setTooltip("get client IP address");
            this.setHelpUrl("");
        }
    };
}