module.exports = {
  name: "Buzzer",
  index: 30,
  color: "230",
  icon: "/static/icons/icons8_musical_notes_96px.png",
  blocks: [
    "music_begin",
    "music_buzzer_note",
    {
      xml:
        `<block type="music_buzzer_frequency">
                        <value name="FREQUENCY">    
                            <shadow type="math_number">
                                <field name="NUM">2000</field>
                            </shadow>
                        </value>
                        <value name="DURATION">                    
                            <shadow type="math_number">
                                <field name="NUM">500</field>
                            </shadow>
                        </value>
                    </block>`
    }
  ]
};
