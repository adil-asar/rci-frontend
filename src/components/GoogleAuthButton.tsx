// components/GoogleAuthButton.tsx
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface GoogleAuthButtonProps {
  redirectUrl?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

const GoogleAuthButton = ({
  redirectUrl = "/ordernow/PrintingServicesforLegalProfessionals",
  onSuccess,
  onError,
}: GoogleAuthButtonProps) => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response: any) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/google-signin", {
        token: response.credential,
      });

      localStorage.setItem("rci-token", res.data.token);
      localStorage.setItem("rci-user", JSON.stringify(res.data.user));

      if (onSuccess) onSuccess(res.data.user);

      navigate(redirectUrl);
    } catch (err) {
      console.error("Google login error:", err);
      if (onError) onError(err);
    }
  };

  const handleLoginError = () => {
    console.error("Google login failed.");
    if (onError) onError(new Error("Google login failed."));
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginError} 
    />
  );
};

export default GoogleAuthButton;
