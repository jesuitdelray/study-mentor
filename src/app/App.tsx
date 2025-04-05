import { InterviewSenseiPage } from "@/pages/InterviewSenseiPage/ui/InterviewSenseiPage";
import { StudyMentorPage } from "@/pages/StudyMentorPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudyMentorPage />} />
        <Route path="/interview-sensei" element={<InterviewSenseiPage />} />
      </Routes>
    </Router>
  );
}
