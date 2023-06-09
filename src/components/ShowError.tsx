import { type ErrorObject } from '../types/article';

function ShowError(errorObject: ErrorObject): JSX.Element {
  return (
    <>
      {Object.entries(errorObject).map(([key, value]) => (
        <li key={key}>{`${key} ${value}`}</li>
      ))}
    </>
  );
}

export default ShowError;
