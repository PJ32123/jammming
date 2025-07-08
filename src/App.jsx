import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton/LoginButton";
import Callback from "./pages/Callback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
