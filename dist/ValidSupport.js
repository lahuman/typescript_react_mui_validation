"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.makeErrorProps = exports.initErrorState = exports.ErrorState = void 0;
var requiredDefaultMsg = "is required!";
var numberDefaultMsg = "is not number!";
var sameDefaultMsg = "You must enter the same value.";
var regexDefaultMsg = function (regex) {
    return "You must enter the ".concat(regex.toString(), " rule.");
};
var getNumAndMessage = function (clazz, key, type) {
    var num = 0;
    var errMsg = "";
    if (typeof clazz[type][key] === "number") {
        num = clazz[type][key];
        errMsg = "The ".concat(type, "imum is ").concat(num, "!");
    }
    else {
        num = clazz[type][key].num;
        errMsg = clazz[type][key].msg;
    }
    return { num: num, errMsg: errMsg };
};
var getLengthAndMessage = function (clazz, key, type) {
    var num = 0;
    var errMsg = "";
    if (typeof clazz["".concat(type, "Length")][key] === "number") {
        num = clazz["".concat(type, "Length")][key];
        errMsg = "The ".concat(type, "imum is ").concat(num, "!");
    }
    else {
        num = clazz["".concat(type, "Length")][key].num;
        errMsg = clazz["".concat(type, "Length")][key].msg;
    }
    return { num: num, errMsg: errMsg };
};
var minOrMaxLengthProcess = function (isMin, clazz, data, key) {
    var _a;
    var type = isMin ? "min" : "max";
    var _b = getLengthAndMessage(clazz, key, type), num = _b.num, errMsg = _b.errMsg;
    var valid = makeInitValid(key);
    var isValid = true;
    var checking = isMin
        ? data[key].trim().length < num
        : data[key].trim().length > num;
    if (checking) {
        valid = (_a = {},
            _a[key] = {
                error: true,
                errMsg: errMsg,
            },
            _a);
        isValid = false;
    }
    return { valid: valid, isValid: isValid };
};
var minOrMaxProcess = function (isMin, clazz, data, key) {
    var _a;
    var type = isMin ? "min" : "max";
    var _b = getNumAndMessage(clazz, key, type), num = _b.num, errMsg = _b.errMsg;
    var valid = makeInitValid(key);
    var isValid = true;
    var checking = isMin
        ? parseInt(data[key], 10) < num
        : parseInt(data[key], 10) > num;
    if (!isNaN(parseInt(data[key], 10)) && checking) {
        valid = (_a = {},
            _a[key] = {
                error: true,
                errMsg: errMsg,
            },
            _a);
        isValid = false;
    }
    return { valid: valid, isValid: isValid };
};
var ErrorState = /** @class */ (function () {
    function ErrorState() {
    }
    return ErrorState;
}());
exports.ErrorState = ErrorState;
exports.initErrorState = {};
var makeErrorProps = function (state, key) {
    var _a, _b;
    return ({
        error: (_a = state[key]) === null || _a === void 0 ? void 0 : _a.error,
        helperText: ((_b = state[key]) === null || _b === void 0 ? void 0 : _b.error) ? state[key].errMsg : "",
    });
};
exports.makeErrorProps = makeErrorProps;
var makeInitValid = function (key) {
    var _a;
    return (_a = {},
        _a[key] = { error: false, errMsg: "" },
        _a);
};
var noError = function (stat, key) {
    return !stat[key] || !stat[key].error;
};
var _requiredValid = function (data, key, errMsg) {
    var _a;
    var valid = makeInitValid(key);
    var isValid = true;
    var value = data[key];
    if (typeof data[key] === "string") {
        value = data[key].trim();
    }
    if (value === "") {
        valid = (_a = {}, _a[key] = { error: true, errMsg: errMsg }, _a);
        isValid = false;
    }
    return [valid, isValid];
};
var _numberValid = function (data, key, errMsg) {
    var _a;
    var valid = makeInitValid(key);
    var isValid = true;
    if (isNaN(parseInt(data[key], 10))) {
        valid = (_a = {}, _a[key] = { error: true, errMsg: errMsg }, _a);
        isValid = false;
    }
    return [valid, isValid];
};
function validation(rule, data) {
    var _a, _b;
    var newErrorState = {};
    var isValid = true;
    var requiredIsArray = rule.required instanceof Array;
    var requiredKeys = requiredIsArray
        ? rule.required
        : Object.keys(rule.required);
    for (var _i = 0, requiredKeys_1 = requiredKeys; _i < requiredKeys_1.length; _i++) {
        var key = requiredKeys_1[_i];
        var _c = _requiredValid(data, key, requiredIsArray ? requiredDefaultMsg : rule.required[key]), valid = _c[0], updateIsValid = _c[1];
        newErrorState = __assign(__assign({}, newErrorState), valid);
        if (!updateIsValid)
            isValid = false;
    }
    var numberIsArray = rule.number instanceof Array;
    var numberKeys = numberIsArray ? rule.number : Object.keys(rule.number);
    for (var _d = 0, numberKeys_1 = numberKeys; _d < numberKeys_1.length; _d++) {
        var key = numberKeys_1[_d];
        var _e = _numberValid(data, key, numberIsArray ? numberDefaultMsg : rule.number[key]), valid = _e[0], updateIsValid = _e[1];
        newErrorState = __assign(__assign({}, newErrorState), valid);
        if (!updateIsValid)
            isValid = false;
    }
    for (var _f = 0, _g = Object.keys(rule.minLength); _f < _g.length; _f++) {
        var key = _g[_f];
        if (noError(newErrorState, key)) {
            var _h = minOrMaxLengthProcess(true, rule, data, key), valid = _h.valid, noError_1 = _h.isValid;
            newErrorState = __assign(__assign({}, newErrorState), valid);
            if (!noError_1)
                isValid = noError_1;
        }
    }
    for (var _j = 0, _k = Object.keys(rule.maxLength); _j < _k.length; _j++) {
        var key = _k[_j];
        if (noError(newErrorState, key)) {
            var _l = minOrMaxLengthProcess(false, rule, data, key), valid = _l.valid, noError_2 = _l.isValid;
            newErrorState = __assign(__assign({}, newErrorState), valid);
            if (!noError_2)
                isValid = noError_2;
        }
    }
    for (var _m = 0, _o = Object.keys(rule.min); _m < _o.length; _m++) {
        var key = _o[_m];
        if (noError(newErrorState, key)) {
            var _p = minOrMaxProcess(true, rule, data, key), valid = _p.valid, noError_3 = _p.isValid;
            newErrorState = __assign(__assign({}, newErrorState), valid);
            if (!noError_3)
                isValid = noError_3;
        }
    }
    for (var _q = 0, _r = Object.keys(rule.max); _q < _r.length; _q++) {
        var key = _r[_q];
        if (noError(newErrorState, key)) {
            var _s = minOrMaxProcess(false, rule, data, key), valid = _s.valid, noError_4 = _s.isValid;
            newErrorState = __assign(__assign({}, newErrorState), valid);
            if (!noError_4)
                isValid = noError_4;
        }
    }
    for (var _t = 0, _u = Object.keys(rule.same); _t < _u.length; _t++) {
        var key = _u[_t];
        if (noError(newErrorState, key)) {
            var valid = makeInitValid(key);
            var errMsg = sameDefaultMsg;
            var cKeys = [];
            var notArray = true;
            if (rule.same[key] instanceof Array) {
                cKeys = rule.same[key];
                notArray = false;
            }
            else {
                cKeys = Object.keys(rule.same[key]);
                notArray = true;
            }
            for (var _v = 0, cKeys_1 = cKeys; _v < cKeys_1.length; _v++) {
                var cKey = cKeys_1[_v];
                valid = __assign(__assign({}, valid), makeInitValid(cKey));
                if (data[key] !== data[cKey]) {
                    valid = __assign(__assign({}, valid), (_a = {}, _a[key] = {
                        error: true,
                        errMsg: notArray ? rule.same[key][cKey] : errMsg,
                    }, _a[cKey] = {
                        error: true,
                        errMsg: notArray ? rule.same[key][cKey] : errMsg,
                    }, _a));
                    isValid = false;
                }
            }
            newErrorState = __assign(__assign({}, newErrorState), valid);
        }
    }
    for (var _w = 0, _x = Object.keys(rule.regex); _w < _x.length; _w++) {
        var key = _x[_w];
        if (noError(newErrorState, key)) {
            var valid = makeInitValid(key);
            if (data[key].trim() !== "") {
                var regex = void 0;
                var errMsg = "";
                if (rule.regex[key] instanceof RegExp) {
                    regex = rule.regex[key];
                    errMsg = regexDefaultMsg(regex);
                }
                else {
                    regex = rule.regex[key].regex;
                    errMsg = rule.regex[key].msg;
                }
                if (!regex.test(data[key])) {
                    valid = (_b = {}, _b[key] = { error: true, errMsg: errMsg }, _b);
                    isValid = false;
                }
            }
            newErrorState = __assign(__assign({}, newErrorState), valid);
        }
    }
    var newItemErrorState = {};
    if (rule.item)
        for (var _y = 0, _z = Object.keys(rule.item); _y < _z.length; _y++) {
            var key = _z[_y];
            if (data[key] instanceof Array) {
                for (var _0 = 0, _1 = Object.keys(data[key]); _0 < _1.length; _0++) {
                    var itemIdx = _1[_0];
                    var itemResult = validation(rule.item[key], data[key][itemIdx]);
                    if (newItemErrorState[key]) {
                        newItemErrorState[key].push(itemResult.newErrorState);
                    }
                    else {
                        newItemErrorState[key] = [itemResult.newErrorState];
                    }
                    if (!itemResult.isValid) {
                        isValid = false;
                    }
                }
            }
        }
    return { newErrorState: newErrorState, isValid: isValid, newItemErrorState: newItemErrorState };
}
exports.validation = validation;
