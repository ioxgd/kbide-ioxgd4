#ifndef __Senses_wifi_h__
#define __Senses_wifi_h__

#include "Arduino.h"
#include "wifi/ESP32.h"
#include "wifi/ESP32WiFi.h"
#include "wifi/ESP32HTTP.h"

class Senses_wifi{
	private:
		String uid;
		String key;

	public:
		Senses_wifi() ;

		void connect(const char *ssid, const char *passw, const char *userid, const char *key) ;
		void connect(const char *userid, const char *key) ;
		void connect(String userid, String key) ;

		bool send(int slotnum, float data) ;
		
};

#endif
