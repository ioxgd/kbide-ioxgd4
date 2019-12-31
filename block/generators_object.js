const fs = require("fs");
const path = require('path');
const { promisify } = require('util');
const crypto = require('crypto');
const { dialog } = require("electron").remote;
const ioxgd_codegen = require("../ioxgd/codegen");

const engine = Vue.prototype.$engine;

const writeFileAsync = promisify(fs.writeFile);

const GB = Vue.prototype.$global;

GB.ioxgd = {
    blocks: [],
    component: [],
    designfile: "",
    designfile_md5: ""
}

let checkHasObject = (object_name) => {
    return GB.ioxgd.component.filter((comp) => comp.name === object_name).length > 0;
};

let objectNameFirst = (object_name) => {
    if (typeof object_name !== "undefined") {
        return GB.ioxgd.component.filter((comp) => comp.name === object_name)[0].property.name;
    } else {
        return GB.ioxgd.component[0].property.name;
    }
};

let md5file = (file) => new Promise((resolve, reject) => {
    let md5sum = crypto.createHash('md5');
    try {
      let s = fs.ReadStream(file);

      s.on('data', function (data) {
        md5sum.update(data)
      });

      s.on('end', function () {
        return resolve(md5sum.digest('hex'));
      });
    } catch (error) {
      return reject(error);
    }
});

// Set timer for check file update
GB.ioxgd.check_designfile_update = async () => {
    let hash = await md5file(GB.ioxgd.designfile);
    if (hash !== GB.ioxgd.designfile_md5 && GB.ioxgd.designfile_md5.length > 0) {
        await (new Promise((resolve, reject) => {
            // Ask user update file
            Vue.prototype.$dialog.confirm({
                text: 'Design file are update. Are you want to update Blocks ?',
                title: 'IOXGD Notify',
                actions: {
                    false: {
                        text: 'Next time',
                        handle: resolve
                    },
                    true: {
                        color: 'green',
                        text: 'Update Now',
                        handle: () => {
                            GB.$emit("ioxgd-reload-design-file");
                            resolve();
                        }
                    }
                }
            });
        }));
    }
    GB.ioxgd.designfile_md5 = hash;

    // Timer via setTimeout, pulling every 1s sec
    GB.ioxgd.check_designfile_update_timer = setTimeout(GB.ioxgd.check_designfile_update, 1000);
};

GB.$on('ioxgd-reload-design-file', async () => {
    // Stop timer
    clearTimeout(GB.ioxgd.check_designfile_update_timer);
    GB.ioxgd.designfile_md5 = "";

    let fileContent = fs.readFileSync(GB.ioxgd.designfile);
    let fileObject = JSON.parse(fileContent);
    
    GB.ioxgd.component = [];
    let components = fileObject.page[0].component;
    for (let [name, component] of Object.entries(components)) {
        GB.ioxgd.component.push(component);
    }
    
    GB.ioxgd.blocks = new DOMParser().parseFromString(`
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
    
    let allBlocks = GB.editor.workspace.getAllBlocks();
    if (!allBlocks.find(x => x.type === 'object_load_page')) {
        // Add load page block to workspace
        var loadPageBlock = GB.editor.workspace.newBlock('object_load_page');
        loadPageBlock.initSvg();
        loadPageBlock.render();
    }

    // Update toolbox
    GB.editor.workspace.getToolbox().refreshSelection();
    
    // Gen code into include dir
    ioxgd_codegen(GB.ioxgd.designfile);

    // Start timer
    GB.ioxgd.check_designfile_update();
});

let importButton = async () => {
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

    GB.ioxgd.designfile = result[0];

    GB.$emit("ioxgd-reload-design-file");
}

// when page loaded
GB.$once('board-package-loaded', () => {
    // Ask user import file
    Vue.prototype.$dialog.confirm({
        text: 'Please import a design file for program GUI via Blocks.',
        title: 'IOXGD Notify',
        actions: {
            false: 'Next time',
            true: {
                color: 'green',
                text: 'Import Now',
                handle: importButton
            }
        }
    });
});

module.exports = function(Blockly) {
    

    Blockly.getMainWorkspace().registerButtonCallback("importDesignerProject", importButton);
    
    Blockly.getMainWorkspace().registerToolboxCategoryCallback('getObjectBlocks', () => {
        const Blockly = GB.editor.Blockly;
    
        // console.log("Reload");
        var xmlList = [];
    
        var button = document.createElement("button");
        button.setAttribute("text", "Import IOXGD Designer project");
        button.setAttribute("callbackKey", "importDesignerProject");
        xmlList.push(button);
    
        xmlList = xmlList.concat(...GB.ioxgd.blocks);
    
        // console.log(xmlList);
        
        return xmlList;
    });

    // ----- Delete old file -----  //
    let oldFiles = engine.util.walk(`${__dirname}/../include/codegen`).filter(f => ['.c' , '.cpp'].indexOf(path.extname(f)) >= 0);
    for (let file of oldFiles) {
        fs.unlink(file, () => console.info(`delete ${file}`));
    }

    
    

    // ----- Blocks -----  //
    let defineObject = (name) => `#VARIABLEextern lv_obj_t *${name};#END`;

    Blockly.JavaScript['object_load_page'] = function(block) {
        var code = `
        #VARIABLEextern void loadPage();#END
        #SETUPloadPage();#END
        `;
        return code;
    };
    
    Blockly.JavaScript['object_on_click'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
        var code = 
        `${defineObject(dropdown_object)}
        #BLOCKSETUP
        lv_obj_set_event_cb(${dropdown_object}, [](lv_obj_t * obj, lv_event_t event) {
            if(event == LV_EVENT_CLICKED) {
                ${statements_callback}
            }
        });\n
        #END`;
        return code;
    };

    Blockly.JavaScript['object_on_value_changed'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
        var code = 
        `${defineObject(dropdown_object)}
        #BLOCKSETUP
        lv_obj_set_event_cb(${dropdown_object}, [](lv_obj_t * obj, lv_event_t event) {
            if(event == LV_EVENT_VALUE_CHANGED) {
                ${statements_callback}
            }
        });\n
        #END`;
        return code;
    };

    Blockly.JavaScript['object_show'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_obj_set_hidden(${dropdown_object}, false);\n`;
        return code;
    };

    Blockly.JavaScript['object_hide'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_obj_set_hidden(${dropdown_object}, true);\n`;
        return code;
    };

    Blockly.JavaScript['object_set_text'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var value_name = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${defineObject(dropdown_object)}\n lv_label_set_text(${dropdown_object}, String(${value_name}).c_str()); lv_obj_realign(${dropdown_object});\n`;
        return code;
    };

    Blockly.JavaScript['object_led_on'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_led_on(${dropdown_object});\n`;
        return code;
    };

    Blockly.JavaScript['object_led_off'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_led_off(${dropdown_object});\n`;
        return code;
    };

    Blockly.JavaScript['object_led_set_bright'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var value_brightness = Blockly.JavaScript.valueToCode(block, 'brightness', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${defineObject(dropdown_object)}\n lv_led_set_bright(${dropdown_object}, ${value_brightness});\n`;
        return code;
    };

    Blockly.JavaScript['object_slider_get_value'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_slider_get_value(${dropdown_object})`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.JavaScript['object_slider_set_value'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${defineObject(dropdown_object)}\n lv_slider_set_value(${dropdown_object}, ${value_value}, LV_ANIM_ON);\n`;
        return code;
    };

    Blockly.JavaScript['object_chart_add_data'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${defineObject(dropdown_object)}\n lv_chart_set_next(${dropdown_object}, ser1, ${value_data});\n`;
        return code;
    };

    Blockly.JavaScript['object_switch_get_state'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_sw_get_state(${dropdown_object})`;
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

      Blockly.JavaScript['object_switch_on'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_sw_on(${dropdown_object}, LV_ANIM_ON);\n`;
        return code;
    };

    Blockly.JavaScript['object_switch_off'] = function(block) {
        var dropdown_object = block.getFieldValue('object');
        var code = `${defineObject(dropdown_object)}\n lv_sw_off(${dropdown_object}, LV_ANIM_ON);\n`;
        return code;
    };
};
