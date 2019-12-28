#ifndef __ESP32BT_H__
#define __ESP32BT_H__

#include "Arduino.h"
#include "ESP32.h"

class ESP32BT : public Stream {
	private:

	public:
		ESP32BT() ;

		void begin(String name) ;

		int available() ;
		int read() ;
		int read(uint8_t*, uint8_t) ;
		int peek() ;
		size_t write(uint8_t) ;
		size_t write(const uint8_t *buffer, size_t size) ;

};

extern ESP32BT BT;

#endif