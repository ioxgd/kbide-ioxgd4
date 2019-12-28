#ifndef __ESP32_CPP__
#define __ESP32_CPP__

#include "ESP32.h"

ESP32System::ESP32System() { }

void ESP32System::reset() {
	gpio_set_pin(0, GPIO_PV_LOW);
	delay(10);
	gpio_set_pin(0, GPIO_PV_HIGH);
	delay(10);
	gpio_set_pin(0, GPIO_PV_LOW);
	delay(1000); // wait ready 1s
}

void ESP32System::begin() {
	SERIAL_ESP.begin(512000, 6, 7);
	
	fpioa_set_function(0, FUNC_GPIO0);
	gpio_set_drive_mode(0, GPIO_DM_OUTPUT);
	
	this->reset();
}

ESP32System ESP32;

#endif