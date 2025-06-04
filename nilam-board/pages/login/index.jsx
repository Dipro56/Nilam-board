import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { getUserProfile, login } from "@/redux/feature/auth/authSlice";
import notifications from "@/utils/notification-toast/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let authenticated = useSelector((state) => state.auth.authenticated);

  let router = useRouter();

  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can log or send username and password to your backend here
    //     console.log("Username:", username);
    // console.log("Password:", password);
    if (username && password) {
      let loginCredential = {
        username,
        password,
      };
      dispatch(login(loginCredential));
    } else {
      notifications.error("Provide credentials", "top-right");
    }
  };

  useEffect(() => {
    if (authenticated) {
      dispatch(getUserProfile());
      router.push("/");
    }
  }, [authenticated, dispatch, router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login to Your Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="yourusername"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-sm text-blue-500 hover:underline focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
