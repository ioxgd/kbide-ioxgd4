#ifndef __ESP32_HTTP_CPP__
#define __ESP32_HTTP_CPP__

#include "ESP32HTTP.h"

ESP32HTTP::ESP32HTTP() { }

bool ESP32HTTP::HTTPRequest(String url, uint8_t method, String payload, HTTPHeader *header, uint8_t headerSize) {
	clearBuffer();
	this->end(); // clear old data

	// Serial.println("Send http request");
  
	SERIAL_ESP.write(0x1F); // Start 1
	SERIAL_ESP.write(0xF1); // Start 2
	SERIAL_ESP.write(0x20); // HTTP Request command
	SERIAL_ESP.write(url.length());
	SERIAL_ESP.print(url);
	SERIAL_ESP.write(method);
	SERIAL_ESP.write(payload.length());
	SERIAL_ESP.print(payload);
	if (headerSize > 0) {
		SERIAL_ESP.write(headerSize);
		for (uint8_t i=0;i<headerSize;i++) {
			SERIAL_ESP.write(header[i].name.length());
			SERIAL_ESP.print(header[i].name);
			SERIAL_ESP.write(header[i].value.length());
			SERIAL_ESP.print(header[i].value);
		}
	} else {
		SERIAL_ESP.write((uint8_t)0); // no add header
	}
	SERIAL_ESP.write(0x01); // dummy data

	uint8_t state = 0;
	// uint32_t start = millis();

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
				if (c == 0x20) { // HTTP Request response ?
					break;
				} else {
					state = 0;
				}
			}
		} else {
			delay(1);
		}
	}

	//Serial.println("Waiting respond");

	while(SERIAL_ESP.available() < 2) delay(1); // Wait http code
	httpCode = (uint16_t)(SERIAL_ESP.read())<<8;
	httpCode |= SERIAL_ESP.read();

	//Serial.println("HTTP Code: " + String(httpCode));

	while(SERIAL_ESP.available() < 2) delay(1); // Wait http respond payload count
	payloadSize = (uint16_t)(SERIAL_ESP.read())<<8;
	payloadSize |= SERIAL_ESP.read();
    // Serial.println(payloadSize);
	/* String respondPayload = "";
	while (payloadSize > 0) {
		if (SERIAL_ESP.available()) {
			respondPayload += (char)SERIAL_ESP.read();
			payloadSize--;
		} else {
			delay(1);
		}
	} */

	this->payload = (uint8_t*)malloc(payloadSize);
	//Serial.println("Go to loop");
	uint16_t i = 0;
	uint16_t x = payloadSize;
	// Serial.println(payloadSize);
	while (x > 0) {
		if (SERIAL_ESP.available()) {
			this->payload[i++] = SERIAL_ESP.read();
			x--;
		} else {
			delay(1);
		}
	}
	
	/*
 	Serial.println();
	Serial.println("HTTP Code: " + String(httpCode));
	Serial.println("--------------------------");
	Serial.write(this->payload, payloadSize);
	Serial.println("--------------------------");
	*/

	// return respondPayload;
	return true;
}

void ESP32HTTP::end() {
	if (this->payload != NULL) {
		free(this->payload);
		this->payload = NULL;
		payloadSize = 0;
	}
}

bool ESP32HTTP::get(String url, HTTPHeader *header, uint8_t headerSize) {
	return HTTPRequest(url, 0, String(""));
}

bool ESP32HTTP::patch(String url, String payload, HTTPHeader *header, uint8_t headerSize) {
	return HTTPRequest(url, 1, payload, header, headerSize);
}

bool ESP32HTTP::post(String url, String payload, HTTPHeader *header, uint8_t headerSize) {
	return HTTPRequest(url, 2, payload, header, headerSize);
}

bool ESP32HTTP::put(String url, String payload, HTTPHeader *header, uint8_t headerSize) {
	return HTTPRequest(url, 3, payload, header, headerSize);
}

bool ESP32HTTP::_delete(String url, String payload, HTTPHeader *header, uint8_t headerSize) {
	return HTTPRequest(url, 4, payload, header, headerSize);
}

String ESP32HTTP::readString() {
	char buff[payloadSize + 1];
	memset(buff, 0, payloadSize + 1);
	memcpy(buff, payload, payloadSize);
	String msg = String(buff);
	return msg;
}

ESP32HTTP HTTP;

#endif