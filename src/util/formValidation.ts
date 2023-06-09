import isEmpty from './isEmpty';

interface ValidateFormFields {
  title: string;
  description: string;
  body: string;
}

type FormErrors = Record<string, string>;

interface ValidationResult {
  isFilled: boolean;
  errors: FormErrors;
}

const areAllFieldsFilled = (formObj: ValidateFormFields): ValidationResult => {
  let newError: FormErrors = {};
  for (const [key, value] of Object.entries(formObj)) {
    if (key !== 'tagList') {
      if (isEmpty(value)) {
        newError = { ...newError, [key]: "can't be blank" };
        break;
      }
    }
  }
  return {
    isFilled: Object.keys(newError).length === 0,
    errors: newError,
  };
};

export default areAllFieldsFilled;
