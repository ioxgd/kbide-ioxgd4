#ifndef __ESP32_HTTP_H__
#define __ESP32_HTTP_H__

#include "Arduino.h"
#include "ESP32.h"

typedef struct {
	String name;
	String value;
} HTTPHeader;

class ESP32HTTP {
	private:
	
	public:
		uint16_t payloadSize;
		uint8_t *payload = NULL;
		uint16_t httpCode;

		ESP32HTTP();
		
		bool HTTPRequest(String url, uint8_t method, String payload, HTTPHeader *header = NULL, uint8_t headerSize = 0) ;
		bool get(String url, HTTPHeader *header = NULL, uint8_t headerSize = 0) ;
		bool patch(String url, String payload, HTTPHeader *header = NULL, uint8_t headerSize = 0) ;
		bool post(String url, String payload, HTTPHeader *header = NULL, uint8_t headerSize = 0) ;
		bool put(String url, String payload, HTTPHeader *header = NULL, uint8_t headerSize = 0) ;
		bool _delete(String url, String payload, HTTPHeader *header = NULL, uint8_t headerSize = 0) ;

		String readString() ;

		void end() ;
	
};

extern ESP32HTTP HTTP;

#endif