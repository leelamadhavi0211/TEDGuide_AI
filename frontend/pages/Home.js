

// import React from "react";
// import Navbar from "../components/Navbar";
// import "./Home.css";

// function Home() {
//   return (
//     <div className="home">

//       <Navbar />

//       {/* HERO SECTION */}
//       <div className="hero">

//         <h1>
//           🎯 TEDGuideAI
//         </h1>

//         <p>
//           Discover TED Talks that match your interests and build a
//           personalized learning journey for self-growth, communication,
//           and career success.
//         </p>

//         <div className="hero-buttons">
//           <button className="primary">Get Started</button>
//           <button className="secondary">Explore Talks</button>
//         </div>

//       </div>

//       {/* FEATURES */}
//       <div className="features">

//         <div className="feature-card">
//           <h3>🧠 AI Recommendations</h3>
//           <p>Get TED Talks based on your interests using NLP.</p>
//         </div>

//         <div className="feature-card">
//           <h3>📚 Learning Path</h3>
//           <p>Follow structured learning journeys instead of random videos.</p>
//         </div>

//         <div className="feature-card">
//           <h3>🚀 Career Growth</h3>
//           <p>Improve communication, leadership, and innovation skills.</p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import  "../components/navbar.css";
import s1 from "./speakers/simon_sinek.png";
import s2 from "./speakers/brene.png";
import s3 from "./speakers/chimamanda.png";
import s4 from "./speakers/susan.png";
//import s5 from "./speakers/salman.png";

function Home() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  return (
    <div className="home">

      {/* NAVBAR */}
      <div className="navbar">

        <h2 className="logo">🎤 TEDGuideAI</h2>

        <div className="nav-right">

  {userId && (
    <>
      <button onClick={() => navigate("/recommendations")}>
        Recommendations
      </button>

      {/* NEW JOURNEY BUTTON */}
      <button onClick={() => navigate("/journey")}>
        Journey 
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )}

</div>
      </div>

      {/* HERO SECTION */}
      <div className="hero">

        <h1>Learn from the World's Best Speakers </h1>

        <p>
          Discover TED Talks personalized for your goals, interests,
          and learning journey powered by AI.
        </p>

        {!userId && (
          <button onClick={() => navigate("/login")}>
            Get Started
          </button>
        )}

      </div>
        {/* STATS SECTION */}
<div className="stats">

  <div className="stat-card">
    <h2>10K+</h2>
    <p>TED Talks Indexed</p>
  </div>

  <div className="stat-card">
    <h2>5K+</h2>
    <p>Active Learners</p>
  </div>

  <div className="stat-card">
    <h2>1K+</h2>
    <p>Learning Journeys Created</p>
  </div>

  <div className="stat-card">
    <h2>AI</h2>
    <p>Personalized Recommendations</p>
  </div>

</div>
      {/* SPEAKER PREVIEW SECTION */}
      <div className="speakers">

        <h2>🔥 Featured Speakers</h2>

        <div className="speaker-grid">

          <div className="speaker-card">
            <img src={s1} alt="Simon Sinek"/>
            <h4>Simon Sinek</h4>
            <p className="topic">Leadership & Motivation</p>
            <p className="desc">
              Teaches why great leaders inspire action by starting with “Why”.
              Focuses on purpose-driven leadership and building trust in teams.
            </p>
          </div>

          <div className="speaker-card">
            <img src={s2} alt="Brené Brown"/>
            <h4>Brené Brown</h4>
            <p className="topic">Vulnerability & Courage</p>
            <p className="desc">
              Explores how embracing vulnerability leads to stronger relationships,
              courage, and authentic human connection.
            </p>
          </div>

          <div className="speaker-card">
            <img src={s3} alt="Chimamanda Ngozi Adichie"/>
            <h4>Chimamanda Ngozi Adichie</h4>
            <p className="topic">Culture & Identity</p>
            <p className="desc">
              Explores the power of storytelling and how it shapes our understanding of culture and identity.
            </p>
          </div>

          <div className="speaker-card">
            <img src={s4} alt="Susan Cain"/>
            <h4>Susan Cain</h4>
            <p className="topic">Introversion & Quiet Power</p>
            <p className="desc">
              Advocates for the value of introversion and the importance of creating spaces for quiet reflection and deep work.
            </p>
          </div>

          {/* <div className="speaker-card">
            <img src={s5} alt="Salman"/>
            <h4>Salman</h4>
            <p className="topic">Grit & Success</p>
            <p className="desc">
             Revolutionized education with Khan Academy by enabling free, self-paced learning for millions of students worldwide.
            </p>
          </div> */}
          {/* FEEDBACK / CONTACT SECTION */}

        </div>

      </div>
            <div className="contact-section">

  <h2>💬 Feedback / Contact Us</h2>

  <form className="contact-form" onSubmit={(e) => {
    e.preventDefault();
    alert("Thanks for your feedback!");
  }}>

    <input
      type="text"
      placeholder="Your Name"
      required
    />

    <input
      type="email"
      placeholder="Your Email"
      required
    />

    <textarea
      placeholder="Your Message..."
      rows="4"
      required
    />

    <button type="submit">
      Send Feedback 
    </button>

  </form>

</div>
    </div>
  );
}

export default Home;