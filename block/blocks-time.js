module.exports = function(Blockly){
	var rtc_colour = 0;

	Blockly.Blocks['rtc_set_datetime'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("RTC Set DateTime")
			this.appendDummyInput()
				.appendField("Date")
				.appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"],
				["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]]), "DAY")
				.appendField("/")
				.appendField(new Blockly.FieldDropdown([["January", "1"], ["February", "2"], ["March", "3"], ["April", "4"], ["May", "5"], ["June", "6"], ["July", "7"], ["Augest", "8"], ["September", "9"], ["October", "10"], ["November", "11"], ["December", "12"]]), "MONTH")
				.appendField("/")
				.appendField(new Blockly.FieldDropdown([["2019", "2019"], ["2020", "2020"], ["2021", "2021"], ["2022", "22"], ["2023", "23"], ["2024", "24"], ["2025", "2025"], ["2026", "2026"], ["2027", "2027"], ["2028", "2028"], ["2029", "2029"]]), "YEAR")
			this.appendDummyInput()
				.appendField("Time")
				.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"],
				["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"]]), "HOUR")
				.appendField(":")
				.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"],
				["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"],
				["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"], ["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["54", "54"], ["55", "55"],
				["56", "56"], ["57", "57"], ["58", "58"], ["59", "59"]]), "MINUTE")
				.appendField(":")
				.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"],
				["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"],
				["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"], ["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["54", "54"], ["55", "55"],
				["56", "56"], ["57", "57"], ["58", "58"], ["59", "59"]]), "SECOND")
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setInputsInline(false);
			this.setColour(rtc_colour);
			this.setTooltip("");
			this.setHelpUrl("");

			// Set time
			let now = new Date();
			this.setFieldValue(now.getDate().toString(), "DAY");
			this.setFieldValue((now.getMonth() + 1).toString(), "MONTH");
			this.setFieldValue(now.getFullYear().toString(), "YEAR");
			this.setFieldValue(now.getHours().toString(), "HOUR");
			this.setFieldValue(now.getMinutes().toString(), "MINUTE");
			this.setFieldValue(now.getSeconds().toString(), "SECOND");
		}
	};

	Blockly.Blocks['rtc_get_dayOfWeek'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("RTC : day of Week");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(rtc_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rtc_get_hour'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("RTC : hour");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(rtc_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rtc_get_minute'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("RTC : minute");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(rtc_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rtc_get_second'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("RTC : second");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(rtc_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rtc_get_day'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("RTC : day");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(rtc_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rtc_get_month'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("RTC : month");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(rtc_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['rtc_get_year'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("RTC : year");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(rtc_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};
};