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
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import rciLogo from "../assets/rciLogo.png";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email({ message: "Please Enter a valid Email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = () => {
    try {
      setIsLoading(true);
      const googleLoginUrl = `http://localhost:5000/api/users/auth/google`;
      window.location.href = googleLoginUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setIsLoading(true);

  try {
    console.log("🔐 Attempting to sign in...");

    // Step 1: Login API
    const loginRes = await axios.post("http://localhost:5000/api/users/signin", {
      email: values.email,
      password: values.password,
    });

    console.log("📡 Login API response:", loginRes);

    if (loginRes.status === 200 && loginRes.data?.user_Token) {
      const token = loginRes.data.user_Token;
      console.log("✅ Login successful. Token received:", token);

      // Save token
      localStorage.setItem("rci-token", token);

      try {
        // Step 2: Validate user
        console.log("📡 Fetching user data using token...");
        const userRes = await axios.get("http://localhost:5000/api/users/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userRes.status === 200 && userRes.data) {
          const user = userRes.data.user;
          console.log("✅ User validated:", user);

          localStorage.setItem("rci-user", JSON.stringify(user));

    
          if (user.role === "admin") {
            console.log("Redirecting to /admin");
            navigate("/admin");
          } else {
            console.log("Redirecting to /");
            navigate("/");
          }
        } else {
          console.error(" User validation failed. Status:", userRes.status);
        }
      } catch (userError) {
        console.error(" Error during user validation:", userError);
      }
    } else {
      console.error("Login failed. No token received.");
    }
  } catch (loginError) {
    if (axios.isAxiosError(loginError)) {
      console.error(" Login error (API):", loginError.response?.data || loginError.message);
    } else {
      console.error(" Login error (Other):", loginError);
    }
  } finally {
    setIsLoading(false);
  }
};

  // Redirect to home if already logged in
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      navigate("/");
    }
  }, []);

  return (
    <div className="text-zinc-400 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 relative">
      <div className="absolute top-5 left-5 cursor-pointer" onClick={() => navigate("/")}>
        <img src={rciLogo} alt="rciLogo" className="w-28 sm:w-32 md:w-40 object-cover" />
      </div>

      {/* Social icons */}
      <div className="absolute bottom-6 right-6 sm:right-10 flex gap-5 sm:gap-10">
        {[
          { icon: <FaFacebook size={20} />, url: "https://facebook.com" },
          { icon: <FaInstagram size={15} />, url: "https://instagram.com" },
          { icon: <FaLinkedin size={15} />, url: "https://linkedin.com" },
        ].map((item, index) => (
          <div
            key={index}
            className="p-3 border border-zinc-700 rounded-full hover:bg-white text-zinc-200 hover:text-zinc-900 cursor-pointer"
            onClick={() => openInNewTab(item.url)}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md sm:max-w-lg bg-zinc-800 text-zinc-400 p-6 sm:p-10 md:p-14 rounded-lg space-y-6">
        <div className="space-y-2">
          <p className="text-md sm:text-lg md:text-xl font-bold text-start">Log in to your account</p>
          <p className="text-start text-xs sm:text-sm">Welcome back! Please enter your details.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Email" {...field} />
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
            <Button
              className="w-full bg-zinc-400 text-zinc-900 uppercase tracking-widest font-bold cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-center gap-5">
          <div className="h-[2px] w-full bg-zinc-700" />
          <p>or</p>
          <div className="h-[2px] w-full bg-zinc-700" />
        </div>

        <div className="space-y-6 pt-4">
          <Button
            className="w-full bg-zinc-100 text-zinc-900 uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer"
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            Continue with Google <FcGoogle size={20} />
          </Button>
          <p className="text-center text-sm">
            Don't have an account?
            <span
              className="font-bold hover:underline ml-1 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
