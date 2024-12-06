import React from "react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PopoverContent } from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "@/redux/authSlice";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex justify-center items-center gap-12">
          <div className="flex font-medium gap-5 items-center">
            {user && user.role === "recruiter" ? (
              <>
                <NavLink
                  to="/admin/companies"
                  className={(e) =>
                    e.isActive ? "border-purple-800 border-b-4" : ""
                  }
                >
                  Companies
                </NavLink>
                <NavLink
                  to="/admin/jobs"
                  className={(e) =>
                    e.isActive ? "border-purple-800 border-b-4" : ""
                  }
                >
                  Jobs
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={(e) =>
                    e.isActive ? "border-purple-800 border-b-4" : ""
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/jobs"
                  className={(e) =>
                    e.isActive ? "border-purple-800 border-b-4" : ""
                  }
                >
                  Jobs
                </NavLink>
                <NavLink
                  to="/browse"
                  className={(e) =>
                    e.isActive ? "border-purple-800 border-b-4" : ""
                  }
                >
                  Browse
                </NavLink>
              </>
            )}
          </div>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="border" variant="link">
                  Log In
                </Button>
              </Link>
              <Link to="/signin">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-gray-400 border">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 border px-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-4 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-4 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
