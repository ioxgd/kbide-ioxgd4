#ifndef __DS3231__H
#define __DS3231__H

#include "Arduino.h"
#include "Wire.h"
#include "../wifi/ESP32NTP.h"

#define DS3231_ADDRESS 0x68

class DS3231_RTC {
    private:
        int _hour = 0;
        int _minute = 0;
        int _second = 0;
        int _day = 0;
        int _month = 0;
        int _year = 0;
        int _weekday = 0;
        int _yearday = 0;

        int bcd2bin(uint8_t val) ;
        uint8_t bin2bcd(uint8_t val) ;
    
    public:
        DS3231_RTC();
        
        void begin() ;
        bool setTime(int hour, int minute, int second, int day, int month, int year) ;
        bool get() ;

        int hour() { return _hour; };
        int minute() { return _minute; };
        int second() { return _second; };
        int day() { return _day; };
        int month() { return _month; };
        int year() { return _year; };
        int weekday() { return _weekday; };
        int yearday() { return _yearday; };

        bool syncFromNTP() ;

};

extern DS3231_RTC RTC;

#endif