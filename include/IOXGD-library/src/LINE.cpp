#ifndef __LINE_CPP__
#define __LINE_CPP__

#include "LINE.h"

LineNotify::LineNotify() { }

void LineNotify::setToken(String token) {
	this->token = token;
}

bool LineNotify::notify(String msg) {
	HTTPHeader header[2] = {
		{
			.name = "Content-Type",
			.value = "application/x-www-form-urlencoded"
		}, {
			.name = "Authorization",
			.value = String("Bearer ") + String(this->token)
		}
	};
	HTTP.post("https://notify-api.line.me/api/notify", "message=" + msg, header, 2);
	HTTP.end();
	
	return HTTP.httpCode == 200;
}

LineNotify LINE;

#endif
