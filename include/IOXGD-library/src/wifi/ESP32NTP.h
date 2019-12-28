#ifndef __ESP32_NTP_H__
#define __ESP32_NTP_H__

#include "Arduino.h"
#include "ESP32.h"

class ESP32NTP {
	private:
		int _hour = 0;
		int _minute = 0;
		int _second = 0;
		int _day = 0;
		int _month = 0;
		int _year = 0;
		int _weekday = 0;
		int _yearday = 0;

	public:
		ESP32NTP() ;

        bool begin(uint8_t timezone) ;
        bool get() ;

		int hour() { return _hour; };
		int minute() { return _minute; };
		int second() { return _second; };
		int day() { return _day; };
		int month() { return _month; };
		int year() { return _year; };
		int weekday() { return _weekday; };
		int yearday() { return _yearday; };

};

extern ESP32NTP NTP;

#endif