#include <IOXGD.h>

void setup() {
  gd.begin(SETUP_LVGL);
  
  xTaskCreate([](void*) {
    // put your setup code here, to run once:

    while (1) {
      // put your main code here, to run repeatedly:
	  
    }
  }, "mainTask", 32768, NULL, 1, NULL);

  gd.startFreeRTOS();
}

void loop() { }
