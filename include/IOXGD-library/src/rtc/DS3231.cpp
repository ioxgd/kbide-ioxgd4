#ifndef __DS3231__CPP
#define __DS3231__CPP

#include "DS3231.h"

DS3231_RTC::DS3231_RTC() { }

void DS3231_RTC::begin() {
    Wire.begin();
}

int DS3231_RTC::bcd2bin(uint8_t val) {
  return ((val >> 4) * 10) + (val & 0x0F);
}

uint8_t DS3231_RTC::bin2bcd(uint8_t val) {
  return ((val / 10) << 4) | (val % 10);
}

bool DS3231_RTC::get() {
  while (Wire.available()) Wire.read();

  Wire.beginTransmission(DS3231_ADDRESS);
  Wire.write(0); // address 0
  Wire.endTransmission();

  uint8_t count = Wire.requestFrom(DS3231_ADDRESS, 7);
  if (Wire.available() >= 7) {
    _second = bcd2bin(Wire.read());
    _minute = bcd2bin(Wire.read());
    _hour = bcd2bin(Wire.read());
    Wire.read();
    _day = bcd2bin(Wire.read());
    _month = bcd2bin(Wire.read());
    _year = bcd2bin(Wire.read()) + 1970;

    return true;
  } else {
    return false;
  }
}

bool DS3231_RTC::setTime(int hour, int minute, int second, int day, int month, int year) {
  Wire.beginTransmission(DS3231_ADDRESS);
  Wire.write(0); // address 0
  Wire.write(bin2bcd(second));
  Wire.write(bin2bcd(minute));
  Wire.write(bin2bcd(hour));
  Wire.write(0);
  Wire.write(bin2bcd(day));
  Wire.write(bin2bcd(month));
  Wire.write(bin2bcd(year - 1970));
  return Wire.endTransmission() != 0;
}

bool DS3231_RTC::syncFromNTP() {
    if (NTP.get()) {
        RTC.setTime(NTP.hour(), NTP.minute(), NTP.second(), NTP.day(), NTP.month(), NTP.year());
        return true;
    }
    return false;
}

DS3231_RTC RTC;

#endif