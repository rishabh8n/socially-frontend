import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import axios from "@/axios/axios";

const EmailVerificationPage = () => {
  const [code, setCode] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, verifyEmail } = useUserStore();
  const [time, setTime] = useState(30);
  const [error, setError] = useState("");

  const timeOutCallBack = useCallback(() => setTime((prev) => prev - 1), []);

  useEffect(() => {
    if (!searchParams.get("email")) {
      navigate("/auth/signup");
    }
    time > 0 && setTimeout(timeOutCallBack, 1000);
  }, [time, timeOutCallBack]);

  const handleVerify = async () => {
    const email = searchParams.get("email");
    if (!email || !code) return;
    try {
      setError("");
      await verifyEmail(email, code);
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data.message || "Error verifying email");
    }
  };

  const handleResend = async () => {
    const email = searchParams.get("email");
    try {
      setError("");
      const response = await axios.post("/auth/resend-email", { email });
      if (response.status === 201) {
        setTime(30);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data.message || "Error resending email");
    }
  };

  return (
    <div className="bg-opacity-5 p-6 flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-semibold m-2">Verify Your Email</h1>
      <p className="w-64 text-center mx-auto text-gray-400 text-sm leading-4 mb-6">
        Enter the code to verify your email
      </p>
      <div className="mb-8">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={code}
          onChange={(value) => setCode(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className="md:size-10 mx-1 bg-[#000] bg-opacity-10"
            />
            <InputOTPSlot
              index={1}
              className="md:size-10 mx-1 bg-[#000] bg-opacity-10"
            />
            <InputOTPSlot
              index={2}
              className="md:size-10 mx-1 bg-[#000] bg-opacity-10"
            />
            <InputOTPSlot
              index={3}
              className="md:size-10 mx-1 bg-[#000] bg-opacity-10"
            />
            <InputOTPSlot
              index={4}
              className="md:size-10 mx-1 bg-[#000] bg-opacity-10"
            />
            <InputOTPSlot
              index={5}
              className="md:size-10 mx-1 bg-[#000] bg-opacity-10"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type="submit"
        onClick={handleVerify}
        className="mb-8 w-full p-5"
        disabled={isLoading || code.length < 6}
      >
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
      <p>
        Didn't receive the code?
        <Button variant="ghost" onClick={handleResend} disabled={time !== 0}>
          Resend
        </Button>
      </p>
      {time > 0 && (
        <p className="text-red-400 text-sm">
          Resend verification mail after {time} seconds.
        </p>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default EmailVerificationPage;
