import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesDashboard from "./pages/NotesDashboard";
import SignUpForm from "./components/forms/SignUpForm";
import LogInForm from "./components/forms/LogInForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="p-10">
              <NavBar />
              <NotesDashboard />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <SignUpForm />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <LogInForm />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
