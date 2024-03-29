import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);

    console.log('apllolo',userName)
    try {
      const response = await axios.post("http://localhost:6001/login_check", {
        userName,
        password,
      });

      // Check the response for successful login or handle errors
      console.log(`Response message: ${response.data.message}`);

      if (response.data.message === "Login successful") {
        // Store username in localStorage
        localStorage.setItem('username', userName);
        navigate("/Home", { replace: true });
      } else {
        
        alert("Wrong password");
        
      }
    } catch (error) {
      alert("Wrong Credentials");
      // Handle error, e.g., display an error message to the user
      console.error("Login failed:", error.message);
    }

    setIsLoading(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="bg-[#0077b5] flex flex-col w-full h-screen justify-center items-center">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {/* Login Page starts here */}

      <div className="bg-white flex flex-col w-[100%] h-[50%] md:w-[40%] justify-between items-center rounded-lg">
        <div className="bg-blue-400 flex flex-row justify-around w-full items-center rounded-t-lg ">
          <div className=" w-full flex flex-row p-4 bg-yellow-300 font-bold text-[18px] rounded-t-lg">
            Login
          </div>
        </div>

        <div className="flex flex-col w-[90%] rounded-lg gap-7">
          <input
            className="p-4 rounded-md bg-slate-200"
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="relative">
            <input
              className="p-4 rounded-md bg-slate-200 w-[100%]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-black"
              onClick={handleTogglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-[90%] mb-5">
          <button
            className="bg-green-400 w-full p-2 rounded-xl"
            onClick={handleLogin}
          >
            {" "}
            login{" "}
          </button>
        </div>
      </div>
      {/* Login Page ends here */}
    </div>
  );
};

export default LoginPage;
