import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ShowError from '../../components/ShowError';
import useInputs from '../../hooks/useInputs';
import { isLoginSelector, userInfoAtom } from '../../recoil/recoil_state';
import isEmpty from '../../util/isEmpty';

const { VITE_API_URL } = import.meta.env;

function SignInPage(): JSX.Element {
  const {
    form: { email, password },
    onChange,
  } = useInputs({
    email: '',
    password: '',
  });
  const [displayError, setDisplayError] = useState({});
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const isLogin = useRecoilValue(isLoginSelector);

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
    }

    setDisplayError(newError);
    return Object.keys(newError).length === 0;
  };

  const submit = async (): Promise<void> => {
    try {
      const data = { user: { email, password } };
      const response = await fetch(`${VITE_API_URL}/users/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        if (response.status === 403) {
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
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
