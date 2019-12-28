#ifndef __ESP32BT_CPP__
#define __ESP32BT_CPP__

#include "ESP32BT.h"

ESP32BT::ESP32BT() { }

void ESP32BT::begin(String name) {
	clearBuffer();

	// Serial.println("Send bluetooth begin");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x40); // Bluetooth Serial begin command
	SERIAL_ESP.write((uint8_t)name.length());
	SERIAL_ESP.print(name);

	int state = 0;

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
				if (c == 0x40) { // Bluetooth Serial begin response ?
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

int ESP32BT::available() {
	clearBuffer();

	// Serial.println("Send bluetooth available");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x41); // Bluetooth Serial available command
	SERIAL_ESP.write(0x01); // Dummy data
	
	int state = 0;

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
				if (c == 0x41) { // Bluetooth Serial available response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	while (SERIAL_ESP.available() <= 0) delay(1);

	return (int)SERIAL_ESP.read();
}

int ESP32BT::read() {
	uint8_t c = 0;
	this->read(&c, 1);
	return c;
}

int ESP32BT::read(uint8_t *buff, uint8_t size) {
	clearBuffer();

	// Serial.println("Send bluetooth read");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x42); // Bluetooth Serial read command
	SERIAL_ESP.write(size);
	
	int state = 0;

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
				if (c == 0x42) { // Bluetooth Serial read response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	SERIAL_ESP.readBytes(buff, size);

	return size;
}

int ESP32BT::peek() {
	// not supported
	return 0;
}

size_t ESP32BT::write(uint8_t data) {
	return this->write(&data, 1);
}

size_t ESP32BT::write(const uint8_t *buffer, size_t size) {
	clearBuffer();

	// Serial.println("Send bluetooth write");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x43); // Bluetooth Serial write command
	SERIAL_ESP.write(size);
	SERIAL_ESP.write(buffer, size);
	
	int state = 0;

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
				if (c == 0x43) { // Bluetooth Serial write response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	return size;
}

ESP32BT BT;

#endif