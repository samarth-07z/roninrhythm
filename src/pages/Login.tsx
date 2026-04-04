import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import roninLogo from "@/assets/logo_ronin.png";
import { loginWithGoogle } from "@/lib/auth";
import { handleUser } from "@/lib/userService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Sign in with Google
      const googleUser = await loginWithGoogle();
      console.log("Google user:", googleUser);

      // Handle user in Realtime DB
      const userData = await handleUser(googleUser);
      console.log("User data:", userData);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on registration status
      if (userData.phone && userData.danceStyle) {
        // User has completed registration - go to pass page
        navigate("/pass");
      } else {
        // New user or incomplete registration - go to register page
        navigate("/register");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Cosmic glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 60%), transparent 70%)",
        }}
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

        <form onSubmit={handleLogin} className="glass-panel rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-xs font-exo tracking-wider text-muted-foreground mb-2">
              USERNAME / EMAIL
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-neon rounded-lg px-4 py-3 text-foreground font-body tracking-wide"
              placeholder="enter your identity"
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
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 font-exo text-base tracking-wider text-primary-foreground uppercase mt-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(180, 80, 255, 0.25)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid hsl(270 100% 60% / 0.6)",
              boxShadow:
                "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 50px hsl(270 100% 60% / 0.7), 0 0 100px hsl(270 100% 60% / 0.4), inset 0 0 40px hsl(270 100% 80% / 0.2), 0 20px 60px hsl(270 100% 60% / 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)";
            }}
          >
            Enter The Arena
          </button>
        </form>

        {/* Google Login Divider */}
        <div className="relative mt-6 mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted-foreground/20"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-background text-muted-foreground">or</span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-4 font-exo text-base tracking-wider text-primary-foreground uppercase rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "rgba(219, 39, 119, 0.25)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid hsl(330 100% 50% / 0.6)",
            boxShadow:
              "0 0 30px hsl(330 100% 50% / 0.5), 0 0 60px hsl(330 100% 50% / 0.35), inset 0 0 30px hsl(330 100% 70% / 0.15), 0 15px 45px hsl(330 100% 50% / 0.25)",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.boxShadow =
                "0 0 50px hsl(330 100% 50% / 0.7), 0 0 100px hsl(330 100% 50% / 0.4), inset 0 0 40px hsl(330 100% 70% / 0.2), 0 20px 60px hsl(330 100% 50% / 0.35)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 30px hsl(330 100% 50% / 0.5), 0 0 60px hsl(330 100% 50% / 0.35), inset 0 0 30px hsl(330 100% 70% / 0.15), 0 15px 45px hsl(330 100% 50% / 0.25)";
          }}
        >
          {isLoading ? "Signing In..." : "Sign In With Google"}
        </button>

        {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
