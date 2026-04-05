import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import roninLogo from "@/assets/logo_ronin.png";
import { loginWithGoogle } from "@/lib/auth";
import { handleUser } from "@/lib/userService";
import { useAuth } from "@/context/AuthContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { firebaseUser, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#0a0014]">
        <p className="text-purple-300 font-exo tracking-widest animate-pulse">LOADING...</p>
      </div>
    );
  }

  if (firebaseUser) {
    return <Navigate to="/home" replace />;
  }

  // Navigate to register carrying userData so the form fills instantly
  // without waiting for AuthContext's async getUser call to complete
  const goToRegister = (userData: any) => {
    navigate("/register", { state: { prefill: userData } });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setSuccessMsg("");

      let fbUser;

      if (mode === "login") {
        const result = await signInWithEmailAndPassword(auth, email, password);
        fbUser = result.user;
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        fbUser = result.user;
        await updateProfile(fbUser, { displayName: email.split("@")[0] });
      }

      const userLike = {
        uid: fbUser.uid,
        displayName: fbUser.displayName || email.split("@")[0],
        email: fbUser.email || email,
        photoURL: fbUser.photoURL || "",
      };

      const userData = await handleUser(userLike);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.phone && userData.danceStyle) {
        navigate("/home");
      } else {
        goToRegister(userData);
      }
    } catch (err: any) {
      console.error("Auth error:", err.code, err.message);
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found. Switch to Sign Up to create one.");
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Incorrect email or password.");
          break;
        case "auth/email-already-in-use":
          setError("Email already registered. Please log in instead.");
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        default:
          setError("Authentication failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email above first, then click Forgot Password.");
      return;
    }
    try {
      setIsSubmitting(true);
      setError("");
      setSuccessMsg("");
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(`Reset link sent to ${email} — check your inbox.`);
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        default:
          setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      setSuccessMsg("");

      // loginWithGoogle() returns the Firebase user which has
      // displayName and email populated directly from Google
      const googleUser = await loginWithGoogle();
      const userData = await handleUser(googleUser);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.phone && userData.danceStyle) {
        navigate("/home");
      } else {
        goToRegister(userData);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(270 100% 60%), transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(280 100% 70%), transparent 70%)",
          animationDelay: "1.5s",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in-up -translate-y-20">
        <div className="text-center mb-8">
          <img
            src={roninLogo}
            alt="Ronin Rhythm - The Dance Battle"
            className="w-80 md:w-96 mx-auto drop-shadow-[0_0_30px_hsl(270_100%_60%/0.5)]"
          />
        </div>

        {/* Mode Toggle */}
        <div className="flex rounded-xl overflow-hidden mb-6 border border-purple-500/30">
          <button
            onClick={() => { setMode("login"); setError(""); setSuccessMsg(""); }}
            className="flex-1 py-2 text-sm font-exo tracking-wider transition-all duration-300"
            style={{
              background: mode === "login" ? "rgba(180, 80, 255, 0.35)" : "transparent",
              color: mode === "login" ? "#fff" : "rgba(255,255,255,0.5)",
            }}
          >
            SIGN IN
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); setSuccessMsg(""); }}
            className="flex-1 py-2 text-sm font-exo tracking-wider transition-all duration-300"
            style={{
              background: mode === "signup" ? "rgba(180, 80, 255, 0.35)" : "transparent",
              color: mode === "signup" ? "#fff" : "rgba(255,255,255,0.5)",
            }}
          >
            SIGN UP
          </button>
        </div>

        <form onSubmit={handleEmailAuth} className="glass-panel rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-xs font-exo tracking-wider text-muted-foreground mb-2">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-neon rounded-lg px-4 py-3 text-foreground font-body tracking-wide"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-exo tracking-wider text-muted-foreground mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input-neon rounded-lg px-4 py-3 text-foreground font-body tracking-wide"
              placeholder="••••••••"
              required
            />
            {mode === "login" && (
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isSubmitting}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-exo tracking-wide disabled:opacity-50"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 font-exo text-base tracking-wider text-primary-foreground uppercase mt-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "rgba(180, 80, 255, 0.25)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid hsl(270 100% 60% / 0.6)",
              boxShadow:
                "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting)
                e.currentTarget.style.boxShadow =
                  "0 0 50px hsl(270 100% 60% / 0.7), 0 0 100px hsl(270 100% 60% / 0.4), inset 0 0 40px hsl(270 100% 80% / 0.2), 0 20px 60px hsl(270 100% 60% / 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)";
            }}
          >
            {isSubmitting
              ? mode === "login" ? "Signing In..." : "Creating Account..."
              : mode === "login" ? "Enter The Arena" : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mt-6 mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted-foreground/20"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-background text-muted-foreground">or</span>
          </div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-white text-gray-900 font-medium rounded-lg transition-all duration-300 hover:bg-gray-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-gray-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {isSubmitting ? "Signing In..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;