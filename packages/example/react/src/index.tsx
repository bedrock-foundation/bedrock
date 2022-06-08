import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import TransferExample from "./pages/TransferExample";
import AuthorizationExample from "./pages/AuthorizationExample";
// import your route components too

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/transfer" element={<TransferExample />} />
      <Route path="/authorization" element={<AuthorizationExample />} />
    </Routes>
  </BrowserRouter>
);
