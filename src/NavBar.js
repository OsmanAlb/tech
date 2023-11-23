import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1><span>Навигатор</span>Чистоты</h1>
      <div className="links">        
        <Link to="/create" style={{
          fontFamily: "Roboto", 
          color: 'white', 
          backgroundColor: '#67CE67',
          borderRadius: '5px' 
        }}>ИО</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;