import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import rciLogo from "../assets/rciLogo.png";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  username: z.string().nonempty({ message: "Please Enter a username." }).max(10),
  email: z.string().email({ message: "Please Enter a valid Email." }),
  password: z.string().min(8, { message: "Password length must be greater and equal to 8." }),
});

const SignUp = () => {
  const navigate = useNavigate();

  const [isloading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = () => {
    try {
      setIsLoading(true);
      const googleLoginUrl = `http://localhost:5000/api/users/auth/google`; // change if needed
      window.location.href = googleLoginUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await axios.post("http://localhost:5000/api/users/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      console.log("Signup successful:", response.data);

      // Navigate to sign-in page on success
      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (slug: string) => {
    navigate(slug);
  };

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="text-zinc-400 w-full min-h-screen flex items-center justify-center relative px-4 sm:px-6">
      {/* Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 cursor-pointer" onClick={() => handleNavigate("/")}>
        <img src={rciLogo} alt="rciLogo" className="w-28 sm:w-36 object-cover" />
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-4 right-4 flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 flex-wrap justify-end">
        <div
          className="p-2 sm:p-3 border border-zinc-700 rounded-full hover:bg-white text-zinc-200 hover:text-zinc-900 cursor-pointer"
          onClick={() => openInNewTab("https://facebook.com")}
        >
          <FaFacebook size={20} />
        </div>
        <div
          className="p-2 sm:p-3 border border-zinc-700 rounded-full hover:bg-white text-zinc-200 hover:text-zinc-900 cursor-pointer"
          onClick={() => openInNewTab("https://instagram.com")}
        >
          <FaInstagram size={18} />
        </div>
        <div
          className="p-2 sm:p-3 border border-zinc-700 rounded-full hover:bg-white text-zinc-200 hover:text-zinc-900 cursor-pointer"
          onClick={() => openInNewTab("https://linkedin.com")}
        >
          <FaLinkedin size={18} />
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-lg bg-zinc-800 text-zinc-400 p-6 sm:p-10 md:p-12 rounded-md space-y-6">
        <div className="space-y-2">
          <p className="text-md sm:text-lg md:text-xl font-bold text-start">Create a new account</p>
          <p className="text-start text-xs sm:text-sm">Welcome back! Please enter your details.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Username:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Password:</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-xs text-center leading-snug">
              By creating an account, you agree to our{" "}
              <span className="font-bold cursor-pointer hover:underline">Terms & Conditions</span> and{" "}
              <span className="font-bold cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            <Button
              className="w-full bg-zinc-400 text-zinc-900 uppercase tracking-wide font-bold rounded-xs cursor-pointer"
              type="submit"
              disabled={isloading}
            >
              {isloading ? "Signing up..." : "Sign up"}
            </Button>

            <div className="flex items-center justify-center gap-5">
              <div className="h-[2px] w-full bg-zinc-700" />
              <p>or</p>
              <div className="h-[2px] w-full bg-zinc-700" />
            </div>

            <Button
              className="w-full flex items-center justify-center gap-2 bg-zinc-100 text-zinc-900 uppercase tracking-widest font-bold rounded-xs cursor-pointer"
              type="button"
              onClick={handleGoogleLogin}
              disabled={isloading}
            >
              Continue with Google <FcGoogle size={20} />
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <span className="font-bold hover:underline cursor-pointer" onClick={() => handleNavigate("/signin")}>
                Sign in
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
