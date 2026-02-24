import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import Categories from "./pages/Categories";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className=" flex items-center justify-center h-screen bg-[#121212]">
        <Loader className=" animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className=" text-white">
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Navigate to="/login" /> : <Home />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/gallery"
          element={!authUser ? <Navigate to="/login" /> : <Gallery />}
        />
        <Route
          path="/categories"
          element={!authUser ? <Navigate to="/login" /> : <Categories />}
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
