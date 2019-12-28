#ifndef __ESP32_H__
#define __ESP32_H__

#include "Arduino.h"

#define SERIAL_ESP Serial1

static void clearBuffer() {
	while (SERIAL_ESP.available()) {
		SERIAL_ESP.read();
	}
}

class ESP32System {
    public:
        ESP32System() ;

        void reset() ;
		void begin() ;

};

extern ESP32System ESP32;

#endif