import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import NotesDashboard from "./pages/NotesDashboard";
import { useUserContext } from "./contexts/UserContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActionBar from "./components/ActionBar";
import TaskDashboard from "./pages/TaskDashboard";

function App() {
  const { setUser } = useUserContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/notes"
          element={
            <>
              <NavBar />
              <div className="flex">
                <ActionBar />
                <NotesDashboard />
              </div>
            </>
          }
        />
        <Route
          path="/tasks"
          element={
            <>
              <NavBar />
              <div className="flex">
                <ActionBar />
                <TaskDashboard />
              </div>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <SignUpPage />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <LogInPage
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
