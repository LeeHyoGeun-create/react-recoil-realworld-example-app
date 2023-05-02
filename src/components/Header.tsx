import { Link, NavLink } from 'react-router-dom';

function Header(): JSX.Element {
  interface ClassNameProps {
    isActive: boolean;
    isPending: boolean;
  }

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
        </ul>
      </div>
    </nav>
  );
}

export default Header;
