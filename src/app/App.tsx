import { HomePage } from "@/pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
