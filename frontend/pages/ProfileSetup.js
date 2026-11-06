import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfileSetup.css";

function ProfileSetup() {
  const navigate = useNavigate();

  const [goal, setGoal] = useState("");
  const [interests, setInterests] = useState([]);

  const goalOptions = [
    "Communication Skills",
    "Leadership",
    "Entrepreneurship",
    "AI & Technology",
    "Career Growth"
  ];


  const interestOptions = [
    "AI",
    "Startups",
    "Public Speaking",
    "Innovation",
    "Productivity",
    "Motivation"
  ];

  const handleInterestChange = (value) => {
    if (interests.includes(value)) {
      setInterests(interests.filter(i => i !== value));
    } else {
      setInterests([...interests, value]);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const userId = localStorage.getItem("user_id");

  //     await axios.put(
  //       `http://127.0.0.1:5000/api/profile/update/${userId}`,
  //       {
  //         goal,
  //         interests
  //       }
  //     );

  //     alert("Profile Updated Successfully 🚀");
  //     navigate("/dashboard");

  //   } catch (err) {
  //     alert("Failed to update profile");
  //   }
  // };
  const handleSubmit = async () => {
     console.log("HANDLE SUBMIT CALLED!");
  try {
    const userId = localStorage.getItem("user_id");

    console.log("User ID:", userId);
    console.log("Selected interests:", interests);
    console.log("Selected goal:", goal);

    const res = await axios.put(
      `http://127.0.0.1:5000/api/profile/update/${userId}`,
      {
        goal,
        interests
      }
    );

    console.log("Backend response:", res.data);

    alert("Profile Updated Successfully");
    navigate("/dashboard");

  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
    console.log("Status:", err.response?.status);

    alert(err.response?.data?.message || "Failed to update profile");
  }
};

  return (
    <div className="setup-container">

      <div className="setup-card">

        <h1>Setup Your Profile 🎯</h1>

        {/* GOAL */}
        <label>Learning Goal</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="">Choose Goal</option>
          {goalOptions.map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>

        {/* INTERESTS */}
        <label>Interests</label>

        <div className="checkbox-group">

          {interestOptions.map((item, i) => (
            <label key={i} className="checkbox-item">

              <input
                type="checkbox"
                checked={interests.includes(item)}   // ✅ FIX
                onChange={() => handleInterestChange(item)}
              />

              {item}

            </label>
          ))}

        </div>

        <button onClick={handleSubmit}>
          Save & Continue
        </button>

      </div>

    </div>
  );
}

export default ProfileSetup;