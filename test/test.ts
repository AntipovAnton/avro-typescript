const fs = require('fs');
const path = require('path');
const { avroToTypeScript } = require('../lib/');

const getPath = (fileName) => path.resolve(__dirname, fileName);

const schemaText = fs.readFileSync(getPath('CateringPriceListCommand-value.json'), 'utf8');
const schema = JSON.parse(schemaText);

fs.writeFile(getPath('CateringPriceListCommand-value.ts'), avroToTypeScript(schema), (err) => {
    if (err) throw (err);
    console.log('test.ts', 'File created ');
});


