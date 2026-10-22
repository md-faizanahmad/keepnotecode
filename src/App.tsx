import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./components/home/home";
import { AppointmentsHomePage } from "./components/appointmentspage/appointmentspage";
import { NotFound } from "./components/errors/notfound";
import { UserInvalid } from "./components/errors/errors";
import { LogIn } from "./components/log-in/logIn";
import { Register } from "./components/register/register";
import { BasicInfo } from "./components/register/basicInfo/basicInfo";
import { TodoPage } from "./components/todopage/todopage";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
      if (user) {
        navigate("/home"); // Redirect if the user is authenticated
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<TodoPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<UserInvalid />} />
        {/* <Route path="/basicInfo" element={<BasicInfo />} /> */}
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </div>
  );
}

export default App;
