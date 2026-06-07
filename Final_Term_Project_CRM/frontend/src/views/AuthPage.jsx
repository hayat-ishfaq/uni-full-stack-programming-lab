"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import CommonForm from "@/components/CommonForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const signInFormControls = [
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", componentType: "input" },
  { name: "password", label: "Password", type: "password", placeholder: "Your password", componentType: "input" },
];

const signUpFormControls = [
  { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", componentType: "input" },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", componentType: "input" },
  { name: "password", label: "Password", type: "password", placeholder: "Min. 6 characters", componentType: "input" },
  { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Repeat password", componentType: "input" },
];

const AuthPage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { loginUser, registerUser, loading, error } = useAuth();
  const [mode, setMode] = useState("signin");
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  useEffect(() => {
    if (user || localStorage.getItem("token")) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!signInData.email?.trim()) return toast("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInData.email)) return toast("Invalid email");
    if (!signInData.password) return toast("Password is required");
    try {
      const loggedInUser = await loginUser({ email: signInData.email, password: signInData.password });
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      router.push("/dashboard");
    } catch (err) {
      toast.error(err?.message || error || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!signUpData.name?.trim() || signUpData.name.trim().length < 2) return toast("Name must be at least 2 characters");
    if (!signUpData.email?.trim()) return toast("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email)) return toast("Invalid email");
    if (!signUpData.password || signUpData.password.length < 6) return toast("Password must be at least 6 characters");
    if (signUpData.password !== signUpData.confirmPassword) return toast("Passwords do not match");
    try {
      const newUser = await registerUser({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      });
      toast.success(`Welcome, ${newUser.name}!`);
      router.push("/dashboard");
    } catch (err) {
      toast.error(err?.message || error || "Registration failed");
    }
  };

  const validateSignIn = () => signInData.email && signInData.password;
  const validateSignUp = () =>
    signUpData.name && signUpData.email && signUpData.password && signUpData.confirmPassword;

  return (
    <div className="auth-mesh relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 bottom-20 size-80 rounded-full bg-orange-400/15 blur-3xl" />
      </div>

      <div className="panel relative w-full max-w-md p-8 sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/30">
            <span className="font-display text-2xl font-bold text-primary-foreground">N</span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Nexus CRM</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin" ? "Sign in to your workspace" : "Create your free account"}
          </p>
        </div>

        <div className="mb-6 flex rounded-full bg-muted p-1">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${
              mode === "signin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${
              mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Register
          </button>
        </div>

        {mode === "signin" ? (
          <CommonForm
            formControls={signInFormControls}
            formData={signInData}
            setFormData={setSignInData}
            buttonText={loading ? "Signing in..." : "Continue"}
            handleSubmit={handleLogin}
            isButtonDisabled={!validateSignIn() || loading}
          />
        ) : (
          <CommonForm
            formControls={signUpFormControls}
            formData={signUpData}
            setFormData={setSignUpData}
            buttonText={loading ? "Creating..." : "Get Started"}
            handleSubmit={handleRegister}
            isButtonDisabled={!validateSignUp() || loading}
          />
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Secure JWT authentication · MongoDB powered
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
