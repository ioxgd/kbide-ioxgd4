#ifndef __LINE_H__
#define __LINE_H__

#include <Arduino.h>
#include "wifi/ESP32.h"
#include "wifi/ESP32HTTP.h"

class LineNotify {
    private:
        String token;

    public:
        LineNotify();

        void setToken(String token) ;
        bool notify(String msg) ;

};

extern LineNotify LINE;

#endif
