import { Link, NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginSelector, userInfoAtom } from '../recoil/recoil_state';

function Header(): JSX.Element {
  interface ClassNameProps {
    isActive: boolean;
    isPending: boolean;
  }

  const isLogin = useRecoilValue(isLoginSelector);
  const userInfo = useRecoilValue(userInfoAtom);

  console.log(userInfo);
  console.log(isLogin);

  const getClassName = ({ isActive, isPending }: ClassNameProps): string => {
    let className = 'nav-link';

    if (isActive) {
      className += ' active';
    } else if (isPending) {
      className += ' pending';
    }

    return className;
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className={getClassName} to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={getClassName} to="/editor">
              <i className="ion-compose" />
              &nbsp;New Article{' '}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={getClassName} to="/settings">
              <i className="ion-gear-a" />
              &nbsp;Settings{' '}
            </NavLink>
          </li>
          {isLogin ? (
            <li className="nav-item">
              <NavLink
                className={getClassName}
                to={`/profile/${
                  userInfo.user.username !== null ? userInfo.user.username : ''
                }`}
              >
                <img
                  alt="profile"
                  className="user-pic"
                  src={userInfo.user.image !== null ? userInfo.user.image : ''}
                />
                {userInfo.user.username !== null ? userInfo.user.username : ''}
              </NavLink>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className={getClassName} to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getClassName} to="/register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
