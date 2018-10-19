"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordName = (record) => {
    const { name, namespace } = record;
    return (namespace ? `'${namespace}.${name}'` : name);
};
exports.capitalizeString = (string) => {
    return string.replace(/^./, string[0].toUpperCase());
};
