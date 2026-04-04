import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // ✅ FIXED IMPORT
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
        <div className="text-white font-exo text-xl">Loading your pass...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <p className="text-red-400 font-exo text-lg mb-4">
            {error || "User data not available"}
          </p>
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

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 60%), transparent 70%)"
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
          <h1 className="text-3xl font-exo text-white mt-4">YOUR EVENT PASS</h1>
        </div>

        {/* Pass Card */}
        <div className="rounded-3xl p-8 space-y-6 max-w-md mx-auto bg-black/40 border border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)]">

          {/* User */}
          <div className="text-center">
            <img
              src={userData.picture}
              alt={userData.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-500"
            />
            <h2 className="text-xl text-white">{userData.name}</h2>
            <p className="text-sm text-gray-400">{userData.email}</p>
          </div>

          {/* ID */}
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">UNIQUE ID</p>
            <p className="text-2xl text-purple-400 font-bold">
              {userData.id}
            </p>
          </div>

          {/* ✅ FIXED QR CODE */}
          <div className="flex justify-center">
            <div className="p-3 bg-white rounded-lg">
              <QRCodeCanvas
                value={generateQRCodeData(
                  userData.id,
                  userData.name,
                  userData.email,
                  userData.phone
                )}
                size={180}
                level="H"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>

          {/* Details */}
          <div className="text-white space-y-2">
            <p><strong>Dance:</strong> {userData.danceStyle}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p className="text-purple-400">{userData.perks}</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/home")}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
            >
              Enter The Arena
            </button>

            <button
              onClick={downloadQRCode}
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
            >
              Download QR Code
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Show this pass at entry
        </p>
      </div>
    </div>
  );
};

export default Pass;