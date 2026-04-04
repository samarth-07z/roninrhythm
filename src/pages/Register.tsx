import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import EventPass from "@/components/EventPass";
import roninLogo from "@/assets/logo_ronin.png";
import { saveRegistration } from "@/lib/userService";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", danceStyle: "" });
  const [passData, setPassData] = useState<{ name: string; uniqueId: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Load user data from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email) {
      setError("Email is required. Please log in again.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Save registration to Firebase
      await saveRegistration(form.email, {
        phone: form.phone,
        danceStyle: form.danceStyle,
      });

      // Update localStorage
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.phone = form.phone;
        user.danceStyle = form.danceStyle;
        localStorage.setItem("user", JSON.stringify(user));
        setPassData({ name: user.name, uniqueId: user.id });
      }

      console.log("Registration saved successfully");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("Failed to save registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { key: "name", label: "FULL NAME", type: "text", placeholder: "your warrior name", disabled: true },
    { key: "email", label: "EMAIL", type: "email", placeholder: "your@email.com", disabled: true },
    { key: "phone", label: "PHONE NUMBER", type: "tel", placeholder: "+91 XXXXXXXXXX", disabled: false },
    { key: "danceStyle", label: "DANCE STYLE", type: "text", placeholder: "hip-hop, breaking, freestyle...", disabled: false },
  ] as const;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      <ParticleBackground />

      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-15 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(280 100% 60%), transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in-up">
        <div className="text-center mb-8">
          <img src={roninLogo} alt="Ronin Rhythm - The Dance Battle" className="w-64 md:w-80 mx-auto mb-4 drop-shadow-[0_0_30px_hsl(270_100%_60%/0.5)]" />
          <h2 className="text-2xl font-exo tracking-wide text-chrome">ARENA ENTRY</h2>
          <p className="mt-2 text-sm font-exo tracking-wide text-muted-foreground">REGISTRATION FORM</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 space-y-5">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-exo tracking-wide text-muted-foreground mb-2">{f.label}</label>
              <input
                type={f.type}
                required={!f.disabled}
                disabled={f.disabled}
                value={form[f.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full input-neon rounded-lg px-4 py-3 text-foreground font-body tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={f.placeholder}
              />
            </div>
          ))}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 font-exo text-base tracking-wider text-primary-foreground uppercase mt-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "rgba(180, 80, 255, 0.25)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid hsl(270 100% 60% / 0.6)",
              boxShadow: "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)"
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.boxShadow = "0 0 50px hsl(270 100% 60% / 0.7), 0 0 100px hsl(270 100% 60% / 0.4), inset 0 0 40px hsl(270 100% 80% / 0.2), 0 20px 60px hsl(270 100% 60% / 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15), 0 15px 45px hsl(270 100% 60% / 0.25)";
            }}
          >
            {isLoading ? "Saving..." : "Lock Your Spot"}
          </button>
        </form>
      </div>

      {passData && (
        <EventPass name={passData.name} uniqueId={passData.uniqueId} onClose={() => setPassData(null)} />
      )}
    </div>
  );
};

export default Register;
