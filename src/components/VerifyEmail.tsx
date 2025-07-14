import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const token = searchParams.get("token");

  const handleVerify = async () => {
    try {
      if (!token) {
        setStatus("Invalid or missing token.");
        return;
      }

      setIsVerifying(true);
    const res = await axios.post(
  "https://api.replicacopyindustries.com/api/users/verify-email",
  {}, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      setStatus(res.data.message || "Email verified successfully!");
    } catch (err:any) {
      console.error(err);
      setStatus(
        err.response?.data?.message ||
          "Email verification failed or token expired."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center h-[60vh] ">
      <div className="text-center space-y-4">
        <h1 className="text-2xl text-white font-bold">Verify Your Email</h1>

        {status && <p className="text-gray-200">{status}</p>}

        <div className="space-x-2">
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </button>

          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
