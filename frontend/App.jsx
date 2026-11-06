// import {
//  BrowserRouter,
//  Routes,
//  Route
// }
// from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Recommendations from "./pages/Recommendations";
// import ProfileSetup from "./pages/ProfileSetup";
// import JourneyPage from "./pages/JourneyPage";

// function App() {

//  return (

//   <BrowserRouter>

//    <Routes>
//     <Route
//   path="/dashboard"
//   element={<Dashboard />}
// />
//     <Route
//       path="/"
//       element={<Home />}
//     />

//     <Route
//       path="/login"
//       element={<Login />}
//     />

//     <Route
//       path="/register"
//       element={<Register />}
//     />
// <Route path="/setup" element={<ProfileSetup />} />
//  <Route path="/journey" element={<JourneyPage />} />
//     <Route
//   path="/recommendations"
//   element={<Recommendations />}

// />
//    </Routes>
//   </BrowserRouter>
//  );
// }

// export default App;
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendations from "./pages/Recommendations";
import ProfileSetup from "./pages/ProfileSetup";
import JourneyPage from "./pages/JourneyPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;