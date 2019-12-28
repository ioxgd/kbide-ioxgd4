#ifndef __ESP32_UDP_CPP__
#define __ESP32_UDP_CPP__

#include "ESP32UDP.h"

WiFiUDP::WiFiUDP() { }

uint8_t WiFiUDP::begin(uint16_t port) {
    clearBuffer();

	// Serial.println("Send udp begin");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x16); // UDP begin command
	SERIAL_ESP.write((uint8_t)(port >> 8));
	SERIAL_ESP.write((uint8_t)(port & 0xFF));

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
				if (c == 0x16) { // UDP begin response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	return 1;
}

int WiFiUDP::beginPacket(String host, uint16_t port) {
    this->packetHost = host;
    this->packetPort = port;

    this->writeBuffer = (uint8_t*)malloc(WRITE_BUFFER_SIZE);
	
	return 1;
}

int WiFiUDP::beginPacket(IPAddress ip, uint16_t port) {
	return this->beginPacket(String(ip), port);
}

int WiFiUDP::endPacket() {
	clearBuffer();

	// Serial.println("Send udp send");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x17); // UDP send command
	SERIAL_ESP.write((uint8_t)this->packetHost.length());
	SERIAL_ESP.print(this->packetHost);
	SERIAL_ESP.write((uint8_t)(this->packetPort >> 8));
	SERIAL_ESP.write((uint8_t)(this->packetPort & 0xFF));
	SERIAL_ESP.write((uint8_t)(this->writePointer & 0xFF));
	SERIAL_ESP.write(this->writeBuffer, this->writePointer);

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
				if (c == 0x17) { // UDP send response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	// Serial.println("UDP send response");

	uint8_t writeSize = this->writePointer & 0xFF;

	free(this->writeBuffer);
	this->writeBuffer = NULL;
	this->writePointer = 0;

	return writeSize;
}

size_t WiFiUDP::write(uint8_t data) {
    return write(&data, 1);
}

size_t WiFiUDP::write(uint8_t *buffer, size_t size) {
    memcpy(&this->writeBuffer[this->writePointer], buffer, size);
    this->writePointer += size;
	return size;
}

int WiFiUDP::parsePacket() {
	if (readBuffer) {
		free(readBuffer);
		readBuffer = NULL;
	}

	clearBuffer();

	// Serial.println("Send udp parse packet");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x18); // UDP parse packet command
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
				if (c == 0x18) { // UDP parse packet response ?
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

	readBufferLength = (uint16_t)(SERIAL_ESP.read()) << 8;
	readBufferLength |= (uint16_t)(SERIAL_ESP.read()) & 0xFF;

	if (readBufferLength > 0) {
		SERIAL_ESP.readBytes(_remoteIP, 4);

		while (SERIAL_ESP.available() < 2) delay(1);

		_remotePort = (uint16_t)(SERIAL_ESP.read()) << 8;
		_remotePort |= (uint16_t)(SERIAL_ESP.read()) & 0xFF;

		readPointer = 0;
		readBuffer = (uint8_t*)malloc(readBufferLength);

		SERIAL_ESP.readBytes(readBuffer, readBufferLength);
	}

	return readBufferLength;
}

int WiFiUDP::available() {
	return readBufferLength;
}

int WiFiUDP::peek() {
    if (readBufferLength == 0) {
		return -1; 
	}

    return readBuffer[readPointer];
}

int WiFiUDP::read() {
    if (readBufferLength == 0) {
		return -1; 
	}

	uint8_t c = readBuffer[readPointer];
	readPointer++;
	readBufferLength--;

    return c;
}

int WiFiUDP::read(uint8_t* buffer, size_t len) {
	if (readBufferLength == 0) {
		return -1; 
	}

	memcpy(buffer, &readBuffer[readPointer], len);
	readPointer += len;
	readBufferLength -= len;

	return len;
}

#endif
