const notes = [
  "SIL",
  "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
  "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
  "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6"
];

module.exports = function(Blockly) {
  "use strict";
  const ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  const ORDER_NONE = Blockly.JavaScript.ORDER_NONE;
  const valueToCode = (a, b) => Blockly.JavaScript.valueToCode(a, b);

  Blockly.JavaScript["music_begin"] = function(block) {
    var code =
      `#VARIABLE
#define BUZZER_PIN 37
#END
pinMode(BUZZER_PIN, OUTPUT);
`;
    return code;
  };

  Blockly.JavaScript["music_buzzer_note"] = function(block) {
    var value_tone = block.getFieldValue("NOTE");
    var value_dulation = block.getFieldValue("DURATION");
    var code = `tone(BUZZER_PIN, ${value_tone}, ${value_dulation}); `;
    return code;
  };

  Blockly.JavaScript["music_buzzer_frequency"] = function(block) {
    var value_frequency = valueToCode(block, "FREQUENCY", ORDER_ATOMIC);
    var value_dulation = valueToCode(block, "DURATION", ORDER_ATOMIC);
    var code = `tone(BUZZER_PIN, ${value_frequency}, ${value_dulation}); `;
    return code;
  };
};
