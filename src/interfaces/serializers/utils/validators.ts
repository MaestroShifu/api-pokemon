export const validEmail = (field: string): string => {
  return genericValidator({
    field,
    regex: '^[^@]+@[^@]+\\.[a-zA-Z]{2,}$',
    message: 'Invalid email'
  });
};

export const validOnlyLetters = (field: string, fieldName: string): string => {
  return genericValidator({
    field,
    regex: '^[A-Za-z ]+$',
    message: `The ${fieldName} can only contain letters and don't use accents`
  });
};

export const validPassword = (field: string): string => {
  return genericValidator({
    field,
    regex: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#?\\]]).{10,}$',
    message: `Invalid password, it must have an uppercase letter, it must have a lowercase letter and any of these characters !, @, #, ? or ]`
  });
};
interface GenericValidator {
  field: string;
  regex: RegExp | string;
  message: string;
}

export const genericValidator = (args: GenericValidator): string => {
  const regexp = new RegExp(args.regex);
  const isValid = regexp.test(args.field);
  if (!isValid) {
    throw {
      statusCode: 400,
      message: args.message
    };
  }
  return args.field;
};
