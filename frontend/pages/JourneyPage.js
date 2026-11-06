
import { useEffect, useState } from "react";
import axios from "axios";
import "./JourneyPage.css";
import { useNavigate } from "react-router-dom";

function JourneyPage() {
  const [journey, setJourney] = useState([]);
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        const res = await axios.get(
          `http://127.0.0.1:5000/api/journey/user/${userId}`
        );

        setGoal(res.data.goal || "");

        let data = res.data.journey;

        if (!data) data = [];
        else if (!Array.isArray(data)) data = [data];

        setJourney(data);

        console.log("Journey data:", data);

      } catch (err) {
        console.log("Journey error:", err);
        setJourney([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJourney();
  }, []);

  const handleFeedback = async (talk, feedback) => {
    try {
      const userId = localStorage.getItem("user_id");

      await axios.post("http://127.0.0.1:5000/api/feedback", {
        user_id: userId,
        talk,
        feedback,
      });

      alert(`Marked as ${feedback}`);
    } catch (err) {
      console.log(err);
      alert("Failed to save feedback");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Generating your learning journey...
      </div>
    );
  }

  return (
    <div className="journey-container">

      {/* NAVIGATION */}
      <div className="journey-navbar">

        <button onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>

        <button onClick={() => navigate("/recommendations")}>
          Recommendations
        </button>

        <button onClick={() => navigate("/setup")}>
          Edit Profile
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

      {/* HEADER */}
      <h1>🎯 Your Learning Journey</h1>

      <p className="goal">
        Goal: <span>{goal}</span>
      </p>

      {/* TIMELINE */}
      <div className="timeline">

        {journey.length === 0 ? (
          <p>No journey available</p>
        ) : (
          journey.map((step, index) => (
            <div className="step-card" key={index}>

              <div className="step-number">
                {step.stage_number || index + 1}
              </div>

              <div className="step-content">

                <h3>
                  {step.stage_name || `Stage ${index + 1}`}
                </h3>

                {(step.talks || []).map((talk, i) => (
                  <div className="talk-card" key={i}>

                    <div className="talk-info">

                      <p className="talk-title">
                        {talk.title || "TED Talk"}
                      </p>

                      <p className="talk-speaker">
                        🎤 {talk.speaker || "Unknown"}
                      </p>

                      {talk.url && (
                        <a
                          href={talk.url}
                          target="_blank"
                          rel="noreferrer"
                          className="watch-btn"
                        >
                          ▶ Watch Video
                        </a>
                      )}

                    </div>

                    <div className="feedback-row">

                      <button
                        className="like-btn"
                        onClick={() => handleFeedback(talk, "like")}
                      >
                        👍
                      </button>

                      <button
                        className="dislike-btn"
                        onClick={() => handleFeedback(talk, "dislike")}
                      >
                        👎
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default JourneyPage;
