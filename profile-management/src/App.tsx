import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfileForm from "./pages/ProfileForm";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/profile-form" />} />
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
