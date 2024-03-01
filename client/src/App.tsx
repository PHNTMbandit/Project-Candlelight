import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/forms/SignUpForm";
import LogInForm from "./components/forms/LogInForm";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import * as UserApi from "./api/users-api";
import { useLoggedInUserContext } from "./contexts/LoggedInUserContextProvider";
import NotesDashboard from "./pages/NotesDashboard";

function App() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUserContext();

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UserApi.getLoggedInUser();
        console.log(user);
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, [setLoggedInUser]);

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="p-10">
              <NavBar user={loggedInUser} />
              {/* <NotesDashboard /> */}
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
              <p>{loggedInUser?.username}</p>
              <LogInForm
                onLoggedIn={(user) => {
                  setLoggedInUser(user);
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
