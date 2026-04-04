import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import roninLogo from "@/assets/logo_ronin.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Cosmic glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(270 100% 60%), transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(280 100% 70%), transparent 70%)", animationDelay: "1.5s" }} />

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in-up -translate-y-20">
        <div className="text-center mb-8">
          <img src={roninLogo} alt="Ronin Rhythm - The Dance Battle" className="w-80 md:w-96 mx-auto drop-shadow-[0_0_30px_hsl(270_100%_60%/0.5)]" />
        </div>

        <form onSubmit={handleLogin} className="glass-panel rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-xs font-exo tracking-wider text-muted-foreground mb-2">USERNAME / EMAIL</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-neon rounded-lg px-4 py-3 text-foreground font-body tracking-wide"
              placeholder="enter your identity"
            />
          </div>

          <div>
            <label className="block text-xs font-exo tracking-wider text-muted-foreground mb-2">PASSWORD</label>
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
              boxShadow: "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 50px hsl(270 100% 60% / 0.7), 0 0 100px hsl(270 100% 60% / 0.4), inset 0 0 40px hsl(270 100% 80% / 0.2), 0 20px 60px hsl(270 100% 60% / 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)";
            }}
          >
            Enter The Arena
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
