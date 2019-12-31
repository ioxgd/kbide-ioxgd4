let buzzer = require("./menu/config.group.buzzer");
let sdcard = require("./menu/config.group.sdcard");

const dirIcon = Vue.prototype.$global.board.board_info.dir;

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
        {
          xml:
            `<label text="WiFi Connect" web-class="headline"></label>`
        },
        'wifi_connect',    
        'wifi_is_connected',
        {
          xml:
            `<sep gap="32"></sep>

            <label text="HTTP Client" web-class="headline"></label>
            `
        },
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
        {
          xml:
            `<sep gap="32"></sep>

            <label text="TCP Client" web-class="headline"></label>
            `
        },
        'tcp_connect',
        'tcp_is_connected',
        'tcp_send_string',
        'tcp_on_receive',
        'tcp_read_data',
        'tcp_read_line',
        {
          xml:
            `<sep gap="32"></sep>

            <label text="UDP" web-class="headline"></label>
            `
        },
        'udp_begin',
        'udp_send_string',
        'udp_on_receive',
        'udp_read_data',
        'udp_read_line',
        {
          xml:
            `<sep gap="32"></sep>

            <label text="Internet Time (NTP)" web-class="headline"></label>
            `
        },
        'ntp_sync_rtc'
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