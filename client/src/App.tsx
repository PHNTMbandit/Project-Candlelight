import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/forms/SignUpForm";
import LogInForm from "./components/forms/LogInForm";
import NavBar from "./components/NavBar";
import { useUserContext } from "./contexts/UserContextProvider";
import NotesDashboard from "./pages/NotesDashboard";

function App() {
  const { user, setUser } = useUserContext();

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
              <p>{user?.username}</p>
              <LogInForm
                onLoggedIn={(user) => {
                  setUser(user);
                }}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
