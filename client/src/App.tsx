import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesDashboard from "./pages/NotesDashboard";
import SignUpForm from "./components/forms/SignUpForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-10">
              <NotesDashboard />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="p-10">
              <SignUpForm />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
