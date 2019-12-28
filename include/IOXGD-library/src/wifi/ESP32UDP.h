#ifndef __ESP32_UDP_H__
#define __ESP32_UDP_H__

#include "Arduino.h"
#include "ESP32.h"

#define WRITE_BUFFER_SIZE 256

class WiFiUDP : public Stream {
	private:
		uint8_t _remoteIP[4] = { 0, 0, 0, 0 };
		uint16_t _remotePort;

		String packetHost = "";
		uint16_t packetPort = 0;

		uint8_t *writeBuffer = NULL;
		uint8_t *readBuffer = NULL;

		uint16_t writePointer = 0;
		uint16_t readPointer = 0;
		uint16_t readBufferLength = 0;

	public:
		WiFiUDP();

		uint8_t begin(uint16_t p) ;
		int beginPacket(String host, uint16_t port) ;
		int beginPacket(IPAddress ip, uint16_t port) ;
		size_t write(uint8_t) ;
		size_t write(uint8_t *buffer, size_t size) ;
		int endPacket() ;

		int parsePacket() ;
		int available() ;
		int read() ;
		int read(uint8_t* buffer, size_t len) ;
		int peek() ;

		IPAddress remoteIP() { return IPAddress(_remoteIP[0], _remoteIP[1], _remoteIP[2], _remoteIP[3]); };
		uint16_t remotePort() { return _remotePort; };

};

#endif