"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var index_1 = require("../index");
var ItemModel = /** @class */ (function (_super) {
    __extends(ItemModel, _super);
    function ItemModel(data) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this) || this;
        _this.name = (_a = data.name) !== null && _a !== void 0 ? _a : "";
        _this.price = (_b = data.price) !== null && _b !== void 0 ? _b : 0;
        return _this;
    }
    ItemModel.required = ["name", "price"];
    ItemModel.number = { price: "Price must number type" };
    ItemModel.minLength = { name: 2 };
    return ItemModel;
}(index_1.BaseModel));
var TestModel = /** @class */ (function (_super) {
    __extends(TestModel, _super);
    function TestModel(data) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        _this = _super.call(this) || this;
        _this.name = (_a = data.name) !== null && _a !== void 0 ? _a : "";
        _this.password1 = (_b = data.password1) !== null && _b !== void 0 ? _b : "";
        _this.password2 = (_c = data.password2) !== null && _c !== void 0 ? _c : "";
        _this.age = (_d = data.age) !== null && _d !== void 0 ? _d : 0;
        _this.email = (_e = data.email) !== null && _e !== void 0 ? _e : "";
        _this.itemModel = (_f = data.itemModel) !== null && _f !== void 0 ? _f : [];
        _this.itemModel2 = (_g = data.itemModel2) !== null && _g !== void 0 ? _g : [];
        return _this;
    }
    TestModel.item = { itemModel: ItemModel, itemModel2: ItemModel };
    TestModel.required = ["name", "password1"];
    TestModel.same = { password1: ["password2"] };
    TestModel.number = ["age"];
    TestModel.min = { age: 18 };
    TestModel.max = { age: 100 };
    TestModel.maxLength = { name: 15 };
    TestModel.minLength = {
        password1: { num: 4, msg: "password minimum lenght is 4" },
    };
    TestModel.regex = {
        email: new index_1.RegexAndMsg(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, "You must enter email address!"),
    };
    return TestModel;
}(index_1.BaseModel));
function runTest(type, data) {
    console.log("-----------------------------------");
    console.log("".concat(type, " test ::"));
    var result = (0, index_1.validation)(TestModel, data);
    console.log("errorState :: ".concat(JSON.stringify(result.newErrorState, null, 2)));
    if (result.newItemErrorState)
        console.log("itemErrorState :: ".concat(JSON.stringify(result.newItemErrorState, null, 2)));
    return result;
}
function errorTest(type, data) {
    var result = runTest(type, data);
    if (result.isValid) {
        throw new Error("".concat(type, " Not Work!!!!!"));
    }
    console.log("".concat(type, " test :: OK!"));
}
function passTest(type, data) {
    var result = runTest(type, data);
    if (!result.isValid) {
        throw new Error("".concat(type, " Not Work!!!!!"));
    }
    console.log("".concat(type, " test :: OK!"));
}
var defaultTestModel = new TestModel({
    name: "test",
    password1: "123456",
    password2: "123456",
    age: 20,
    email: "lahuman@daum.net",
    itemModel: [
        new ItemModel({ name: "box", price: 1000 }),
        { name: "box", price: 1000 },
    ],
});
function main() {
    // TestModel.required = ['a', 'b'];
    errorTest("Required", new TestModel({}));
    errorTest("number", new TestModel({ age: Number.NaN }));
    errorTest("Min", new TestModel(__assign(__assign({}, defaultTestModel), { age: 15 })));
    errorTest("Max", new TestModel(__assign(__assign({}, defaultTestModel), { age: 200 })));
    errorTest("Same", new TestModel(__assign(__assign({}, defaultTestModel), { password2: "4567" })));
    errorTest("MaxLength", new TestModel(__assign(__assign({}, defaultTestModel), { name: "123456789123456789" })));
    errorTest("MinLength", new TestModel(__assign(__assign({}, defaultTestModel), { password1: "234", password2: "234" })));
    errorTest("Item", new TestModel(__assign(__assign({}, defaultTestModel), { itemModel: [
            new ItemModel({ price: 1000 }),
            new ItemModel({ price: 1000, name: 'ab' }),
        ], itemModel2: [new ItemModel({ price: 1000, name: 'd' })] })));
    passTest("ALL RIGHT", defaultTestModel);
}
main();
