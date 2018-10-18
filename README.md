# Avro Typescript

A simple JS library to convert Avro Schemas to TypeScript interfaces. NodeJS

## Install

```
npm install @taran-a/avro-typescript
```


## Usage

```typescript
const { avroToTypeScript } = require('@taran-a/avro-typescript');
const fs = require('fs');

const schemaText = fs.readFileSync('__SCHEMA_NAME__', 'UTF8');
const schema = JSON.parse(schemaText);
console.log(avroToTypeScript(schema));
```
