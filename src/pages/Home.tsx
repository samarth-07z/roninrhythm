import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import poster from "@/assets/poster.avif";
import roninLogo from "@/assets/logo_ronin.png";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

import avatar1 from "@/assets/avatar1.avif";
import avatar2 from "@/assets/avatar2.avif";
import avatar3 from "@/assets/avatar3.avif";
import avatar4 from "@/assets/avatar4.avif";
import avatar5 from "@/assets/avatar5.avif";
import avatar6 from "@/assets/avatar6.avif";
import avatar7 from "@/assets/avatar7.avif";
import avatar8 from "@/assets/avatar8.avif";
import avatar9 from "@/assets/avatar9.avif";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

const getAvatarForUser = (userId: string): string => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatars[Math.abs(hash) % avatars.length];
};

const Home = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isRegistered = userData?.phone && userData?.danceStyle;
  const avatarSrc = userData?.id ? getAvatarForUser(userData.id) : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />

      {/* ── Avatar + Dropdown (top-right) ── */}
      {avatarSrc && (
        <div
          ref={dropdownRef}
          className="absolute top-5 right-5 z-50"
        >
          {/* Avatar button */}
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="relative w-11 h-11 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 focus:outline-none"
            style={{
              border: "2px solid hsl(270 100% 60% / 0.7)",
              boxShadow: dropdownOpen
                ? "0 0 20px hsl(270 100% 60% / 0.8), 0 0 40px hsl(270 100% 60% / 0.4)"
                : "0 0 12px hsl(270 100% 60% / 0.4)",
            }}
          >
            <img
              src={avatarSrc}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(270 80% 8% / 0.97), hsl(280 60% 12% / 0.97))",
                border: "1px solid hsl(270 60% 30% / 0.5)",
                boxShadow: "0 8px 32px hsl(270 100% 10% / 0.8), 0 0 20px hsl(270 100% 60% / 0.1)",
                backdropFilter: "blur(20px)",
                animation: "fadeSlideDown 0.15s ease-out",
              }}
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-purple-500/20">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarSrc}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    style={{ border: "1.5px solid hsl(270 100% 60% / 0.5)" }}
                  />
                  <div className="min-w-0">
                    <p
                      className="text-xs tracking-wider truncate"
                      style={{
                        fontFamily: "'Exo', sans-serif",
                        fontWeight: 800,
                        fontStyle: "italic",
                        color: "hsl(0 0% 88%)",
                      }}
                    >
                      {userData?.name?.toUpperCase()}
                    </p>
                    <p className="text-[10px] text-purple-300/60 font-poppins truncate mt-0.5">
                      {userData?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sign out button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group"
                style={{ color: "hsl(0 0% 70%)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(270 100% 60% / 0.1)";
                  e.currentTarget.style.color = "hsl(0 0% 95%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "hsl(0 0% 70%)";
                }}
              >
                {/* Sign out icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 text-purple-400"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span
                  className="text-xs tracking-widest"
                  style={{
                    fontFamily: "'Exo', sans-serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                  }}
                >
                  SIGN OUT
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="absolute inset-0 opacity-10">
          <img src={poster} alt="" className="w-full h-full object-cover" />
        </div>

        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, hsl(270 100% 60%), hsl(280 80% 30%) 40%, transparent 70%)" }}
        />

        <div className="relative z-10 animate-fade-in-up">
          <img
            src={roninLogo}
            alt="Ronin Rhythm - The Dance Battle"
            className="w-96 md:w-[32rem] mx-auto drop-shadow-[0_0_40px_hsl(270_100%_60%/0.5)]"
          />

          <div
            className="mt-8 h-px w-48 mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 60%), transparent)" }}
          />

          <p
            className="mt-8 text-xs md:text-sm font-exo tracking-wide text-accent whitespace-nowrap"
            style={{ animation: "flicker 4s infinite" }}
          >
            ONE FLOOR. ONE RHYTHM. ONE WINNER.
          </p>

          <div className="mt-12 space-y-3">
            <p className="text-2xl md:text-3xl font-exo tracking-wide text-chrome">16 APRIL 2026</p>
            <p className="text-sm md:text-base font-exo tracking-wide text-foreground/80">SRINIVAS INSTITUTE OF TECHNOLOGY</p>
            <p className="text-xs md:text-sm font-exo tracking-wide text-foreground/70">VALACHIL</p>
          </div>

          <div className="mt-14 flex flex-col gap-4 items-center">
            {!isRegistered && (
              <button
                onClick={() => navigate("/register")}
                className="px-12 py-4 rounded-3xl font-exo text-base md:text-lg tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(180, 80, 255, 0.25)",
                  backdropFilter: "blur(20px)",
                  border: "1.5px solid hsl(270 100% 60% / 0.6)",
                  boxShadow: "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)",
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
            )}

            {isRegistered && (
              <button
                onClick={() => navigate("/pass")}
                className="px-12 py-4 rounded-3xl font-exo text-base md:text-lg tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(180, 80, 255, 0.25)",
                  backdropFilter: "blur(20px)",
                  border: "1.5px solid hsl(270 100% 60% / 0.6)",
                  boxShadow: "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 50px hsl(270 100% 60% / 0.7), 0 0 100px hsl(270 100% 60% / 0.4), inset 0 0 40px hsl(270 100% 80% / 0.2), 0 20px 60px hsl(270 100% 60% / 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)";
                }}
              >
                View Your Pass
              </button>
            )}
          </div>

          {userData && (
            <div className="mt-8 text-center">
              <p className="text-sm font-exo tracking-wide text-muted-foreground">Welcome,</p>
              <p className="text-lg font-exo tracking-wide text-chrome">{userData.name}</p>
            </div>
          )}
        </div>
      </section>

      {/* Dropdown animation */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <footer className="relative z-10 w-full text-center py-6 px-4 border-t border-muted/20">
        <p className="text-[11px] font-poppins tracking-wider text-muted-foreground">
          © 2026 ALL RIGHTS RESERVED • MADE WITH{" "}
          <span style={{ color: "hsl(270 100% 60%)" }}>♥</span> BY SAMARTH
        </p>
      </footer>
    </div>
  );
};

export default Home;