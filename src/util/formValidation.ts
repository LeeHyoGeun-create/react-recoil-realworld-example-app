import isEmpty from './isEmpty';

const areAllFieldsFilled = (
  formObj: Record<string, string>,
): [boolean, Record<string, string>] => {
  let newError = {};
  for (const [key, value] of Object.entries(formObj)) {
    if (isEmpty(value)) {
      newError = { ...newError, [key]: "can't be blank" };
      break;
    }
  }
  return [Object.keys(newError).length === 0, newError];
};

export default areAllFieldsFilled;
