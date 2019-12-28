#ifndef __Senses_wifi_CPP__
#define __Senses_wifi_CPP__

#include "Senses_wifi.h"

#define SENSES_HOST "www.sensesiot.com"
#define SENSES_PORT 4000
#define retry_wait 1000
#define LAGTIME 100

Senses_wifi::Senses_wifi() { }

void Senses_wifi::connect(const char *ssid, const char *passw, const char *userid, const char *key){
	this->uid = String(userid);
	this->key = String(key);

	WiFi.connect(String(ssid), String(passw));
	Serial.print("SENSES platform start connecting.");

	while (!WiFi.isConnected()){
		delay(retry_wait);
		Serial.print(".");
	}
	Serial.println("Connected");
}

void Senses_wifi::connect(const char *userid, const char *key) {
	this->uid = String(userid);
	this->key = String(key);
}

void Senses_wifi::connect(String userid, String key) {
	this->uid = userid;
	this->key = key;
}

bool Senses_wifi::send(int slotnum, float data){
	String url = "";
	url += "http://";
	url += SENSES_HOST;
	url += ":";
	url += SENSES_PORT;
	url += "/send/";
	url += this->uid;
	url += "/";
	url += this->key;
	url += "/";
	url += slotnum;
	url += "/";
	url += data;
	HTTP.get(url);
	return HTTP.httpCode == 200;
}

#endif