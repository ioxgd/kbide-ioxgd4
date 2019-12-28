/*
   Name: I2CEEPROM
   File: I2CEEPROM.h
   Author: IOXhop
   Website: http://www.ioxhop.com/
*/

#include <Arduino.h>
#include <Wire.h>

class I2CEEPROM {
	public:
		I2CEEPROM(int addr) ;
		
		void begin() ;
		void write(int addr, byte data) ;
		byte read(int addr) ;
		int print(int addr, String text);
		String readString(int addr) ;
		
	private:
		int i2c_addr = 0;

}
;

extern I2CEEPROM EEPROM;
