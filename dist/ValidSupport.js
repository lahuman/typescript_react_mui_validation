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
function validation(data) {
    var _a, _b, _c, _d;
    var newErrorState = {};
    var isValid = true;
    var clazz = Object.getPrototypeOf(data).constructor;
    console.log(data);
    console.log(clazz);
    if (clazz.required instanceof Array) {
        for (var _i = 0, _e = clazz.required; _i < _e.length; _i++) {
            var key = _e[_i];
            var valid = makeInitValid(key);
            if (data[key].trim() === "") {
                valid = (_a = {}, _a[key] = { error: true, errMsg: requiredDefaultMsg }, _a);
                isValid = false;
            }
            newErrorState = __assign(__assign({}, newErrorState), valid);
        }
    }
    else {
        for (var _f = 0, _g = Object.keys(clazz.required); _f < _g.length; _f++) {
            var key = _g[_f];
            var valid = makeInitValid(key);
            if (data[key].trim() === "") {
                valid = (_b = {}, _b[key] = { error: true, errMsg: clazz.required[key] }, _b);
                isValid = false;
            }
            newErrorState = __assign(__assign({}, newErrorState), valid);
        }
    }
    for (var _h = 0, _j = Object.keys(clazz.min); _h < _j.length; _h++) {
        var key = _j[_h];
        if (noError(newErrorState, key)) {
            var _k = minOrMaxProcess(true, clazz, data, key), valid = _k.valid, noError_1 = _k.isValid;
            newErrorState = __assign(__assign({}, newErrorState), valid);
            if (!noError_1)
                isValid = noError_1;
        }
    }
    for (var _l = 0, _m = Object.keys(clazz.max); _l < _m.length; _l++) {
        var key = _m[_l];
        if (noError(newErrorState, key)) {
            var _o = minOrMaxProcess(false, clazz, data, key), valid = _o.valid, noError_2 = _o.isValid;
            newErrorState = __assign(__assign({}, newErrorState), valid);
            if (!noError_2)
                isValid = noError_2;
        }
    }
    for (var _p = 0, _q = Object.keys(clazz.same); _p < _q.length; _p++) {
        var key = _q[_p];
        if (noError(newErrorState, key)) {
            var valid = makeInitValid(key);
            var errMsg = sameDefaultMsg;
            var cKeys = [];
            var notArray = true;
            if (clazz.same[key] instanceof Array) {
                cKeys = clazz.same[key];
                notArray = false;
            }
            else {
                cKeys = Object.keys(clazz.same[key]);
                notArray = true;
            }
            for (var _r = 0, cKeys_1 = cKeys; _r < cKeys_1.length; _r++) {
                var cKey = cKeys_1[_r];
                valid = __assign(__assign({}, valid), makeInitValid(cKey));
                if (data[key] !== data[cKey]) {
                    valid = __assign(__assign({}, valid), (_c = {}, _c[key] = {
                        error: true,
                        errMsg: notArray ? clazz.same[key][cKey] : errMsg,
                    }, _c[cKey] = {
                        error: true,
                        errMsg: notArray ? clazz.same[key][cKey] : errMsg,
                    }, _c));
                    isValid = false;
                }
            }
            newErrorState = __assign(__assign({}, newErrorState), valid);
        }
    }
    for (var _s = 0, _t = Object.keys(clazz.regex); _s < _t.length; _s++) {
        var key = _t[_s];
        if (noError(newErrorState, key)) {
            var valid = makeInitValid(key);
            if (data[key].trim() !== "") {
                var regex = void 0;
                var errMsg = "";
                if (clazz.regex[key] instanceof RegExp) {
                    regex = clazz.regex[key];
                    errMsg = regexDefaultMsg(regex);
                }
                else {
                    regex = clazz.regex[key].regex;
                    errMsg = clazz.regex[key].msg;
                }
                if (!regex.test(data[key])) {
                    valid = (_d = {}, _d[key] = { error: true, errMsg: errMsg }, _d);
                    isValid = false;
                }
            }
            newErrorState = __assign(__assign({}, newErrorState), valid);
        }
    }
    return { newErrorState: newErrorState, isValid: isValid };
}
exports.validation = validation;
