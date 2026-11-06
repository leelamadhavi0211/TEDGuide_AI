// import "./navbar.css";
// import { FaUserCircle } from "react-icons/fa";

// function Navbar() {
//   return (
//     <nav className="navbar">

//       <div className="logo">
//         <span className="ted">TED</span>GuideAI
//       </div>

//      <ul className="nav-menu">
//   <li className="active">Home</li>
//   <li>Recommendations</li>
//   <li>Learning Journey</li>
//   <li>Watch History</li>
//   <li>Profile</li>
// </ul>

//       <div className="user-info">
//         <FaUserCircle className="user-icon"/>

//         <span>Hi, Leela</span>

//         <button className="logout-btn">
//           Logout
//         </button>
//       </div>

//     </nav>
//   );
// }

// export default Navbar;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    if (storedName) setName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">

      <h2 onClick={() => navigate("/")}>TEDGuideAI</h2>

      <div className="nav-right">

        {name ? <span>Hi {name} 👋</span> : null}

        <button onClick={() => navigate("/recommendations")}>
          Recommendations
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;