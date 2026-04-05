import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
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

const getAvatarForUser = (userId: string): string => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatars[Math.abs(hash) % avatars.length];
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const passCardRef = useRef<HTMLDivElement>(null);

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

  const downloadPass = async () => {
    if (!passCardRef.current || !userData) return;

    try {
      setIsDownloading(true);

      const card = passCardRef.current;

      // Temporarily fix the card to an explicit pixel width so
      // html-to-image captures every pixel (no percentage / flex overflow).
      const originalStyle = card.getAttribute("style") || "";
      const captureWidth = 480; // px — wide enough for all content

      card.style.width = `${captureWidth}px`;
      card.style.minWidth = `${captureWidth}px`;
      card.style.maxWidth = `${captureWidth}px`;

      // Let the browser reflow so scrollHeight is accurate
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      const captureHeight = card.scrollHeight;

      const dataUrl = await toPng(card, {
        pixelRatio: 3,
        backgroundColor: "#0a0014",
        width: captureWidth,
        height: captureHeight,
        style: {
          borderRadius: "24px",
          width: `${captureWidth}px`,
          height: `${captureHeight}px`,
          overflow: "visible",
        },
      });

      // Restore original style
      card.setAttribute("style", originalStyle);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${userData.id}-pass.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download pass:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="text-white text-xl font-exo">Loading your pass...</div>
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
        style={{ background: "radial-gradient(circle, hsl(270 100% 60%), transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-2xl px-4">
        {/* Page Header — not captured in download */}
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

        {/* ===== PASS CARD — everything inside here gets downloaded ===== */}
        <div
          ref={passCardRef}
          className="rounded-3xl p-6 md:p-8 space-y-5 mx-auto"
          style={{
            width: "100%",
            maxWidth: "480px",
            boxSizing: "border-box",
            background: "linear-gradient(135deg, hsl(270 80% 8% / 0.98), hsl(280 60% 12% / 0.98))",
            border: "1px solid hsl(270 60% 30% / 0.6)",
            boxShadow: "0 0 30px hsl(270 100% 60% / 0.15), inset 0 0 30px hsl(270 100% 60% / 0.05)",
          }}
        >
          {/* Logo inside card */}
          <div className="text-center">
            <img src={roninLogo} alt="Ronin Rhythm" className="w-36 mx-auto" />
          </div>

          {/* Top divider */}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 60%), transparent)" }}
          />

          {/* Avatar + Name */}
          <div className="text-center">
            <img
              src={avatarSrc}
              alt={userData.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 border-2 border-purple-500/50 object-cover"
              style={{ boxShadow: "0 0 15px hsl(270 100% 60% / 0.5)" }}
            />
            <h2
              className="text-lg md:text-xl tracking-wide"
              style={{
                ...exoFont,
                background: "linear-gradient(180deg, hsl(0 0% 90%), hsl(0 0% 60%), hsl(0 0% 85%), hsl(0 0% 50%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {userData.name.toUpperCase()}
            </h2>
            <p className="text-xs text-purple-300/70 font-poppins mt-1">
              {userData.email}
            </p>
          </div>

          {/* Unique ID */}
          <div className="text-center">
            <p className="text-xs text-purple-300/60 mb-1 font-poppins tracking-widest">
              UNIQUE ID
            </p>
            <p
              className="text-xl md:text-2xl tracking-wider"
              style={{ ...exoFont, color: "hsl(270 100% 70%)" }}
            >
              {userData.id}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div
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

          {/* Bottom divider */}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 60%), transparent)" }}
          />

          {/* Details */}
          <div className="space-y-2 text-sm font-poppins">
            <p style={{ color: "hsl(270 30% 85%)" }}>
              <span style={{ ...exoFont, color: "hsl(270 100% 70%)" }}>Dance: </span>
              {userData.danceStyle}
            </p>
            <p style={{ color: "hsl(270 30% 85%)" }}>
              <span style={{ ...exoFont, color: "hsl(270 100% 70%)" }}>Phone: </span>
              {userData.phone}
            </p>
            <p className="text-xs tracking-wider" style={{ ...exoFont, color: "hsl(270 80% 70%)" }}>
              {userData.perks}
            </p>
          </div>

          {/* Card footer */}
          <p className="text-center text-xs font-poppins tracking-wide" style={{ color: "hsl(270 20% 55%)" }}>
            Show this pass at entry • Scan QR to verify
          </p>
        </div>
        {/* ===== END PASS CARD ===== */}

        {/* Buttons — outside card, not captured in download */}
        <div className="space-y-3 max-w-md mx-auto mt-6">
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
            onClick={downloadPass}
            disabled={isDownloading}
            className="w-full py-3 rounded-xl text-lg tracking-wider text-white transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              ...exoFont,
              background: "rgba(50, 200, 120, 0.25)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(50,200,120,0.6)",
              boxShadow: "0 0 30px rgba(50,200,120,0.5), 0 0 60px rgba(50,200,120,0.35)",
            }}
          >
            {isDownloading ? "Generating..." : "Download Pass"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pass;