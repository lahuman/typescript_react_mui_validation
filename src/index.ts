export * from "./BaseModel";
export * from "./ValidSupport";
export const VALIDATE_TYPE = {
    REQUIRED: 'required',
    NUMBER: 'number',
    MIN: 'min',
    MAX: 'max',
    MINLENGTH: 'minLength',
    MAXLENGTH: 'maxLength',
    SAME: 'same',
    REGEX: 'regex',
    ITEM: 'item'
  } as const;