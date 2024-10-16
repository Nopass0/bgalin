import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AdminPanel from "./pages/AdminPanel";
import LoginAdmin from "./pages/LoginAdmin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
