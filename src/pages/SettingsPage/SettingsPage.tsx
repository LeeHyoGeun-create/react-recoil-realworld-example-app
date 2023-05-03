import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useInputs from '../../hooks/useInputs';
import { userInfoAtom } from '../../recoil/recoil_state';

function SettingsPage(): JSX.Element {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [form, onChange] = useInputs({
    image: userInfo.user.image,
    username: userInfo.user.username,
    bio: userInfo.user.bio,
    email: userInfo.user.email,
    password: '',
  });
  const { image, username, bio, email, password } = form;
  const navigate = useNavigate();

  const { VITE_API_URL } = import.meta.env;

  interface UserResponse {
    user: {
      email: string;
      token: string;
      username: string;
      bio: string;
      image: string;
    };
  }

  const edit = async (): Promise<void> => {
    try {
      const data = { user: form };
      const response = await fetch(`${VITE_API_URL}/user`, {
        method: 'put',
        headers: {
          authorization: `Bearer ${userInfo.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData: UserResponse = await response.json();
      if (!response.ok) {
        throw new Error(`서버에 이상이 있습니다 status: ${response.status}`);
      }

      setUserInfo(responseData);
      navigate(`/profile/${responseData.user.username}`);
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
    (async () => {
      await edit();
    })().catch((submitError) => {
      console.error(submitError);
    });
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name="image"
                    value={image}
                    onChange={onChange}
                  />
                </fieldset>
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
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    name="bio"
                    value={bio}
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
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button type="button" className="btn btn-outline-danger">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
