import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useInputs from '../../hooks/useInputs';
import isEmpty from '../../util/isEmpty';
import { userInfoAtom, isLoginSelector } from '../../recoil/recoil_state';
import ShowError from '../../components/ShowError';

function SignUpPage(): JSX.Element {
  const [{ username, email, password }, onChange] = useInputs({
    username: '',
    email: '',
    password: '',
  });
  const [displayError, setDisplayError] = useState({});
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const isLogin = useRecoilValue(isLoginSelector);

  const { VITE_API_URL } = import.meta.env;

  useEffect(() => {
    if (isLogin) {
      navigate(-1);
    }
  }, []);

  const validateForm = (): boolean => {
    let newError = {};

    if (isEmpty(email)) {
      newError = { ...newError, ...{ email: "can't be blank" } };
    } else if (isEmpty(password)) {
      newError = { ...newError, ...{ password: "can't be blank" } };
    } else if (isEmpty(username)) {
      newError = { ...newError, ...{ username: "can't be blank" } };
    }

    setDisplayError(newError);
    return Object.keys(newError).length === 0;
  };

  const submit = async (): Promise<void> => {
    try {
      const data = { user: { username, email, password } };
      const response = await fetch(`${VITE_API_URL}/users`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        if (response.status === 422) {
          setDisplayError(responseData.errors);
        }
        throw new Error(`서버에 이상이 있습니다 status: ${response.status}`);
      }

      setUserInfo(responseData);
      navigate('/');
    } catch (responseError) {
      if (responseError instanceof Error) {
        throw new Error(responseError.message);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      (async () => {
        await submit();
      })().catch((submitError) => {
        console.error(submitError);
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ul className="error-messages">
              {!(Object.keys(displayError).length === 0) && (
                <>{ShowError(displayError)}</>
              )}
            </ul>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
