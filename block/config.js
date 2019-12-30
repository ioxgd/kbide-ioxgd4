let buzzer = require("./menu/config.group.buzzer");
let sdcard = require("./menu/config.group.sdcard");
const fs = require("fs");
const path = require('path');
const { promisify } = require('util');
const ioxgd_codegen = require("../ioxgd/codegen");

const writeFileAsync = promisify(fs.writeFile);

const dirIcon = Vue.prototype.$global.board.board_info.dir;
const {dialog} = require("electron").remote;

Vue.prototype.$global.ioxgd = {
  blocks: [],
  component: []
};

let text2dom = (text) => new DOMParser().parseFromString(text, "text/xml").firstChild;

let checkHasObject = (object_name) => {
  return Vue.prototype.$global.ioxgd.component.filter((comp) => comp.name === object_name).length > 0;
};

let objectNameFirst = (object_name) => {
  if (typeof object_name !== "undefined") {
    return Vue.prototype.$global.ioxgd.component.filter((comp) => comp.name === object_name)[0].property.name;
  } else {
    return Vue.prototype.$global.ioxgd.component[0].property.name;
  }
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

    let fileContent = fs.readFileSync(OpenfilePath);
    let fileObject = JSON.parse(fileContent);
    
    Vue.prototype.$global.ioxgd.component = [];
    let components = fileObject.page[0].component;
    for (let [name, component] of Object.entries(components)) {
      Vue.prototype.$global.ioxgd.component.push(component);
    }
    
    Vue.prototype.$global.ioxgd.blocks = new DOMParser().parseFromString(`
<xml>
  <label text="Any" web-class="headline"></label>
  <block type="object_show"></block>
  <block type="object_hide"></block>
${checkHasObject('Label') ? `
  <sep gap="32"></sep>

  <label text="Label" web-class="headline"></label>
  <block type="object_set_text">
    <field name="object">${objectNameFirst('Label')}</field>
    <value name="text">
        <shadow type="basic_string">
            <field name="VALUE">Hello, IOXGD !</field>
        </shadow>
    </value>
  </block>
  ` : ''}
  ${checkHasObject('Button') ? `
  <sep gap="32"></sep>

  <label text="Button" web-class="headline"></label>
  <block type="object_on_click">
    <field name="object">${objectNameFirst('Button')}</field>
  </block>
  <block type="object_set_text">
    <field name="object">${objectNameFirst('Button')}</field>
    <value name="text">
        <shadow type="basic_string">
            <field name="VALUE">Hello, IOXGD !</field>
        </shadow>
    </value>
  </block>
  ` : ''}
  ${checkHasObject('LED') ? `
  <sep gap="32"></sep>

  <label text="LED" web-class="headline"></label>
  <block type="object_led_on">
    <field name="object">${objectNameFirst('LED')}</field>
  </block>
  <block type="object_led_off">
    <field name="object">${objectNameFirst('LED')}</field>
  </block>
  <block type="object_led_set_bright">
    <field name="object">${objectNameFirst('LED')}</field>
    <value name="brightness">
      <shadow type="math_number">
        <field name="NUM">190</field>
      </shadow>
    </value>
  </block>
  ` : ''}
  ${checkHasObject('Chart') ? `
  <sep gap="32"></sep>

  <label text="Chart" web-class="headline"></label>
  ` : ''}
  ${checkHasObject('Switch') ? `
  <sep gap="32"></sep>

  <label text="Switch" web-class="headline"></label>
  <block type="object_on_value_changed">
    <field name="object">${objectNameFirst('Switch')}</field>
  </block>

  <sep gap="32"></sep>
  ` : ''}
  ${checkHasObject('Slider') ? `
  <label text="Slider" web-class="headline"></label>
  <block type="object_on_value_changed">
    <field name="object">${objectNameFirst('Slider')}</field>
  </block>
  <block type="object_slider_get_value">
    <field name="object">${objectNameFirst('Slider')}</field>
  </block>
  <block type="object_slider_set_value">
    <field name="object">${objectNameFirst('Slider')}</field>
    <value name="value">
      <shadow type="math_number">
        <field name="NUM">50</field>
      </shadow>
    </value>
  </block>
  ` : ''}
</xml>
    `, "text/xml").firstChild.children;
    
    let allBlocks = Vue.prototype.$global.editor.workspace.getAllBlocks();
    if (!allBlocks.find(x => x.type === 'object_load_page')) {
      // Add load page block to workspace
      var loadPageBlock = Vue.prototype.$global.editor.workspace.newBlock('object_load_page');
      loadPageBlock.initSvg();
      loadPageBlock.render();
    }

    // Update toolbox
    Vue.prototype.$global.editor.workspace.getToolbox().refreshSelection();
    
    // Gen code into include dir
    ioxgd_codegen(OpenfilePath).then(async (code) => {
      let cppout = path.resolve(`${__dirname}/../include/codegen/design.cpp`);
      await writeFileAsync(cppout, `#include "lvgl.h"\n\n${code.header}\n\nvoid loadPage(){\n${code.code}\n}`);
      console.log("Write file !")
    });
  });

  Vue.prototype.$global.editor.workspace.registerToolboxCategoryCallback('getObjectBlocks', () => {
    const Blockly = Vue.prototype.$global.editor.Blockly;

    // console.log("Reload");
    var xmlList = [];

    var button = document.createElement("button");
    button.setAttribute("text", "Import IOXGD Designer project");
    button.setAttribute("callbackKey", "importDesignerProject");
    xmlList.push(button);

    xmlList = xmlList.concat(...Vue.prototype.$global.ioxgd.blocks);

    // console.log(xmlList);
    
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
    }, {
      name : 'WiFi',
      index : 30,
      icon : '/static/icons/icons8_wifi_router_96px.png',
      blocks : [
        'wifi_connect',    
        {
          xml : 
            `<block type="wifi_http_get">
              <value name="url">
                <shadow type="basic_string">
                  <field name="VALUE">https://www.ioxgd.com/</field>
                </shadow>
              </value>
            </block>`
        },
        {
          xml : 
            `<block type="wifi_http_post">
              <value name="url">
                <shadow type="basic_string">
                  <field name="VALUE">https://www.ioxgd.com/</field>
                </shadow>
              </value>
              <value name="data">
                <shadow type="basic_string">
                  <field name="VALUE">Hello !</field>
                </shadow>
              </value>
            </block>`
        },                
        // 'wifi_get_ip_addr',
      ]
    },
    {
      name : 'Bluetooth',
      index : 40,
      icon : '/static/icons/icons8_bluetooth_2_96px.png',
      blocks : [
        'bt_start',
        {
          xml : 
            `<block type="bt_send_string">
              <value name="text">
                <shadow type="basic_string">
                  <field name="VALUE">Hello !</field>
                </shadow>
              </value>
            </block>`
        },
        'bt_on_receive',
        'bt_read_data',
        'bt_read_line'
      ]
    }
    
    
  ]
};