import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../Auth/AuthProvider.jsx";

import SocialLogIn from "./SocialLogIn";
import { toast } from "react-hot-toast";
import { RAPIDHIRE_ENDPOINT } from '../../constants.js';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./LogIn.css";
import axios from "axios";
import { isDemo } from "../../constants.js";
import useAxiosSecure from "../../Hooks/AdminHook/useAxiosSecure";
const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { logIn } =
    useContext(authContext);
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const onSubmit = async ({ email, password }) => {
    try {
      const { user } = await logIn(email, password);
      const { data: dataToken } = await axios.post(
        RAPIDHIRE_ENDPOINT + "/jwt",
        {
          email: email,
        }
      );
      const { data } = await axios.get(
        RAPIDHIRE_ENDPOINT + `/users/admin/${user?.email}`,
        { headers: { Authorization: `Bearer ${dataToken.token}` } }
      );
      toast.success("Successfully LogIn");
      if(isDemo){
        navigate("/dashboard/idCheck")
      } else {
        if (data.admin) {
          navigate("/dashboard/admin/dashboard");
        } else {
          navigate("/dashboard/jobs");
        }
      }
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="   lg:md:p-40 bg-gradient-to-r from-blue-900 from-10% via-blue-800 via-30% to-orange-500 to-90% ">
      <div className=" lg:md:flex lg:flex-row  lg:w-2/3  mx-auto pb-0 rounded-2xl shadow-lg shadow-black ">
        <div className="rounded-md">
          <img
            src="https://i.ibb.co/7nZ0hCg/login-image.jpg"
            alt="User Login"
            className="h-[100%]  lg:md:w-[400px] w-[100%] rounded-l-2xl bg-white bg-opacity-40 p-5"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body lg:md:my-0 bg-blue-900 lg:md:w-[420px] rounded-r-2xl "
        >
          <div className="form-control">
            <label className="label ">
              <span className="label-text  text-white">Email</span>
            </label>
            <input
              type="email"
              ref={emailRef}
              {...register("email", { required: true })}
              placeholder="email"
              className="rounded-md border-white"
            />
            {errors.email && (
              <span className="text-orange-800">This field is required</span>
            )}
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <div className="flex rounded-md bg-white px-1 border mb-4">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                })}
                placeholder="password"
                className="focus:border-none focus:ring-0 flex-grow  border-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=""
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="" />
                ) : (
                  <AiFillEye className="" />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="text-orange-800">This field is required</span>
            )}

            {errors.password?.type === "minLength" && (
              <span className="text-orange-800">
                Password Must be Six Character
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-orange-800">
                At least one uppercase letter, one lowercase letter, one number
                and one special character
              </span>
            )}

            {!isDemo && (<label className="label">
              <Link
                to={"forgotPassword"}
                className="underline font-semibold text-sm text-gray-100"
              >
                Forgot password?
              </Link>
            </label>)}
          </div>
          {!isDemo && (<small className="font-semibold text-gray-100">
            Are you new to RapidHire?{" "}
            <span>
              <Link
                className="ml-1  text-cyan-200 underline text-sm font-bold"
                to="/register"
              >
                Register Now
              </Link>
            </span>
          </small>)}
          <div className="form-control lg:md:px-20">
            <input
              type="submit"
              placeholder=""
              value="Login"
              className="border  bg-orange-500 hover:bg-orange-500 rounded-lg py-1 font-medium text-white"
            />
          </div>

          <div>
            <SocialLogIn></SocialLogIn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
