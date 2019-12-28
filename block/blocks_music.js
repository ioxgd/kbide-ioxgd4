module.exports = function(Blockly) {
  "use strict";

  var music_colour = Blockly.Msg.MUSIC_HUE;
  // var music_colour="#FB8CC3";
  Blockly.Blocks["music_begin"] = {
    init: function() {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage("/static/block_icons/buzzer.png",
            30,
            30,
            "*")
        )
        .appendField("Buzzer begin");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(music_colour);
      this.setTooltip("Buzzer begin at pin 25");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["music_duration_opt"] = [
    [
      {
        src: "/static/block_icons/notes/whole.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "100"
    ],
    [
      {
        src: "/static/block_icons/notes/half.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "2000"
    ],
    [
      {
        src: "/static/block_icons/notes/quarter.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "1000"
    ],
    [
      {
        src: "/static/block_icons/notes/eighth.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "500"
    ],
    [
      {
        src: "/static/block_icons/notes/sixteenth.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "250"
    ]
  ];

  Blockly.Blocks["music_buzzer_note"] = {
    init: function() {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage("/static/block_icons/buzzer.png",
            30,
            30,
            "*")
        )
        .appendField("Buzzer Note")
        .appendField(
          new Blockly.FieldDropdown([
            [Blockly.Msg.MUSIC_NOTE_C7, "2093"],
            [Blockly.Msg.MUSIC_NOTE_B6, "1976"],
            [Blockly.Msg.MUSIC_NOTE_BB6, "1865"],
            [Blockly.Msg.MUSIC_NOTE_A6, "1760"],
            [Blockly.Msg.MUSIC_NOTE_GS6, "1661"],
            [Blockly.Msg.MUSIC_NOTE_G6, "1568"],
            [Blockly.Msg.MUSIC_NOTE_FS6, "1480"],
            [Blockly.Msg.MUSIC_NOTE_F6, "1397"],
            [Blockly.Msg.MUSIC_NOTE_E6, "1319"],
            [Blockly.Msg.MUSIC_NOTE_EB6, "1245"],
            [Blockly.Msg.MUSIC_NOTE_D6, "1175"],
            [Blockly.Msg.MUSIC_NOTE_CS6, "1109"],
            [Blockly.Msg.MUSIC_NOTE_C6, "1047"],
            [Blockly.Msg.MUSIC_NOTE_B5, "988"],
            [Blockly.Msg.MUSIC_NOTE_BB5, "932"],
            [Blockly.Msg.MUSIC_NOTE_A5, "880"],
            [Blockly.Msg.MUSIC_NOTE_GS5, "831"],
            [Blockly.Msg.MUSIC_NOTE_G5, "784"],
            [Blockly.Msg.MUSIC_NOTE_FS5, "740"],
            [Blockly.Msg.MUSIC_NOTE_F5, "698"],
            [Blockly.Msg.MUSIC_NOTE_E5, "659"],
            [Blockly.Msg.MUSIC_NOTE_EB5, "622"],
            [Blockly.Msg.MUSIC_NOTE_D5, "587"],
            [Blockly.Msg.MUSIC_NOTE_CS5, "554"],
            [Blockly.Msg.MUSIC_NOTE_C5, "523"],
            [Blockly.Msg.MUSIC_NOTE_B4, "494"],
            [Blockly.Msg.MUSIC_NOTE_BB4, "466"],
            [Blockly.Msg.MUSIC_NOTE_A4, "440"],
            [Blockly.Msg.MUSIC_NOTE_GS4, "415"],
            [Blockly.Msg.MUSIC_NOTE_G4, "392"],
            [Blockly.Msg.MUSIC_NOTE_FS4, "370"],
            [Blockly.Msg.MUSIC_NOTE_F4, "349"],
            [Blockly.Msg.MUSIC_NOTE_E4, "330"],
            [Blockly.Msg.MUSIC_NOTE_EB4, "311"],
            [Blockly.Msg.MUSIC_NOTE_D4, "294"],
            [Blockly.Msg.MUSIC_NOTE_CS4, "277"],
            [Blockly.Msg.MUSIC_NOTE_C4, "262"]
          ]),
          "NOTE"
        );
      this.appendDummyInput()
        .appendField(Blockly.Msg.MUSIC_NOTE_DURATION)
        .appendField(
          new Blockly.FieldDropdown(Blockly.Blocks["music_duration_opt"]),
          "DURATION"
        );
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(music_colour);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["music_buzzer_frequency"] = {
    init: function() {
      this.appendValueInput("FREQUENCY")
        .appendField(new Blockly.FieldImage("/static/block_icons/buzzer.png",30,30,"*"))
        .setCheck("Number")
        .appendField("Buzzer Frequency");
      this.appendValueInput("DURATION")
        .setCheck("Number")
        .appendField("Duration");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(music_colour);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
};
