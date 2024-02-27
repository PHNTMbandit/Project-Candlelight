import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesDashboard from "./pages/NotesDashboard";

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
      </Routes>
    </Router>
  );
}

export default App;
