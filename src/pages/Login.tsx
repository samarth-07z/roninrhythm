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
          className="w-full py-3 px-4 bg-white text-gray-900 font-medium rounded-lg transition-all duration-300 hover:bg-gray-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-gray-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {isLoading ? "Signing In..." : "Sign in with Google"}
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
