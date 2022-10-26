import { KeyAndNumber, KeyAndKeyAndMsg } from "../BaseModel";
import { BaseModel, RegexAndMsg, validation } from "../index";

class ItemModel extends BaseModel {
  name: string;
  price: number;

  static readonly required = ["name", "price"];
  static readonly number = { price: "Price must number type" };
  static readonly minLength = { name: 2 };

  constructor(data: Partial<ItemModel>) {
    super();
    this.name = data.name ?? "";
    this.price = data.price ?? 0;
  }
}

class TestModel extends BaseModel {
  name: string;
  password1: string;
  password2: string;
  age: number;
  email: string;
  itemModel: ItemModel[];
  itemModel2: ItemModel[];

  static readonly item = { itemModel: ItemModel, itemModel2: ItemModel };
  static readonly required = ["name", "password1"];
  static readonly same = { password1: ["password2"] };
  static readonly number = ["age"];
  static readonly min = { age: 18 };
  static readonly max = { age: 100 };
  static readonly maxLength = { name: 15 };
  static readonly minLength = {
    password1: { num: 4, msg: "password minimum lenght is 4" },
  };
  static readonly regex = {
    email: new RegexAndMsg(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      "You must enter email address!"
    ),
  };

  constructor(data: Partial<TestModel>) {
    super();

    this.name = data.name ?? "";
    this.password1 = data.password1 ?? "";
    this.password2 = data.password2 ?? "";
    this.age = data.age ?? 0;
    this.email = data.email ?? "";
    this.itemModel = data.itemModel ?? [];
    this.itemModel2 = data.itemModel2 ?? [];
  }
}

function runTest(type: string, data: BaseModel) {
  console.log("-----------------------------------");
  console.log(`${type} test ::`);
  const result = validation(TestModel, data);
  console.log(`errorState :: ${JSON.stringify(result.newErrorState, null, 2)}`);
  if (result.newItemErrorState)
    console.log(
      `itemErrorState :: ${JSON.stringify(result.newItemErrorState, null, 2)}`
    );
  return result;
}

function errorTest(type: string, data: BaseModel): void {
  const result = runTest(type, data);
  if (result.isValid) {
    throw new Error(`${type} Not Work!!!!!`);
  }
  console.log(`${type} test :: OK!`);
}

function passTest(type: string, data: BaseModel): void {
  const result = runTest(type, data);
  if (!result.isValid) {
    throw new Error(`${type} Not Work!!!!!`);
  }
  console.log(`${type} test :: OK!`);
}

const defaultTestModel = new TestModel({
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
  errorTest(
    "Min",
    new TestModel({
      ...defaultTestModel,
      age: 15,
    })
  );

  errorTest(
    "Max",
    new TestModel({
      ...defaultTestModel,
      age: 200,
    })
  );

  errorTest(
    "Same",
    new TestModel({
      ...defaultTestModel,
      password2: "4567",
    })
  );

  errorTest(
    "MaxLength",
    new TestModel({
      ...defaultTestModel,
      name: "123456789123456789",
    })
  );

  errorTest(
    "MinLength",
    new TestModel({
      ...defaultTestModel,
      password1: "234",
      password2: "234",
    })
  );

  errorTest(
    "Item",
    new TestModel({
      ...defaultTestModel,
      itemModel: [
        new ItemModel({ price: 1000 }),
        new ItemModel({ price: 1000, name: 'ab' }),
      ],
      itemModel2: [new ItemModel({ price: 1000, name: 'd' })],
    })
  );

  passTest("ALL RIGHT", defaultTestModel);
}

main();
