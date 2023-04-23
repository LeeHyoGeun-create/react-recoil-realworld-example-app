import { useState } from 'react';
import { Form, Link, useSubmit } from 'react-router-dom';
import useInputs from '../../hooks/useInputs';

function SignInPage(): JSX.Element {
  const [{ email, password }, onChange] = useInputs({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const submit = useSubmit();

  const isEmpty = (str: string): boolean => str.length === 0;

  const validateForm = (): boolean => {
    let newError = '';

    if (isEmpty(email)) {
      newError = "email can't be blank";
    } else if (isEmpty(password)) {
      newError = "password can't be blank";
    }

    setError(newError);
    return newError.length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      submit(e.currentTarget);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ul className="error-messages">
              {!(error.length === 0) && <li>{error}</li>}
            </ul>

            <Form method="post" onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign up
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
