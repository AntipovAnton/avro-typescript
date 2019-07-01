"use strict";
exports.__esModule = true;
exports.getRecordName = function (record) {
    var name = record.name, namespace = record.namespace;
    return (namespace ? "'" + namespace + "." + name + "'" : name);
};
exports.capitalizeString = function (string) {
    return string.replace(/^./, string[0].toUpperCase());
};
