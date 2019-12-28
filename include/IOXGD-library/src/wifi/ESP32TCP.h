#ifndef __ESP32_TCP_H__
#define __ESP32_TCP_H__

#include "Arduino.h"
#include "ESP32.h"

class WiFiClient : public Stream {
	private:
		uint8_t socket = 0;

	public:
		WiFiClient(int socket = 0) ;

		int connect(String host, int port) ;
		bool connected() ;
		void stop() ;

		int available() ;
		int read() ;
		int read(uint8_t*, uint16_t) ;
		int peek() ;
		size_t write(uint8_t) ;
		size_t write(const uint8_t *buffer, size_t size) ;

};

#endif
