module.exports = function(Blockly){

    Blockly.JavaScript['wifi_connect'] = function(block) {
        var text_ssid = block.getFieldValue('ssid');
        var text_password = block.getFieldValue('password');
        var code = `
        WiFi.connect("${text_ssid}","${text_password}");
        while(!WiFi.isConnected()){
            delay(100);
        }\n`;
        return code;
    };

    Blockly.JavaScript['wifi_http_get'] = function(block) {
        var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `
        #FUNCTION
        String __httpGet(String url) {
            HTTP.get(url);
            HTTP.end();
            return HTTP.readString();
        }
        #END__httpGet(${value_url})
        `;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.JavaScript['wifi_http_post'] = function(block) {
        var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
        var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
        var dropdown_content_type = block.getFieldValue('content_type');
        var code = `
        #FUNCTION
        String __httpPost(String url, String data, String ContentType) {
            HTTPHeader header[1] = {
                {
                    .name = "Content-Type",
                    .value = ContentType
                }
            };
            HTTP.post(url, data, header, 1);
            HTTP.end();
            return HTTP.readString();
        }
        #END__httpPost(${value_url}, ${value_data}, "${dropdown_content_type}")
        `;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };


    Blockly.JavaScript['wifi_get_ip_addr'] = function(block) {
        var code = `WiFi.localIP().toString()`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
}