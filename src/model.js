"use strict";
/**** Contains the Interfaces and Type Guards for Avro schema */
exports.__esModule = true;
function isRecordType(type) {
    return type.type === "record";
}
exports.isRecordType = isRecordType;
function isArrayType(type) {
    return type.type === "array";
}
exports.isArrayType = isArrayType;
function isMapType(type) {
    return type.type === "map";
}
exports.isMapType = isMapType;
function isEnumType(type) {
    return type.type === "enum";
}
exports.isEnumType = isEnumType;
function isLogicalType(type) {
    return !!type.logicalType;
}
exports.isLogicalType = isLogicalType;
function isUnion(type) {
    return type instanceof Array;
}
exports.isUnion = isUnion;
function isOptional(type) {
    if (isUnion(type)) {
        var t1 = type[0];
        if (typeof t1 === "string") {
            return t1 === "null";
        }
    }
}
exports.isOptional = isOptional;
