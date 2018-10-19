var fs = require('fs');
var path = require('path');
var avroToTypeScript = require('../lib/').avroToTypeScript;
var getPath = function (fileName) { return path.resolve(__dirname, fileName); };
var schemaText = fs.readFileSync(getPath('CateringPriceListCommand-value.json'), 'utf8');
var schema = JSON.parse(schemaText);
fs.writeFile(getPath('CateringPriceListCommand-value.ts'), avroToTypeScript(schema), function (err) {
    if (err)
        throw (err);
    console.log('test.ts', 'File created ');
});
