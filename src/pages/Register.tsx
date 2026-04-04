import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import EventPass from "@/components/EventPass";

const getNextId = (): string => {
  const stored = localStorage.getItem("ronin_counter");
  const next = stored ? parseInt(stored, 10) + 1 : 1;
  localStorage.setItem("ronin_counter", String(next));
  return `RONINRHYTHM${String(next).padStart(3, "0")}`;
};

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", danceStyle: "" });
  const [passData, setPassData] = useState<{ name: string; uniqueId: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueId = getNextId();

    const registrations = JSON.parse(localStorage.getItem("ronin_registrations") || "[]");
    registrations.push({ ...form, uniqueId, registeredAt: new Date().toISOString() });
    localStorage.setItem("ronin_registrations", JSON.stringify(registrations));

    setPassData({ name: form.name, uniqueId });
  };

  const fields = [
    { key: "name", label: "FULL NAME", type: "text", placeholder: "your warrior name" },
    { key: "email", label: "EMAIL", type: "email", placeholder: "your@email.com" },
    { key: "phone", label: "PHONE NUMBER", type: "tel", placeholder: "+91 XXXXXXXXXX" },
    { key: "danceStyle", label: "DANCE STYLE", type: "text", placeholder: "hip-hop, breaking, freestyle..." },
  ] as const;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      <ParticleBackground />

      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-15 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(280 100% 60%), transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in-up">
        <div className="text-center mb-8">
          <p className="text-sm tracking-[0.3em] font-tech mb-2" style={{ color: "hsl(200 100% 60%)" }}>浪人の律動</p>
          <h1 className="text-4xl font-display font-black tracking-wider text-chrome">
            ARENA ENTRY
          </h1>
          <p className="mt-2 text-sm font-tech tracking-widest text-muted-foreground">REGISTRATION FORM</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 space-y-5">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-tech tracking-wider text-muted-foreground mb-2">{f.label}</label>
              <input
                type={f.type}
                required
                value={form[f.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full input-neon rounded-lg px-4 py-3 text-foreground font-body tracking-wide"
                placeholder={f.placeholder}
              />
            </div>
          ))}

          <button type="submit" className="w-full btn-neon rounded-lg py-4 font-tech text-sm tracking-[0.2em] text-primary-foreground uppercase mt-2">
            Lock Your Spot
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
