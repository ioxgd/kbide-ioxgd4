let buzzer = require("./menu/config.group.buzzer");
let sdcard = require("./menu/config.group.sdcard");

const dirIcon = Vue.prototype.$global.board.board_info.dir;

Vue.prototype.$global.$on("app-package-loaded", () => {
  Vue.prototype.$global.editor.workspace.registerButtonCallback("importDesignerProject", async () => {
    const Blockly = Vue.prototype.$global.editor.Blockly;

    Blockly.Blocks["testAdd"] = {
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
        this.setColour(0);
        this.setTooltip("Buzzer begin at pin 25");
        this.setHelpUrl("");
      }
    };

    Blockly.JavaScript["testAdd"] = function(block) {
      var value_tone = block.getFieldValue("NOTE");
      var value_dulation = block.getFieldValue("DURATION");
      var code = `tone(BUZZER_PIN, ${value_tone}, ${value_dulation}); `;
      return code;
    };

    Vue.prototype.$global.editor.workspace.registerToolboxCategoryCallback('Object', () => {
      console.log("Reload");
      var xmlList = [];
      var blockText = '<block type="testAdd"></block>';
      var block = Blockly.Xml.textToDom(blockText);
      xmlList.push(block);
      return xmlList;
    });

    /*

    var newBlock = Vue.prototype.$global.editor.workspace.newBlock("testAdd");
    newBlock.initSvg();
    newBlock.render();
    */
    const {dialog} = require("electron").remote;

    let result = await dialog.showOpenDialog({
      properties: [
        'openFile'
      ],
      filters: [{ 
          name: 'GD', 
          extensions: ['gd'] 
      }]
    });

    if (result == undefined) {
      return;
    }

    let OpenfilePath = result[0];

    console.log(OpenfilePath);
  });
});

module.exports = {
  blocks : [
    {
      name: "Object",
      index: 1,
      color: "65",
      icon: `file:///${dirIcon}/static/icons/package.svg`,
      blocks: [{
        xml: `<button text="Import IOXGD Designer project" callbackKey="importDesignerProject"></button>`
      }]
    },
    buzzer,
    sdcard,
  ]
};