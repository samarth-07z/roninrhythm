import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import roninLogo from "@/assets/logo_ronin.png";
import { getUser } from "@/lib/userService";

interface UserData {
  name: string;
  email: string;
  picture: string;
  id: string;
  phone: string;
  danceStyle: string;
  perks: string;
}

const Pass = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const stored = localStorage.getItem("user");
        if (!stored) {
          setError("No user data found. Please log in again.");
          navigate("/");
          return;
        }

        const user = JSON.parse(stored);
        const dbUser = await getUser(user.email);

        if (dbUser) {
          setUserData(dbUser);
        } else {
          setError("User data not found in database");
        }
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="text-white font-exo text-xl">Loading your pass...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="relativ z-10 text-center">
          <p className="text-red-400 font-exo text-lg mb-4">{error || "User data not available"}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-exo text-white"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
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

      <div className="relative z-10 w-full max-w-2xl px-4 animate-fade-in-up">
        <div className="text-center mb-8">
          <img
            src={roninLogo}
            alt="Ronin Rhythm"
            className="w-64 md:w-80 mx-auto drop-shadow-[0_0_30px_hsl(270_100%_60%/0.5)]"
          />
          <h1 className="text-3xl font-exo tracking-wider text-chrome mt-4">YOUR EVENT PASS</h1>
        </div>

        {/* Pass Card */}
        <div
          className="glass-panel rounded-3xl p-8 space-y-6 max-w-md mx-auto"
          style={{
            background: "rgba(30, 20, 60, 0.4)",
            border: "2px solid hsl(270 100% 60% / 0.5)",
            boxShadow: "0 0 40px hsl(270 100% 60% / 0.3), inset 0 0 40px hsl(270 100% 80% / 0.05)",
          }}
        >
          {/* User Info */}
          <div className="text-center">
            {userData.picture && (
              <img
                src={userData.picture}
                alt={userData.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-500 drop-shadow-[0_0_15px_hsl(270_100%_60%/0.5)]"
              />
            )}
            <h2 className="text-2xl font-exo tracking-wide text-chrome">{userData.name}</h2>
            <p className="text-sm text-muted-foreground mt-2">{userData.email}</p>
          </div>

          {/* Unique ID and QR Code */}
          <div className="border-t border-muted-foreground/20 pt-6">
            <div className="text-center">
              <p className="text-xs font-exo tracking-widest text-muted-foreground mb-3">YOUR UNIQUE ID</p>
              <p
                className="text-3xl font-exo tracking-widest text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(270 100% 60%), hsl(280 100% 70%))",
                }}
              >
                {userData.id}
              </p>

              {/* QR Placeholder - You can integrate actual QR generation */}
              <div className="mt-6 flex justify-center">
                <div
                  className="w-32 h-32 rounded-lg border-2 border-purple-500 flex items-center justify-center"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <img src="/assets/qr.png" alt="QR Code" className="w-full h-full object-cover rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-muted-foreground/20 pt-6 space-y-4">
            <div>
              <p className="text-xs font-exo tracking-widest text-muted-foreground mb-1">DANCE STYLE</p>
              <p className="text-lg font-exo text-chrome">{userData.danceStyle}</p>
            </div>
            <div>
              <p className="text-xs font-exo tracking-widest text-muted-foreground mb-1">PHONE</p>
              <p className="text-lg font-exo text-chrome">{userData.phone}</p>
            </div>
            <div>
              <p className="text-xs font-exo tracking-widest text-muted-foreground mb-1">PERKS</p>
              <p className="text-sm font-exo text-transparent bg-clip-text" style={{
                backgroundImage: "linear-gradient(135deg, hsl(270 100% 60%), hsl(280 100% 70%))",
              }}>
                {userData.perks}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-muted-foreground/20 pt-6 space-y-3">
            <button
              onClick={() => navigate("/home")}
              className="w-full py-3 font-exo text-base tracking-wider text-primary-foreground uppercase rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(180, 80, 255, 0.25)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid hsl(270 100% 60% / 0.6)",
                boxShadow:
                  "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15)",
              }}
            >
              Enter The Arena
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Show this pass at the entrance to confirm your registration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pass;
