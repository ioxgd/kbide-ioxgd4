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

    Blockly.JavaScript['tcp_is_connected'] = function(block) {
        var code = `WiFi.isConnected()`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.JavaScript['wifi_http_get'] = function(block) {
        var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `
        #FUNCTION
        String __httpGet(String url) {
            HTTP.get(url);
            String ros = HTTP.readString();
            HTTP.end();
            return ros;
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
            String ros = HTTP.readString();
            HTTP.end();
            return ros;
        }
        #END__httpPost(${value_url}, ${value_data}, "${dropdown_content_type}")
        `;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };


    Blockly.JavaScript['wifi_get_ip_addr'] = function(block) {
        var code = `WiFi.localIP().toString()`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    let defineWiFiClient = '#VARIABLEWiFiClient tcp_client1 = WiFiClient(1);#END';

    Blockly.JavaScript['tcp_connect'] = function(block) {
        var text_host = block.getFieldValue('host');
        var number_port = block.getFieldValue('port');
		var code = `${defineWiFiClient}tcp_client1.connect("${text_host}", ${number_port});\n`;
		return code;
    };
    
    Blockly.JavaScript['tcp_is_connected'] = function(block) {
        var code = `${defineWiFiClient}tcp_client1.connected()`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

	Blockly.JavaScript['tcp_send_string'] = function(block) {
		var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
		var checkbox_newline = (block.getFieldValue('newline') == 'TRUE')? 'ln' : '';
		var code = `${defineWiFiClient}tcp_client1.print${checkbox_newline}(${value_text});\n`;
		return code;
	};

	Blockly.JavaScript['tcp_on_receive'] = function(block) {
		var statements_receiver_code = Blockly.JavaScript.statementToCode(block, 'receiver_code');
		var code = `${defineWiFiClient}
		while(tcp_client1.available()){
			${statements_receiver_code}
		}\n`;
		return code;
	};

	Blockly.JavaScript['tcp_read_data'] = function(block) {
		var code = `${defineWiFiClient}tcp_client1.read()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['tcp_read_line'] = function(block) {
		var code = `${defineWiFiClient}tcp_client1.readStringUntil('\\n')`;
		return [code, Blockly.JavaScript.ORDER_NONE];
    };

    let defineUDP = '#VARIABLEWiFiUDP udp;#END';
    
    Blockly.JavaScript['udp_begin'] = function(block) {
        var number_port = block.getFieldValue('port');
		var code = `${defineUDP}udp.begin(${number_port});\n`;
		return code;
    };
    
	Blockly.JavaScript['udp_send_string'] = function(block) {
        var text_host = block.getFieldValue('host');
        var number_port = block.getFieldValue('port');
		var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
		var checkbox_newline = (block.getFieldValue('newline') == 'TRUE')? 'ln' : '';
        var code = `${defineUDP}
        udp.beginPacket("${text_host}", ${number_port});
        udp.print${checkbox_newline}(${value_text});
        udp.endPacket();
        `;
		return code;
	};

	Blockly.JavaScript['udp_on_receive'] = function(block) {
		var statements_receiver_code = Blockly.JavaScript.statementToCode(block, 'receiver_code');
        var code = `${defineUDP}
        int udp_packet_len = udp.parsePacket();
		while(udp.available()){
			${statements_receiver_code}
		}\n`;
		return code;
	};

	Blockly.JavaScript['udp_read_data'] = function(block) {
		var code = `${defineUDP}udp.read()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['udp_read_line'] = function(block) {
		var code = `${defineUDP}udp.readStringUntil('\\n')`;
		return [code, Blockly.JavaScript.ORDER_NONE];
    };
    
    Blockly.JavaScript['ntp_sync_rtc'] = function(block) {
        var code = `
        NTP.begin(7);
        if (NTP.get()) {
            RTC.setTime(NTP.hour(), NTP.minute(), NTP.second(), NTP.day(), NTP.month(), NTP.year());
        } else {
            Serial.println("NTP fail");
        }
        `;
		return code;
    };
}