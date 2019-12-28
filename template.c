#include <Arduino.h>
typedef int Number;
typedef int Boolean;

#include <IOXGD.h>

${EXTINC}

${VARIABLE}

${FUNCTION}

void setup() {
  gd.begin();
  
  xTaskCreate([](void*) {
    ${SETUP_CODE}
    ${BLOCKSETUP}

    while (1) {
	    ${LOOP_CODE}
      ${LOOP_EXT_CODE}
    }
  }, "mainTask", 1024, NULL, 1, NULL);

  gd.startFreeRTOS();
}
void loop() {
  
}
