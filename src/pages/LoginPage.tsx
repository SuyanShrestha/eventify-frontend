import React, { useState } from "react";
import { LottieComponent } from "../components/ui";
import { LoginLottie } from "../assets/lottie";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { RoutingLinks } from "../constants";
import { Eye, EyeClosed, Lock, Mail } from "../assets/icons";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
  const lottieHeight = isSmallScreen ? 450 : 600;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
  };

  return (
    <div className=" bg-primary-500">
      <div className="mt-[4rem] p-12 max-w-7xl w-full mx-auto min-h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-2 md:gap-16 justify-between items-center">
        <div className="left-1/2 w-full">
          <LottieComponent animationData={LoginLottie} height={lottieHeight} />
        </div>
        <div className="right-1/2 w-full space-y-8 bg-white p-6 rounded-lg shadow-md py-8">
          <div className="flex flex-col items-start">
            <h2 className="text-xl sm:text-3xl font-extrabold text-secondary-text-500">
              Welcome Back!
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-secondary-text-500">
              Sign in to your account to continue
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className=" space-y-6">
              <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full pl-12 pr-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-accent-500 focus:ring-0 text-sm md:text-base transition duration-200"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full pl-12 pr-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-accent-500 focus:ring-0 text-sm md:text-base transition duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 cursor-pointer transition duration-200"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeClosed className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex w-full justify-center gap-2 ">
              <span className="text-gray-500 text-xs sm:text-sm">Don't have an account?</span>
              <Link
                to={RoutingLinks.Register}
                className="text-secondary-text-400  text-xs sm:text-sm hover:text-secondary-text-500 transition duration-200"
              >
                Sign up
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondary-500 bg-accent-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
