#ifndef __ESP32_NTP_CPP__
#define __ESP32_NTP_CPP__

#include "ESP32NTP.h"

ESP32NTP::ESP32NTP() { }

bool ESP32NTP::begin(uint8_t timezone) {
    clearBuffer();

	// Serial.println("Send http request");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x30); // NTP Config command
	SERIAL_ESP.write(timezone);

    uint8_t state = 0;

    // Check Start
	while (1) {
		if (SERIAL_ESP.available()) {
			uint8_t c = SERIAL_ESP.read();
			if (state == 0) {
				if (c == 0x1F) {
					state = 1;
				}
			} else if (state == 1) {
				if (c == 0xF1) {
					state = 2;
				} else {
					state = 0;
				}
			} else if (state == 2) {
				if (c == 0x30) { // NTP Config response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

    return true;
}

bool ESP32NTP::get() {
    SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x31); // NTP Get Time command
	SERIAL_ESP.write(0x01); // dummy data

    uint8_t state = 0;

    // Check Start
	while (1) {
		if (SERIAL_ESP.available()) {
			uint8_t c = SERIAL_ESP.read();
			if (state == 0) {
				if (c == 0x1F) {
					state = 1;
				}
			} else if (state == 1) {
				if (c == 0xF1) {
					state = 2;
				} else {
					state = 0;
				}
			} else if (state == 2) {
				if (c == 0x31) { //NTP Get Time response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

    while(SERIAL_ESP.available() < 8) delay(1); // Wait read time from NTP

    _hour = SERIAL_ESP.read();
    _minute = SERIAL_ESP.read();
    _second = SERIAL_ESP.read();
    _day = SERIAL_ESP.read();
    _month = SERIAL_ESP.read();
    _year = SERIAL_ESP.read() + 1900;
    _weekday = SERIAL_ESP.read();
    _yearday = SERIAL_ESP.read();

    return true;
}

ESP32NTP NTP;

#endif