#ifndef __ESP32_TCP_CPP__
#define __ESP32_TCP_CPP__

#include "ESP32TCP.h"

WiFiClient::WiFiClient(int socket) {
	this->socket = socket;
}

int WiFiClient::connect(String host, int port) {
	clearBuffer();

	// Serial.println("Send tcp connect begin");

	int hostIp[4] = { 0, 0, 0, 0 };
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x10); // TCP Connect command
	SERIAL_ESP.write(this->socket); // Socket id
	if (sscanf(host.c_str(), "%d.%d.%d.%d", &hostIp[0], &hostIp[1], &hostIp[2], &hostIp[3])) {
		SERIAL_ESP.write(1); // Connect type
		SERIAL_ESP.write(4); // Host length
		SERIAL_ESP.write((uint8_t)hostIp[0]); // Host
		SERIAL_ESP.write((uint8_t)hostIp[1]); // Host
		SERIAL_ESP.write((uint8_t)hostIp[2]); // Host
		SERIAL_ESP.write((uint8_t)hostIp[3]); // Host
	} else {
		SERIAL_ESP.write(2); // Connect type
		SERIAL_ESP.write(host.length()); // Host length
		SERIAL_ESP.print(host); // Host
	}
	SERIAL_ESP.write((uint8_t)(port>>8)); // Port bit 16 - 9
	SERIAL_ESP.write((uint8_t)(port&0xFF)); // Port bit 8 - 1
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
				if (c == 0x10) { // TCP Connect response ?
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

	return SERIAL_ESP.read() == 1;
}

bool WiFiClient::connected() {
	clearBuffer();

	// Serial.println("Send tcp connected begin");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x11); // TCP Connected command
	SERIAL_ESP.write(this->socket); // Socket id

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
				if (c == 0x11) { // TCP Connected response ?
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

	return SERIAL_ESP.read() == 1;
}

void WiFiClient::stop() {
	clearBuffer();

	// Serial.println("Send tcp stop begin");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x12); // TCP Connected command
	SERIAL_ESP.write(this->socket); // Socket id

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
				if (c == 0x12) { // TCP Stop response ?
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

int WiFiClient::available() {
	clearBuffer();

	// Serial.println("Send tcp available");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x13); // TCP available command
	SERIAL_ESP.write(this->socket); // Socket id

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
				if (c == 0x13) { // TCP available response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	while (SERIAL_ESP.available() < 2) delay(1);

	uint16_t size = 0;
	size = ((uint16_t)SERIAL_ESP.read()) << 8;
	size |= ((uint16_t)SERIAL_ESP.read()) & 0xFF;

	return size;
}

int WiFiClient::read() {
	uint8_t c;
	this->read(&c, 1);
	return c;
}

int WiFiClient::read(uint8_t *buff, uint16_t size) {
	clearBuffer();

	// Serial.println("Send tcp read");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x14); // TCP Read read command
	SERIAL_ESP.write(this->socket);
	SERIAL_ESP.write((uint8_t)(size>>8));
	SERIAL_ESP.write((uint8_t)(size&0xFF));
	
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
				if (c == 0x14) { // TCP Read response ?
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

int WiFiClient::peek() {
	// Not support
	return -1;
}

size_t WiFiClient::write(uint8_t c) {
	return this->write(&c, 1);
}

size_t WiFiClient::write(const uint8_t *buffer, size_t size) {
	clearBuffer();

	// Serial.println("Send tcp write");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x15); // TCP Write command
	SERIAL_ESP.write(this->socket);
	SERIAL_ESP.write((uint8_t)(size>>8));
	SERIAL_ESP.write((uint8_t)(size&0xFF));
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
				if (c == 0x15) { // TCP Write response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	// Serial.println("Send tcp write end");

	return size;
}

#endif