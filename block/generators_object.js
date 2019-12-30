module.exports = function(Blockly) {
    Blockly.JavaScript['object_on_click'] = function(block) {
        var variable_object = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
        var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
        // TODO: Assemble JavaScript into code variable.
        var code = '...;\n';
        return code;
    };

    Blockly.JavaScript['object_on_value_changed'] = function(block) {
        var variable_object = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
        var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
        // TODO: Assemble JavaScript into code variable.
        var code = '...;\n';
        return code;
    };
};
