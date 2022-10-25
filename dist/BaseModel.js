"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = exports.RegexAndMsg = exports.NumberAndMsg = void 0;
var NumberAndMsg = /** @class */ (function () {
    function NumberAndMsg(num, msg) {
        this.num = num;
        this.msg = msg;
    }
    return NumberAndMsg;
}());
exports.NumberAndMsg = NumberAndMsg;
var RegexAndMsg = /** @class */ (function () {
    function RegexAndMsg(regex, msg) {
        this.regex = regex;
        this.msg = msg;
    }
    return RegexAndMsg;
}());
exports.RegexAndMsg = RegexAndMsg;
var BaseModel = /** @class */ (function () {
    function BaseModel() {
    }
    BaseModel.required = [];
    BaseModel.number = [];
    BaseModel.min = {};
    BaseModel.max = {};
    BaseModel.same = {};
    BaseModel.regex = {};
    BaseModel.minLength = {};
    BaseModel.maxLength = {};
    return BaseModel;
}());
exports.BaseModel = BaseModel;
