let buzzer = require("./menu/config.group.buzzer");
let sdcard = require("./menu/config.group.sdcard");

const dirIcon = Vue.prototype.$global.board.board_info.dir;
const {dialog} = require("electron").remote;

Vue.prototype.$global.ioxgd = {
  blocks: []
};

Vue.prototype.$global.$on("app-package-loaded", () => {
  Vue.prototype.$global.editor.workspace.registerButtonCallback("importDesignerProject", async () => {
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
    Vue.prototype.$global.editor.workspace.createVariable("btn2", "LVGL.Object");
  });

  Vue.prototype.$global.editor.workspace.registerToolboxCategoryCallback('getObjectBlocks', () => {
    const Blockly = Vue.prototype.$global.editor.Blockly;

    console.log("Reload");
    var xmlList = [];

    var button = document.createElement("button");
    button.setAttribute("text", "Import IOXGD Designer project");
    button.setAttribute("callbackKey", "importDesignerProject");
    xmlList.push(button);

    for (block_name of Vue.prototype.$global.ioxgd.blocks) {
      var block = document.createElement("block");
      block.setAttribute("type", block_name);
      xmlList.push(block);
    }
    
    return xmlList;
  });
});

module.exports = {
  blocks : [
    {
      name: "Object",
      index: 1,
      color: "65",
      icon: `file:///${dirIcon}/static/icons/package.svg`,
      blocks: [ ],
      custom: "getObjectBlocks"
    },
    buzzer,
    sdcard,
    {
      name: "Time",
      color: "330",
      icon: "/static/icons/SVG/c6.svg",
      blocks: [
        {
          xml:
            `<block type="time_delay">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
        },
        {
          xml:
            `<block type="time_delay_microsec">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
        },
        {
          xml: `<sep gap="32"></sep><label text="Real Time Clock" web-class="headline"></label>`
        },
        "rtc_set_datetime",
        "rtc_get_dayOfWeek",
        "rtc_get_hour",
        "rtc_get_minute",
        "rtc_get_second",
        "rtc_get_day",
        "rtc_get_month",
        "rtc_get_year"
      ]
    }
  ]
};