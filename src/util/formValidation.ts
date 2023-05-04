import isEmpty from './isEmpty';

type FormFields = Record<string, string>;

type FormErrors = Record<string, string>;

interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

const areAllFieldsFilled = (formObj: FormFields): ValidationResult => {
  let newError: FormErrors = {};
  for (const [key, value] of Object.entries(formObj)) {
    if (isEmpty(value)) {
      newError = { ...newError, [key]: "can't be blank" };
      break;
    }
  }
  return {
    isValid: Object.keys(newError).length === 0,
    errors: newError,
  };
};

export default areAllFieldsFilled;
