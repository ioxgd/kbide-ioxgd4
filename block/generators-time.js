module.exports = function(Blockly){
	Blockly.JavaScript['rtc_set_datetime'] = function (block) {
		var dropdown_year = block.getFieldValue('YEAR');
		var dropdown_month = block.getFieldValue('MONTH');
		var dropdown_day = block.getFieldValue('DAY');
		var dropdown_hour = block.getFieldValue('HOUR');
		var dropdown_minute = block.getFieldValue('MINUTE');
		var dropdown_secound = block.getFieldValue('SECOND');
		var code = `RTC.setTime(${dropdown_hour}, ${dropdown_minute}, ${dropdown_secound}, ${dropdown_day}, ${dropdown_month}, ${dropdown_year});\n`;
		return code;
	};

	let getTimeBeforeUse = `
	#FUNCTION
	int getTimeFromRTC(uint8_t inx) {
		static uint32_t last_update = 0;
		if ((last_update == 0) || (millis() > (last_update + 100))) {
			if (!RTC.get()) {
				Serial.println("Read time from RTC error!");
			}
			last_update = millis();
		}
		if (inx == 1) return RTC.hour();
		if (inx == 2) return RTC.minute();
		if (inx == 3) return RTC.second();
		if (inx == 4) return RTC.day();
		if (inx == 5) return RTC.month();
		if (inx == 6) return RTC.year();
		return 0;
	}
	#END
	`;

	Blockly.JavaScript['rtc_get_hour'] = function (block) {
		var code = `${getTimeBeforeUse}getTimeFromRTC(1)`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rtc_get_minute'] = function (block) {
		var code = `${getTimeBeforeUse}getTimeFromRTC(2)`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rtc_get_second'] = function (block) {
		var code = `${getTimeBeforeUse}getTimeFromRTC(3)`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rtc_get_day'] = function (block) {
		var code = `${getTimeBeforeUse}getTimeFromRTC(4)`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['rtc_get_month'] = function (block) {
		var code = `${getTimeBeforeUse}getTimeFromRTC(5)`;		
		return [code, Blockly.JavaScript.ORDER_NONE];
	};
	Blockly.JavaScript['rtc_get_year'] = function (block) {
		var code = `${getTimeBeforeUse}getTimeFromRTC(6)`;	
		return [code, Blockly.JavaScript.ORDER_NONE];
	};
};