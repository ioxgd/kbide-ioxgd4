module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['io_pwm_write'] = function(block) {
  var value_pin =  block.getFieldValue('pin');
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `analogWrite(${value_pin}, ${value_value});`;
  return code;
};

}