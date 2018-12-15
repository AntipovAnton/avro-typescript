"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const helper_1 = require("./helper");
/** Convert a primitive type from avro to TypeScript */
function convertPrimitive(avroType) {
    switch (avroType) {
        case "long":
        case "int":
        case "double":
        case "float":
            return "number";
        case "bytes":
            return "Buffer";
        case "null":
            return "null";
        case "boolean":
            return "boolean";
        case "string":
            return "string";
        default:
            return null;
    }
}
const recordBuffer = new Map();
function checkBufferRecord(type) {
    const name = type.split('.').pop();
    return recordBuffer.get(name);
}
/** Converts an Avro record type to a TypeScript file */
function avroToTypeScript(recordType) {
    const output = [];
    convertRecord(recordType, output);
    return output.join("\n");
}
exports.avroToTypeScript = avroToTypeScript;
/** Convert an Avro Record type. Return the name, but add the definition to the file */
function convertRecord(recordType, fileBuffer) {
    let buffer = `export interface ${recordType.name} {\n`;
    for (let field of recordType.fields) {
        buffer += convertFieldDec(field, fileBuffer) + "\n";
    }
    buffer += "}\n";
    fileBuffer.push(buffer);
    recordBuffer.set(recordType.name, recordType.name);
    return recordType.name;
}
function wrapUnionRecord(recordType, fileBuffer) {
    const wrapUnionName = `${recordType.name}UnionWrap`;
    let buffer = `export interface ${wrapUnionName} {\n`;
    buffer += convertFieldUnion(recordType) + "\n";
    buffer += "}\n";
    fileBuffer.push(buffer);
    recordBuffer.set(wrapUnionName, wrapUnionName);
    return wrapUnionName;
}
function wrapUnionPrimitive(type, fileBuffer) {
    let name = helper_1.capitalizeString(`${type}UnionWrap`);
    let buffer = `export interface ${name} {\n\t${type}: ${convertPrimitive(type)};\n}\n`;
    fileBuffer.push(buffer);
    recordBuffer.set(name, name);
    return name;
}
/** Convert an Avro Enum type. Return the name, but add the definition to the file */
function convertEnum(enumType, fileBuffer) {
    const enumDef = `export enum ${enumType.name} { ${enumType.symbols.join(", ")} };\n`;
    fileBuffer.push(enumDef);
    return enumType.name;
}
const wrapUnionType = (type, buffer) => {
    if (model_1.isRecordType(type)) {
        convertType(type, buffer);
        return wrapUnionRecord(type, buffer);
    }
    if (typeof type === 'string' && checkBufferRecord(`${type}UnionWrap`)) {
        return checkBufferRecord(`${type}UnionWrap`);
    }
    if (typeof type === 'string' && checkBufferRecord(`${helper_1.capitalizeString(type)}UnionWrap`)) {
        return checkBufferRecord(`${helper_1.capitalizeString(type)}UnionWrap`);
    }
    if (type === 'null') {
        return convertType(type, buffer);
    }
    if (type.type) {
        return wrapUnionPrimitive(type.type, buffer);
    }
    return wrapUnionPrimitive(type, buffer);
};
const convertUnion = (union, buffer) => {
    return union.map(type => wrapUnionType(type, buffer)).join(" | ");
};
function convertType(type, buffer) {
    // if it's just a name, then use that
    if (typeof type === "string") {
        return (convertPrimitive(type) || checkBufferRecord(type) || type);
    }
    else if (type instanceof Array) {
        // array means a Union. Use the names and call recursively
        return convertUnion(type, buffer);
    }
    else if (model_1.isRecordType(type)) {
        // record, use the name and add to the buffer
        return convertRecord(type, buffer);
    }
    else if (model_1.isArrayType(type)) {
        // array, call recursively for the array element type
        return convertType(type.items, buffer) + "[]";
    }
    else if (model_1.isMapType(type)) {
        // Dictionary of types, string as key
        return `{ [index:string]:${convertType(type.values, buffer)} }`;
    }
    else if (model_1.isEnumType(type)) {
        // array, call recursively for the array element type
        return convertEnum(type, buffer);
    }
    else if (model_1.isLogicalType(type)) {
        const { type: primitive } = type;
        return (convertPrimitive(primitive) || primitive);
    }
    else if (type.type) {
        return convertType(type.type, buffer);
    }
    else {
        console.error("Cannot work out type", type);
        return "UNKNOWN";
    }
}
function convertFieldUnion(record) {
    const name = helper_1.getRecordName(record);
    return `\t${name}: ${record.name};`;
}
function convertFieldDec(field, buffer) {
    // Union Type
    return `\t${field.name}${model_1.isOptional(field.type) ? "?" : ""}: ${convertType(field.type, buffer)};`;
}
