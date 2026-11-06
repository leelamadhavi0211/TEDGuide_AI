
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [edit, setEdit] = useState(false);
//   const [goal, setGoal] = useState("");
//   const [interests, setInterests] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userId = localStorage.getItem("user_id");

//         const res = await axios.get(
//           `http://127.0.0.1:5000/api/profile/${userId}`
//         );

//         setUser(res.data);
//         setGoal(res.data.goal || "");
//         setInterests(res.data.interests || []);

//       } catch (error) {
//         console.error("Profile fetch error:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   // const handleSave = async () => {
//   //   try {
//   //     const userId = localStorage.getItem("user_id");

//   //     const updatedInterests = interests
//   //       .split(",")
//   //       .map(item => item.trim())
//   //       .filter(item => item !== "");

//   //     const res = await axios.put(
//   //       `http://127.0.0.1:5000/api/profile/update/${userId}`,
//   //       {
//   //         goal,
//   //         interests: updatedInterests
//   //       }
//   //     );

//   //     setUser({
//   //       ...user,
//   //       goal,
//   //       interests: updatedInterests
//   //     });

//   //     setInterests(updatedInterests);

//   //     setEdit(false);

//   //     alert("Profile updated successfully!");

//   //   } catch (error) {
//   //     console.error("Profile update error:", error);
//   //     alert(error.response?.data?.message || "Failed to update profile");
//   //   }
//   // };
  
// const handleSave = async () => {
//   try {
//     const userId = localStorage.getItem("user_id");

//     const updatedInterests = interests
//       .map(item => item.trim())
//       .filter(item => item !== "");

//     await axios.put(
//       `http://127.0.0.1:5000/api/profile/update/${userId}`,
//       {
//         goal,
//         interests: updatedInterests
//       }
//     );

//     setUser({
//       ...user,
//       goal,
//       interests: updatedInterests
//     });

//     setInterests(updatedInterests);
//     setEdit(false);

//     alert("Profile updated successfully!");

//   } catch (error) {
//     console.error("Profile update error:", error);
//     alert(error.response?.data?.message || "Failed to update profile");
//   }
// };


//   if (!user) return <div className="loading">Loading...</div>;

//   return (
//     <div className="dashboard-container">

//       <div className="sidebar">
//         <h2>🎯 TEDGuideAI</h2>

//         <button onClick={() => navigate("/dashboard")}>Profile</button>
//         <button onClick={() => navigate("/recommendations")}>
//           Recommendations
//         </button>
//       </div>

//       <div className="main">

//         <h1>Welcome {user.name} 👋</h1>

//         <div className="grid">

//           <div className="card">
//             <h3>Email</h3>
//             <p>{user.email}</p>
//           </div>

//           <div className="card">
//             <h3>Goal</h3>
//             {edit ? (
//               <input
//                 value={goal}
//                 onChange={(e) => setGoal(e.target.value)}
//               />
//             ) : (
//               <p>{goal}</p>
//             )}
//           </div>

//           <div className="card">
//             <h3>Interests</h3>
//             {edit ? (
//               <input
//                 value={interests.join(", ")}
//                 onChange={(e) =>
//                   setInterests(
//                     e.target.value.split(",").map(item => item.trim())
//                   )
//                 }
//               />
//             ) : (
//               <p>{interests.join(", ")}</p>
//             )}
//           </div>

//         </div>

//         <div className="actions">
//           {!edit ? (
//             <button onClick={() => setEdit(true)}>
//               Edit Profile
//             </button>
//           ) : (
//             <button onClick={handleSave}>
//               Save
//             </button>
//           )}

//           <button onClick={() => navigate("/recommendations")}>
//             Get Recommendations
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [goal, setGoal] = useState("");
  const [interests, setInterests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        const res = await axios.get(
          `http://127.0.0.1:5000/api/profile/${userId}`
        );

        setUser(res.data);
        setGoal(res.data.goal || "");
        setInterests(res.data.interests || []);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      const updatedInterests = interests
        .map(item => item.trim())
        .filter(item => item !== "");

      await axios.put(
        `http://127.0.0.1:5000/api/profile/update/${userId}`,
        { goal, interests: updatedInterests }
      );

      setUser({ ...user, goal, interests: updatedInterests });
      setInterests(updatedInterests);
      setEdit(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  if (!user) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <span>🎯</span>
          <h2>TEDGuideAI</h2>
        </div>

        <p className="menu-label">MENU</p>

        <button className="nav-item active" onClick={() => navigate("/dashboard")}>
          <span>▣</span> Dashboard
        </button>

        <button className="nav-item" onClick={() => navigate("/recommendations")}>
          <span>▶</span> Recommendations
        </button>

        <button className="nav-item" onClick={() => navigate("/journey")}>
          <span>✦</span> Learning Journey
        </button>

        <div className="sidebar-bottom">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span>↪</span> Logout
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* WELCOME HEADER */}
        <div className="dashboard-header">
          <div>
            <p className="welcome-label">YOUR PERSONAL LEARNING SPACE</p>
            <h1>Welcome back, {user.name} 👋</h1>
            <p className="header-subtitle">
              Continue exploring ideas and growing your knowledge.
            </p>
          </div>

          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* PROFILE SECTION */}
        <section className="profile-section">

          <div className="section-heading">
            <div>
              <h2>Your Profile</h2>
              <p>Your learning preferences at a glance.</p>
            </div>

            {!edit ? (
              <button className="edit-btn" onClick={() => setEdit(true)}>
                ✎ Edit Profile
              </button>
            ) : (
              <button className="edit-btn" onClick={handleSave}>
                ✓ Save Changes
              </button>
            )}
          </div>

          <div className="grid">

            <div className="card">
              <div className="card-icon email-icon">✉</div>
              <h3>Email Address</h3>
              <p>{user.email}</p>
            </div>

            <div className="card">
              <div className="card-icon goal-icon">◎</div>
              <h3>Learning Goal</h3>

              {edit ? (
                <input
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                />
              ) : (
                <p>{goal || "Not selected"}</p>
              )}
            </div>

            <div className="card">
              <div className="card-icon interest-icon">✧</div>
              <h3>Your Interests</h3>

              {edit ? (
                <input
                  value={interests.join(", ")}
                  onChange={e =>
                    setInterests(
                      e.target.value.split(",").map(item => item.trim())
                    )
                  }
                />
              ) : (
                <p>{interests.join(", ") || "Not selected"}</p>
              )}
            </div>

          </div>
        </section>

        {/* LEARNING SECTION */}
        <section className="learning-section">

          <div className="section-heading">
            <div>
              <h2>Continue Your Learning</h2>
              <p>Choose where you want to continue.</p>
            </div>
          </div>

          <div className="learning-grid">

            <div
              className="learning-card recommendations-card"
              onClick={() => navigate("/recommendations")}
            >
              <div className="learning-icon">▶</div>

              <div>
                <h3>TED Recommendations</h3>
                <p>
                  Discover TED Talks selected according to your interests
                  and learning goals.
                </p>
                <span className="card-link">Explore Talks →</span>
              </div>
            </div>

            <div
              className="learning-card journey-card"
              onClick={() => navigate("/journey")}
            >
              <div className="learning-icon">✦</div>

              <div>
                <h3>Learning Journey</h3>
                <p>
                  Follow your personalized learning path through
                  different stages and topics.
                </p>
                <span className="card-link">View Journey →</span>
              </div>
            </div>

          </div>
        </section>

        <p className="dashboard-footer">
          Keep learning. Keep growing. ✨
        </p>

      </main>
    </div>
  );
}

export default Dashboard;
