
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Recommendations.css";

function Recommendations() {
  const [talks, setTalks] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        const res = await axios.get(
          `http://127.0.0.1:5000/api/recommend/user/${userId}`
        );

        setTalks(res.data.recommendations);
      } catch (error) {
        console.error("Recommendation fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rec-container">

      <div className="rec-navbar">
        <button onClick={() => navigate("/dashboard")}>
           Dashboard
        </button>

        <button onClick={() => navigate("/setup")}>
          Edit Profile
        </button>

        <button onClick={() => navigate("/journey")}>
          Journey
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1>🎯 Your TED Picks</h1>

      <div className="rec-grid">
        {talks.map((t, i) => (
          <div className="rec-card" key={i}>
            <h3>{t.title}</h3>
            <p>{t.speaker}</p>
            <p className="desc">{t.description?.slice(0, 100)}</p>

            <a
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="watch-btn"
            >
              ▶ Watch Now
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Recommendations;
