# React Mui Validation

Typescript + React + Mui + Validation

It is designed to take advantage of Mui's errors and helperText.

## Update Info

- `2022.10.26`

  - add item
    + The item rule is an Array BaseModel.

```javascript
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
```

- `2022.10.25`

  - add length check

- `2022.07.22`
  - required bug fix
  - add number type

## Installation

```sh
$ npm install react-mui-validation --save
# or
$ yarn add react-mui-validation
```

## Functions

- required
- number
- min
- max
- minLength
- maxLength
- same
- regex
- item

## Usage

### [MUI Full Example](https://github.com/lahuman/typescript_react_mui_validation_example)

You need to create a model, and the model must inherit from BaseModel.

Below is an example of PaymemtModel.

```javascript
import { BaseModel, RegexAndMsg } from "react-mui-validation";

export class PaymentModel extends BaseModel {
  static required = ["cardName", "cardNumber", "expDate", "cvv"];

  static regex = {
    cardNumber: new RegexAndMsg(
      /(5[1-5]\d{14})|(4\d{12})(\d{3}?)|3[47]\d{13}|(6011\d{12})/i,
      "wrong card number"
    ),
    cvv: new RegexAndMsg(
      /^[0-9]{3,4}$/i,
      "Last three digits on signature strip"
    ),
  };

  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;

  constructor(data: Partial<PaymentModel>) {
    super();
    const { cardName, cardNumber, expDate, cvv } = data;
    this.cardName = cardName ?? "";
    this.cardNumber = cardNumber ?? "";
    this.expDate = expDate ?? "";
    this.cvv = cvv ?? "";
  }
}
```

#### Tsx

tsx handles it as follows.

```javascript
import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DataProps } from "../App";
import { PaymentModel } from "./PaymentModel";
import { makeErrorProps } from "react-mui-validation";

export default function PaymentForm(props: DataProps<PaymentModel>) {
  const { data, setData, errorState } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "number" && parseInt(value) < 0) {
      setData({
        ...data,
        [name]: 0,
      });
      return;
    }
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={data.cardName}
            onChange={onChange}
            {...makeErrorProps(errorState, "cardName")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={data.cardNumber}
            onChange={onChange}
            {...makeErrorProps(errorState, "cardNumber")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={data.expDate}
            onChange={onChange}
            {...makeErrorProps(errorState, "expDate")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={data.cvv}
            onChange={onChange}
            {...makeErrorProps(errorState, "cvv")}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
```

#### Input validation call

Here is some code that calls validation, among other things.

```javascript
const handleNext = () => {
  let result = {
    newErrorState: {},
    isValid: false,
  };
  if (activeStep === 0) {
    result = validation(AddressModel, addressData);
  } else if (activeStep === 1) {
    result = validation(PaymentModel, paymentData);
  }

  setErrorState({
    ...errorState,
    ...result.newErrorState,
  });
  if (!result.isValid) {
    return;
  }
  setActiveStep(activeStep + 1);
};
```

Check out [Example](https://github.com/lahuman/typescript_react_mui_validation_example) for full code

> I make example by [Mui ckeckout template](https://github.com/mui/material-ui/tree/v5.8.0/docs/data/material/getting-started/templates/checkout)

## Test

```sh
$ npm run build
$ npm run Test

> react-mui-validation@0.5.0 test
> node ./dist/test/test.js

-----------------------------------
Required test ::
errorState :: {
  "name": {
    "error": true,
    "errMsg": "is required!"
  },
  "password1": {
    "error": true,
    "errMsg": "is required!"
  },
  "age": {
    "error": true,
    "errMsg": "The minimum is 18!"
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {}
Required test :: OK!
-----------------------------------
number test ::
errorState :: {
  "name": {
    "error": true,
    "errMsg": "is required!"
  },
  "password1": {
    "error": true,
    "errMsg": "is required!"
  },
  "age": {
    "error": true,
    "errMsg": "is not number!"
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {}
number test :: OK!
-----------------------------------
Min test ::
errorState :: {
  "name": {
    "error": false,
    "errMsg": ""
  },
  "password1": {
    "error": false,
    "errMsg": ""
  },
  "age": {
    "error": true,
    "errMsg": "The minimum is 18!"
  },
  "password2": {
    "error": false,
    "errMsg": ""
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {
  "itemModel": [
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    },
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    }
  ]
}
Min test :: OK!
-----------------------------------
Max test ::
errorState :: {
  "name": {
    "error": false,
    "errMsg": ""
  },
  "password1": {
    "error": false,
    "errMsg": ""
  },
  "age": {
    "error": true,
    "errMsg": "The maximum is 100!"
  },
  "password2": {
    "error": false,
    "errMsg": ""
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {
  "itemModel": [
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    },
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    }
  ]
}
Max test :: OK!
-----------------------------------
Same test ::
errorState :: {
  "name": {
    "error": false,
    "errMsg": ""
  },
  "password1": {
    "error": true,
    "errMsg": "You must enter the same value."
  },
  "age": {
    "error": false,
    "errMsg": ""
  },
  "password2": {
    "error": true,
    "errMsg": "You must enter the same value."
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {
  "itemModel": [
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    },
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    }
  ]
}
Same test :: OK!
-----------------------------------
MaxLength test ::
errorState :: {
  "name": {
    "error": true,
    "errMsg": "The maximum is 15!"
  },
  "password1": {
    "error": false,
    "errMsg": ""
  },
  "age": {
    "error": false,
    "errMsg": ""
  },
  "password2": {
    "error": false,
    "errMsg": ""
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {
  "itemModel": [
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    },
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    }
  ]
}
MaxLength test :: OK!
-----------------------------------
MinLength test ::
errorState :: {
  "name": {
    "error": false,
    "errMsg": ""
  },
  "password1": {
    "error": true,
    "errMsg": "password minimum lenght is 4"
  },
  "age": {
    "error": false,
    "errMsg": ""
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {
  "itemModel": [
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    },
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    }
  ]
}
MinLength test :: OK!
-----------------------------------
Item test ::
errorState :: {
  "name": {
    "error": false,
    "errMsg": ""
  },
  "password1": {
    "error": false,
    "errMsg": ""
  },
  "age": {
    "error": false,
    "errMsg": ""
  },
  "password2": {
    "error": false,
    "errMsg": ""
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {
  "itemModel": [
    {
      "name": {
        "error": true,
        "errMsg": "is required!"
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    },
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    }
  ],
  "itemModel2": [
    {
      "name": {
        "error": true,
        "errMsg": "The minimum is 2!"
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    }
  ]
}
Item test :: OK!
-----------------------------------
ALL RIGHT test ::
errorState :: {
  "name": {
    "error": false,
    "errMsg": ""
  },
  "password1": {
    "error": false,
    "errMsg": ""
  },
  "age": {
    "error": false,
    "errMsg": ""
  },
  "password2": {
    "error": false,
    "errMsg": ""
  },
  "email": {
    "error": false,
    "errMsg": ""
  }
}
itemErrorState :: {
  "itemModel": [
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    },
    {
      "name": {
        "error": false,
        "errMsg": ""
      },
      "price": {
        "error": false,
        "errMsg": ""
      }
    }
  ]
}
ALL RIGHT test :: OK!
```

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2022 © <a href="https://lahuman.github.io" target="_blank">lahuman</a>.
