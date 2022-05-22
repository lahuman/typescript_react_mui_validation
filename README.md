# React Mui Validation

Typescript + React + Mui + Validation 

It is designed to take advantage of Mui's errors and helperText.

## Installation 
```sh
$ npm install react-mui-validation --save
# or
$ yarn add react-mui-validation
```

## Functions 

- required
- min
- max
- same 
- regex 

## Usage

![](https://github.com/lahuman/typescript_react_mui_validation_example/blob/main/react-mui-diagram.svg)


### ViewModel

You need to create a model, and the model must inherit from BaseModel.

Below is an example of PaymemtModel.

```javascript
import {BaseModel, RegexAndMsg } from "react-mui-validation";

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

### Tsx 

tsx handles it as follows.

```javascript
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DataProps } from '../App';
import { PaymentModel } from './PaymentModel';
import { makeErrorProps } from 'react-mui-validation';

export default function PaymentForm(props: DataProps<PaymentModel>) {
  const {data, setData, errorState} = props;
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number' && parseInt(value) < 0) {
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

### Input validation call 

Here is some code that calls validation, among other things.

```javascript

  const handleNext = () => {
    let result = {
      newErrorState: {},
      isValid: false
    }
    if(activeStep === 0){
      result = validation(addressData);
    }else if(activeStep === 1){
      result = validation(paymentData);
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


## [Example](https://github.com/lahuman/typescript_react_mui_validation_example)

I make example by [Mui ckeckout template](https://github.com/mui/material-ui/tree/v5.8.0/docs/data/material/getting-started/templates/checkout)



## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2022 © <a href="https://lahuman.github.io" target="_blank">lahuman</a>.