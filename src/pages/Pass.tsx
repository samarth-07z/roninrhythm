import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import ParticleBackground from "@/components/ParticleBackground";
import roninLogo from "@/assets/logo_ronin.png";
import { getUser } from "@/lib/userService";
import { generateQRCodeData } from "@/lib/qrCodeUtils";

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

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${userData?.id}-qr.png`;
      link.click();
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="text-white font-exo-bold-italic text-xl">
          Loading your pass...
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <p className="text-red-400 font-exo-bold-italic text-lg mb-4">
            {error || "User data not available"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 font-exo-bold-italic bg-purple-600 hover:bg-purple-700 rounded-lg text-white tracking-wider"
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

      {/* Glow Background */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, hsl(270 100% 60%), transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={roninLogo}
            alt="Ronin Rhythm"
            className="w-64 mx-auto drop-shadow-[0_0_30px_hsl(270_100%_60%/0.5)]"
          />
          <h1 className="text-2xl md:text-3xl font-exo-bold-italic text-chrome neon-text-glow mt-4 tracking-wider">
            YOUR EVENT PASS
          </h1>
        </div>

        {/* Pass Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 max-w-md mx-auto neon-glow">

          {/* User */}
          <div className="text-center">
            <img
              src={userData.picture}
              alt={userData.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 border-2 border-purple-500/50 neon-glow"
            />
            <h2 className="text-lg md:text-xl font-exo-bold-italic text-chrome tracking-wide">
              {userData.name.toUpperCase()}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-poppins">
              {userData.email}
            </p>
          </div>

          {/* ID */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2 font-poppins tracking-wide">
              UNIQUE ID
            </p>
            <p className="text-xl md:text-2xl font-exo-bold-italic text-accent tracking-wider">
              {userData.id}
            </p>
          </div>

          {/* QR */}
          <div className="flex justify-center">
            <div className="qr-responsive">
              <QRCodeCanvas
                value={generateQRCodeData(
                  userData.id,
                  userData.name,
                  userData.email,
                  userData.phone
                )}
                size={140}
                level="H"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>

          {/* Details */}
          <div className="text-foreground space-y-2 font-poppins text-sm">
            <p>
              <span className="font-exo-bold-italic text-accent">Dance:</span>{" "}
              {userData.danceStyle}
            </p>
            <p>
              <span className="font-exo-bold-italic text-accent">Phone:</span>{" "}
              {userData.phone}
            </p>
            <p className="text-purple-400 font-exo-bold-italic text-xs tracking-wider">
              {userData.perks}
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/home")}
              className="w-full py-3 rounded-xl font-exo-bold-italic text-lg tracking-wider text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(180, 80, 255, 0.25)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid hsl(270 100% 60% / 0.6)",
                boxShadow:
                  "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35)",
              }}
            >
              Enter The Arena
            </button>

            <button
              onClick={downloadQRCode}
              className="w-full py-3 rounded-xl font-exo-bold-italic text-lg tracking-wider text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(50, 200, 120, 0.25)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(50,200,120,0.6)",
                boxShadow:
                  "0 0 30px rgba(50,200,120,0.5), 0 0 60px rgba(50,200,120,0.35)",
              }}
            >
              Download QR Code
            </button>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-6 text-xs md:text-sm font-poppins tracking-wide">
          Show this pass at entry • Scan QR to verify
        </p>
      </div>
    </div>
  );
};

export default Pass;