#ifndef __ESP32_WIFI_CPP__
#define __ESP32_WIFI_CPP__

#include "ESP32WiFi.h"

ESP32WiFi::ESP32WiFi() { }

void ESP32WiFi::connect(String ssid, String pass) {
	clearBuffer();
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x02); // WiFi Connect command
	SERIAL_ESP.write(ssid.length()); // SSID length
	SERIAL_ESP.print(ssid); // SSID
	SERIAL_ESP.write(pass.length()); // Pass length
	SERIAL_ESP.print(pass); // PASS

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
				if (c == 0x02) { // WiFi Connect response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}
}

bool ESP32WiFi::isConnected() {
	clearBuffer();
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x03); // WiFi Scan command
	SERIAL_ESP.write(0x01); // Dummy data

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
				if (c == 0x03) { // WiFi Scan response ?
					state = 3;
				} else {
					state = 0;
				}
			} else if (state == 3) {
				return c == 0x01;
			}
		} else {
			delay(1);
		}
	}

	return 0;
}

uint8_t ESP32WiFi::scanNetworks() {
	clearBuffer();
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x01); // WiFi Scan command
	SERIAL_ESP.write(0x01); // Dummy data

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
				if (c == 0x01) { // WiFi Scan response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	while(SERIAL_ESP.available() <= 0) delay(1); // Wait scan count
	uint8_t n = SERIAL_ESP.read();
	
	uint8_t inx = 0;
	for (uint8_t i=0;i<n;i++) {
		while(SERIAL_ESP.available() <= 0) delay(1); // Wait ssid length
		uint8_t len = SERIAL_ESP.read();
        
		while(SERIAL_ESP.available() < len) delay(1); // Wait ssid into buffer
		scanSSID[inx] = "";
		for (uint8_t x=0;x<len;x++) {
			scanSSID[inx] += (char)SERIAL_ESP.read();
		}
        
		while(SERIAL_ESP.available() <= 0) delay(1); // Wait encryption type
		scanEncryption[inx] = (SERIAL_ESP.read() == 1);
		
		inx++;
		if (inx >= 20) {
			inx = 0;
		}
	}

	return n;
}

String ESP32WiFi::SSID(uint8_t networkItem) {
	return scanSSID[networkItem];
}

bool ESP32WiFi::isEncryption(uint8_t networkItem) {
	return scanEncryption[networkItem];
}

ESP32WiFi WiFi;

#endif