import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import ParticleBackground from "@/components/ParticleBackground";
import roninLogo from "@/assets/logo_ronin.png";
import { getUser } from "@/lib/userService";
import { generateQRCodeData } from "@/lib/qrCodeUtils";

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

// Picks a stable avatar based on user ID — same user always gets same avatar
const getAvatarForUser = (userId: string): string => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatars.length;
  return avatars[index];
};

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
  const qrRef = useRef<HTMLDivElement>(null);

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
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas || !userData) return;

    const padding = 20;
    const labelHeight = 30;
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width + padding * 2;
    newCanvas.height = canvas.height + padding * 2 + labelHeight;

    const ctx = newCanvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
    ctx.drawImage(canvas, padding, padding);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText(userData.id, newCanvas.width / 2, canvas.height + padding + labelHeight - 8);

    const url = newCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${userData.id}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="text-white text-xl font-exo">
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
          <p className="text-red-400 text-lg mb-4 font-exo">
            {error || "User data not available"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white tracking-wider font-exo"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const exoFont = { fontFamily: "'Exo', sans-serif", fontWeight: 800, fontStyle: "italic" as const };
  const avatarSrc = getAvatarForUser(userData.id);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      <ParticleBackground />

      {/* Glow Background */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 60%), transparent 70%)",
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
          <h1
            className="text-2xl md:text-3xl text-chrome neon-text-glow mt-4 tracking-wider"
            style={exoFont}
          >
            RHYTHM PASS
          </h1>
        </div>

        {/* Pass Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 max-w-md mx-auto neon-glow">

          {/* User */}
          <div className="text-center">
            <img
              src={avatarSrc}
              alt={userData.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 border-2 border-purple-500/50 neon-glow object-cover"
            />
            <h2
              className="text-lg md:text-xl text-chrome tracking-wide"
              style={exoFont}
            >
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
            <p
              className="text-xl md:text-2xl text-accent tracking-wider"
              style={exoFont}
            >
              {userData.id}
            </p>
          </div>

          {/* QR */}
          <div className="flex justify-center">
            <div
              ref={qrRef}
              style={{
                background: "#ffffff",
                padding: "12px",
                borderRadius: "12px",
                display: "inline-block",
                lineHeight: 0,
              }}
            >
              <QRCodeCanvas
                value={generateQRCodeData(
                  userData.id,
                  userData.name,
                  userData.email,
                  userData.phone
                )}
                size={160}
                level="H"
                bgColor="#ffffff"
                fgColor="#000000"
                style={{ display: "block" }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="text-foreground space-y-2 font-poppins text-sm">
            <p>
              <span className="text-accent" style={exoFont}>Dance:</span>{" "}
              {userData.danceStyle}
            </p>
            <p>
              <span className="text-accent" style={exoFont}>Phone:</span>{" "}
              {userData.phone}
            </p>
            <p className="text-purple-400 text-xs tracking-wider" style={exoFont}>
              {userData.perks}
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/home")}
              className="w-full py-3 rounded-xl text-lg tracking-wider text-white transition-all duration-300 hover:scale-105"
              style={{
                ...exoFont,
                background: "rgba(180, 80, 255, 0.25)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid hsl(270 100% 60% / 0.6)",
                boxShadow: "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35)",
              }}
            >
              Enter The Arena
            </button>

            <button
              onClick={downloadQRCode}
              className="w-full py-3 rounded-xl text-lg tracking-wider text-white transition-all duration-300 hover:scale-105"
              style={{
                ...exoFont,
                background: "rgba(50, 200, 120, 0.25)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(50,200,120,0.6)",
                boxShadow: "0 0 30px rgba(50,200,120,0.5), 0 0 60px rgba(50,200,120,0.35)",
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