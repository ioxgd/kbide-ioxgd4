#ifndef __ESP32_WIFI_H__
#define __ESP32_WIFI_H__

#include "Arduino.h"
#include "ESP32.h"

class ESP32WiFi {
	
	private:
		String scanSSID[20];
		bool scanEncryption[20];
		
	public:
		ESP32WiFi() ;
		
		void connect(String ssid, String pass) ;
		bool isConnected() ;
		
		// Scan
		uint8_t scanNetworks() ;
		String SSID(uint8_t networkItem) ;
		bool isEncryption(uint8_t networkItem) ;
	
};

extern ESP32WiFi WiFi;

#endif