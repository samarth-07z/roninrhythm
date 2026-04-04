import { useNavigate, useEffect } from "react-router-dom";
import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import poster from "@/assets/poster.png";
import roninLogo from "@/assets/logo_ronin.png";

interface UserData {
  name: string;
  picture: string;
  id: string;
  phone?: string;
  danceStyle?: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isRegistered = user?.phone && user?.danceStyle;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Background poster image - very subtle */}
        <div className="absolute inset-0 opacity-10">
          <img src={poster} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Cosmic glow behind title */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, hsl(270 100% 60%), hsl(280 80% 30%) 40%, transparent 70%)" }} />

        <div className="relative z-10 animate-fade-in-up">
          <img src={roninLogo} alt="Ronin Rhythm - The Dance Battle" className="w-96 md:w-[32rem] mx-auto drop-shadow-[0_0_40px_hsl(270_100%_60%/0.5)]" />

          <div className="mt-8 h-px w-48 mx-auto" style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 60%), transparent)" }} />

          <p className="mt-8 text-xs md:text-sm font-exo tracking-wide text-accent whitespace-nowrap" style={{ animation: "flicker 4s infinite" }}>
            ONE FLOOR. ONE RHYTHM. ONE WINNER.
          </p>

          {/* Event details */}
          <div className="mt-12 space-y-3">
            <p className="text-2xl md:text-3xl font-exo tracking-wide text-chrome">
              16 APRIL 2026
            </p>
            <p className="text-sm md:text-base font-exo tracking-wide text-foreground/80">
              SRINIVAS INSTITUTE OF TECHNOLOGY
            </p>
            <p className="text-xs md:text-sm font-exo tracking-wide text-foreground/70">
              VALACHIL
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-14 flex flex-col gap-4 items-center">
            <button
              onClick={() => navigate("/register")}
              className="px-12 py-4 rounded-3xl font-exo text-base md:text-lg tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:scale-105 active:scale-95"
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
              Prove Your Groove
            </button>

            {/* View Pass Button - Only show if user is registered */}
            {isRegistered && (
              <button
                onClick={() => navigate("/pass")}
                className="px-12 py-4 rounded-3xl font-exo text-base md:text-lg tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(34, 197, 94, 0.25)",
                  backdropFilter: "blur(20px)",
                  border: "1.5px solid hsl(142 71% 45% / 0.6)",
                  boxShadow: "0 0 30px hsl(142 71% 45% / 0.5), 0 0 60px hsl(142 71% 45% / 0.35), inset 0 0 30px hsl(142 71% 60% / 0.15), 0 15px 45px hsl(142 71% 45% / 0.25)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 50px hsl(142 71% 45% / 0.7), 0 0 100px hsl(142 71% 45% / 0.4), inset 0 0 40px hsl(142 71% 60% / 0.2), 0 20px 60px hsl(142 71% 45% / 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px hsl(142 71% 45% / 0.5), 0 0 60px hsl(142 71% 45% / 0.35), inset 0 0 30px hsl(142 71% 60% / 0.15), 0 15px 45px hsl(142 71% 45% / 0.25)";
                }}
              >
                View Your Pass 🎟️
              </button>
            )}
          </div>

          {/* User Info */}
          {user && (
            <div className="mt-8 text-center">
              <p className="text-sm font-exo tracking-wide text-muted-foreground">Welcome,</p>
              <p className="text-lg font-exo tracking-wide text-chrome">{user.name}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 px-4 border-t border-muted/20">
        <p className="text-[11px] font-poppins tracking-wider text-muted-foreground">
          © 2026 ALL RIGHTS RESERVED • MADE WITH <span style={{ color: "hsl(270 100% 60%)" }}>♥</span> BY SAMARTH
        </p>
      </footer>
    </div>
  );
};

export default Home;
