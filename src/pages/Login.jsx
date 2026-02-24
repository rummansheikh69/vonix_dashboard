import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) login(formData);
  };

  return (
    <div className=" w-full  h-screen max-h-screen bg-[url('/bg.webp')]  bg-center bg-cover bg-no-repeat">
      <div className=" w-full h-full flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className=" w-80 h-96 bg-[#121212] rounded-lg  border border-[#1a1a1a] px-10 flex flex-col justify-center  shadow-xl">
            <h1 className=" text-2xl font-semibold text-white tracking-wider">
              Login
            </h1>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className=" text-sm font-light w-full h-9 mt-4 bg-[#080808] border border-[#1a1a1a] rounded-md px-4 text-white outline-none"
            />
            <div className=" w-full mt-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                className=" text-sm font-light w-full h-9  bg-[#080808] border border-[#1a1a1a] rounded-md px-4 text-white outline-none"
              />
              {!showPassword ? (
                <div
                  onClick={() => setShowPassword(true)}
                  className=" absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                >
                  <LuEyeClosed size={16} />
                </div>
              ) : (
                <div
                  onClick={() => setShowPassword(false)}
                  className=" absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                >
                  <LuEye size={16} />
                </div>
              )}
            </div>
            <button
              disabled={isLoggingIn}
              type="submit"
              className=" w-full h-9 mt-6 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
