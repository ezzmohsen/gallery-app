import "./navbar.scss";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src="art.svg" alt="" />
        <span>Art Gallary</span>
      </div>
      <div className="icons">
        <img src="./search.svg" alt="" classNme="icon"/>
        <img src="/app.svg" alt="" classNme="icon"/>
        <img src="/expand.svg" alt="" classNme="icon"/>
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
        <img src="/settings.svg" alt="" classNme="icon"/>
      </div>
    </div>
  );
};

export default Navbar;
