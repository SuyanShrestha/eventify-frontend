import React, { useState } from "react";
import { LottieComponent, Tabs } from "../components/ui";
import { RegisterLottie } from "../assets/lottie";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { RoutingLinks } from "../constants";
import {
  Eye,
  EyeClosed,
  Lock,
  Mail,
  TriangleAlert,
  UserRound,
} from "../assets/icons";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userType, setUserType] = useState<string>("user");

  const userTypes = ["user", "organizer"];

  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
  const lottieHeight = isSmallScreen ? 450 : 600;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    console.log("Signup submitted", { username, email, password });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password === e.target.value);
  };

  return (
    <div className="bg-primary-500">
      <div className="mt-[4rem] p-12 max-w-7xl w-full mx-auto min-h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-2 md:gap-16 justify-between items-center">
        <div className="left-1/2 w-full space-y-8 bg-white p-6 rounded-lg shadow-md py-8">
          <div className="flex flex-col items-start">
            <h2 className="text-xl sm:text-3xl font-extrabold text-secondary-text-500">
              Create an account
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-secondary-text-500">
              Create. Connect. Celebrate.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none relative block w-full pl-12 pr-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-accent-500 focus:ring-0 text-sm md:text-base transition duration-200"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

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
                  onChange={handlePasswordChange}
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

              <div className="relative">
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`appearance-none relative block w-full pl-12 pr-4 py-2 border-b-2 ${
                    passwordsMatch ? "border-gray-300" : "border-red-500"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-accent-500 focus:ring-0 text-sm md:text-base transition duration-200`}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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
              {!passwordsMatch && (
                <p className="text-red-500 text-xs mt-1 flex gap-1">
                  <TriangleAlert className="h-4 w-4" /> Passwords do not match
                </p>
              )}

              {/* User Type Selection */}
              <Tabs
                options={userTypes}
                activeTab={userType}
                setActiveTab={setUserType}
              />
            </div>

            <div className="flex w-full justify-center gap-2">
              <span className="text-gray-500 text-xs sm:text-sm">
                Already have an account?
              </span>
              <Link
                to={RoutingLinks.Login}
                className="text-secondary-text-400 text-xs sm:text-sm hover:text-secondary-text-500 transition duration-200"
              >
                Sign in
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondary-500 bg-accent-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        <div className="right-1/2 w-full">
          <LottieComponent
            animationData={RegisterLottie}
            height={lottieHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
