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

    Blockly.Blocks['wifi_is_connected'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("WiFi is connected ?");
            this.setInputsInline(true);
            this.setOutput(true, ["Boolean", "Number"]);
            this.setColour(270);
            this.setTooltip("");
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

    Blockly.Blocks['tcp_connect'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("TCP connect to host :")
                .appendField(new Blockly.FieldTextInput("www.ioxgd.com"), "host")
                .appendField("port")
                .appendField(new Blockly.FieldNumber(80, 0, 65535, 0), "port");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("start Bluetooth");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['tcp_is_connected'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("TCP is connected ?");
            this.setInputsInline(true);
            this.setOutput(true, ["Boolean", "Number"]);
            this.setColour(270);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['tcp_send_string'] = {
        init: function() {
            this.appendValueInput("text")
                .setCheck("String")
                .appendField("TCP send text");
            this.appendDummyInput()
                .appendField("with new line")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "newline");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("send string to client");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['tcp_on_receive'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("on TCP received data");
            this.appendStatementInput("receiver_code")
                .setCheck(null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['tcp_read_data'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("read TCP received data");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(270);
            this.setTooltip("read TCP received data");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['tcp_read_line'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("read line from TCP data");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(270);
            this.setTooltip("read string line from TCP received data");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['udp_begin'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("UDP begin port :")
                .appendField(new Blockly.FieldNumber(1234, 0, 65535, 0), "port");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("start UDP");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['udp_send_string'] = {
        init: function() {
            this.appendValueInput("text")
                .setCheck("String")
                .appendField("UDP send text host : ")
                .appendField(new Blockly.FieldTextInput("192.168.0.1"), "host")
                .appendField("port")
                .appendField(new Blockly.FieldNumber(1234, 0, 65535, 0), "port");
            this.appendDummyInput()
                .appendField("with new line")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "newline");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("send string to client");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['udp_on_receive'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("on UDP received data");
            this.appendStatementInput("receiver_code")
                .setCheck(null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['udp_read_data'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("read UDP received data");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(270);
            this.setTooltip("read UDP received data");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['udp_read_line'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("read line from UDP data");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(270);
            this.setTooltip("read string line from UDP received data");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['ntp_sync_rtc'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("RTC sync time from internet");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("Get time from NTP and then set time to RTC");
            this.setHelpUrl("");
        }
    };

}