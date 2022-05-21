import BaseModel from "./BaseModel";

const requiredDefaultMsg = "is required!";
const sameDefaultMsg = "You must enter the same value.";
const regexDefaultMsg = (regex: RegExp) =>
  `You must enter the ${regex.toString()} rule.`;

const getNumAndMessage = (
  clazz: BaseModel,
  key: string,
  type: string
): { num: number; errMsg: string } => {
  let num = 0;
  let errMsg = "";

  if (typeof clazz[type][key] === "number") {
    num = clazz[type][key];
    errMsg = `The ${type}imum is ${num}!`;
  } else {
    num = clazz[type][key].num;
    errMsg = clazz[type][key].msg;
  }

  return { num, errMsg };
};

const minOrMaxProcess = (
  isMin: boolean,
  clazz: BaseModel,
  data: BaseModel,
  key: string
) => {
  const type = isMin ? "min" : "max";
  const { num, errMsg } = getNumAndMessage(clazz, key, type);
  let valid = makeInitValid(key);
  let isValid = true;
  let checking = isMin
    ? parseInt(data[key], 10) < num
    : parseInt(data[key], 10) > num;
  if (!isNaN(parseInt(data[key], 10)) && checking) {
    valid = {
      [key]: {
        error: true,
        errMsg,
      },
    };
    isValid = false;
  }
  return { valid, isValid };
};

export class ErrorState {
  [index: string]: { error: boolean; errMsg: string };
}

export const initErrorState = {} as ErrorState;

export const makeErrorProps = (state: ErrorState, key: string) => ({
  error: state[key]?.error,
  helperText: state[key]?.error ? state[key].errMsg : "",
});

const makeInitValid = (key: string) => ({
  [key]: { error: false, errMsg: "" },
});
const noError = (stat: ErrorState, key: string) =>
  !stat[key] || !stat[key].error;

export const validation = (
  clazz: BaseModel,
  data: BaseModel
): { newErrorState: ErrorState; isValid: boolean } => {
  let newErrorState = {} as ErrorState;
  let isValid = true;

  if (clazz.required instanceof Array) {
    for (const key of clazz.required) {
      let valid = makeInitValid(key);
      if (data[key].trim() === "") {
        valid = { [key]: { error: true, errMsg: requiredDefaultMsg } };
        isValid = false;
      }
      newErrorState = { ...newErrorState, ...valid };
    }
  } else {
    for (const key of Object.keys(clazz.required)) {
      let valid = makeInitValid(key);
      if (data[key].trim() === "") {
        valid = { [key]: { error: true, errMsg: clazz.required[key] } };
        isValid = false;
      }
      newErrorState = { ...newErrorState, ...valid };
    }
  }

  for (const key of Object.keys(clazz.min)) {
    if (noError(newErrorState, key)) {
      const { valid, isValid: noError } = minOrMaxProcess(
        true,
        clazz,
        data,
        key
      );
      newErrorState = { ...newErrorState, ...valid };
      if (!noError) isValid = noError;
    }
  }

  for (const key of Object.keys(clazz.max)) {
    if (noError(newErrorState, key)) {
      const { valid, isValid: noError } = minOrMaxProcess(
        false,
        clazz,
        data,
        key
      );
      newErrorState = { ...newErrorState, ...valid };
      if (!noError) isValid = noError;
    }
  }
  for (const key of Object.keys(clazz.same)) {
    if (noError(newErrorState, key)) {
      let valid = makeInitValid(key);
      let errMsg = sameDefaultMsg;
      let cKeys = [];
      let notArray = true;

      if (clazz.same[key] instanceof Array) {
        cKeys = clazz.same[key];
        notArray = false;
      } else {
        cKeys = Object.keys(clazz.same[key]);
        notArray = true;
      }

      for (const cKey of cKeys) {
        valid = { ...valid, ...makeInitValid(cKey) };
        if (data[key] !== data[cKey]) {
          valid = {
            ...valid,
            [key]: {
              error: true,
              errMsg: notArray ? clazz.same[key][cKey] : errMsg,
            },
            [cKey]: {
              error: true,
              errMsg: notArray ? clazz.same[key][cKey] : errMsg,
            },
          };
          isValid = false;
        }
      }

      newErrorState = { ...newErrorState, ...valid };
    }
  }

  for (const key of Object.keys(clazz.regex)) {
    if (noError(newErrorState, key)) {
      let valid = makeInitValid(key);
      if (data[key].trim() !== "") {
        let regex;
        let errMsg = "";
        if (clazz.regex[key] instanceof RegExp) {
          regex = clazz.regex[key];
          errMsg = regexDefaultMsg(regex);
        } else {
          regex = clazz.regex[key].regex;
          errMsg = clazz.regex[key].msg;
        }

        if (!regex.test(data[key])) {
          valid = { [key]: { error: true, errMsg } };
          isValid = false;
        }
      }
      newErrorState = { ...newErrorState, ...valid };
    }
  }

  return { newErrorState, isValid };
};
