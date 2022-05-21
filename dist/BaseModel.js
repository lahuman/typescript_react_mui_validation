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
    Object.defineProperty(BaseModel, "required", {
        get: function () {
            return this._required;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseModel, "min", {
        get: function () {
            return this._min;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseModel, "max", {
        get: function () {
            return this._max;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseModel, "same", {
        get: function () {
            return this._same;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseModel, "regex", {
        get: function () {
            return this._regex;
        },
        enumerable: false,
        configurable: true
    });
    BaseModel._required = [];
    BaseModel._min = {};
    BaseModel._max = {};
    BaseModel._same = {};
    BaseModel._regex = {};
    return BaseModel;
}());
exports.BaseModel = BaseModel;
