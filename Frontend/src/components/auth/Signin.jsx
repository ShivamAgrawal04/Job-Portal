import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signin = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      if (err.code === "ECONNREFUSED" || !err.response) {
        // ECONNREFUSED indicates a connection error (server is down)
        toast.error("Could not connect to the server. Please try again later.");
      } else if (err.response && err.response.status === 500) {
        // Handle server error (e.g., 500 - Internal Server Error)
        toast.error("Server error. Please try again later.");
      } else if (err.response && err.response.status === 404) {
        // Handle not found error (e.g., 404 - Not Found)
        toast.error("Requested resource not found.");
      } else {
        // Catch other types of errors (network errors, invalid data, etc.)
        toast.error(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Enter Full Name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              autoComplete="email"
              onChange={changeEventHandler}
              placeholder="Enter E-mail"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <div className="relative flex bg-red-200">
              <Input
                type={showPass ? "text" : "password"}
                value={input.password}
                name="password"
                autoComplete="current-password"
                onChange={changeEventHandler}
                placeholder="Enter Password"
              />
              <button
                className="absolute right-2 bottom-2"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPass ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <div className="my-2">
            <Label>M. No.</Label>
            <Input
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter M. No."
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="r1"
                />
                <Label className="cursor-pointer" htmlFor="r1">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="r2"
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label className="cursor-pointer" htmlFor="r2">
                  recruiter
                </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                id=""
                className="cursor-pointer"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign In
            </Button>
          )}
          <span className="text-sm">
            Already have an account{" "}
            <Link to="/login" className="text-blue-500">
              Log In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signin;
