# React Mui Validation

Typescript + React + Mui + Validation 

It is designed to take advantage of Mui's errors and helperText.

## Installation 
```sh
$ npm install react-mui-validation --save
# or
$ yarn add react-mui-validation
```

## Usage

### Model

You need to create a model, and the model must inherit from BaseModel.

Below is an example of PaymemtModel.

```javascript

export class PaymentModel extends BaseModel {
  protected static _required = ["cardName", "cardNumber", "expDate", "cvv"];

  protected static _regex = {
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

### tsx 

tsx handles it as follows.

```javascript
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
            {...makeErrorProps(errorState, 'cardName')}
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
            {...makeErrorProps(errorState, 'cardNumber')}
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
            {...makeErrorProps(errorState, 'expDate')}
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
            {...makeErrorProps(errorState, 'cvv')}
          />
        </Grid>
...
```

Check out [Example](https://github.com/lahuman/typescript_react_mui_validation_example) for full code


## [Example](https://github.com/lahuman/typescript_react_mui_validation_example)

I make example by [Mui ckeckout template](https://github.com/mui/material-ui/tree/v5.8.0/docs/data/material/getting-started/templates/checkout)



## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2022 © <a href="https://lahuman.github.io" target="_blank">lahuman</a>.