import { useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import roninLogo from "@/assets/logo_ronin.png";
import ParticleBackground from "./ParticleBackground";

interface EventPassProps {
  name: string;
  uniqueId: string;
  onClose: () => void;
}

const EventPass = ({ name, uniqueId, onClose }: EventPassProps) => {
  const passRef = useRef<HTMLDivElement>(null);

  const qrData = JSON.stringify({
    name,
    id: uniqueId,
    event: "Ronin Rhythm",
  });

  const downloadPass = useCallback(async () => {
    if (!passRef.current) return;
    try {
      const dataUrl = await toPng(passRef.current, { pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `${uniqueId}_pass.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate pass image", err);
    }
  }, [uniqueId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(0 0% 8%), hsl(270 80% 15%), hsl(0 0% 12%))" }}>
      <ParticleBackground />
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, hsl(270 100% 60% / 0.15), transparent 70%)" }} />
      <div className="relative w-full max-w-sm rounded-2xl animate-fade-in-up z-10">
        <div
          ref={passRef}
          className="glass-panel rounded-2xl p-6 space-y-3"
        >
          <div className="text-center">
            <img src={roninLogo} alt="Ronin Rhythm" className="w-40 mx-auto mb-2 drop-shadow-[0_0_30px_hsl(270_100%_60%/0.5)]" />
            <h3 className="text-lg font-exo tracking-wide text-chrome">RHYTHM PASS</h3>
            <p className="text-[10px] font-exo tracking-wide text-muted-foreground">RONIN RHYTHM BATTLE</p>
          </div>

          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 60%), transparent)" }} />

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-poppins">NAME</span>
              <span className="font-exo text-foreground">{name.toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-poppins">ID</span>
              <span className="font-exo text-accent text-[11px]">{uniqueId}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-poppins">EVENT</span>
              <span className="font-exo text-foreground">RONIN RHYTHM</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-poppins">VENUE</span>
              <span className="font-exo text-foreground text-right text-[10px]">SRINIVAS INST.</span>
            </div>
          </div>

          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 60%), transparent)" }} />

          <div className="flex justify-center py-1">
            <div className="p-2 rounded-lg" style={{ background: "hsl(0 0% 100% / 0.95)" }}>
              <QRCodeSVG value={qrData} size={90} level="H" />
            </div>
          </div>

          <p className="text-[10px] font-poppins text-muted-foreground tracking-wide text-center">SCAN TO VERIFY</p>

          <div className="flex gap-2 pt-1">
            <button 
              onClick={downloadPass} 
              className="flex-1 py-2 font-exo text-[10px] tracking-wider text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(180, 80, 255, 0.25)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid hsl(270 100% 60% / 0.6)",
                boxShadow: "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 50px hsl(270 100% 60% / 0.7), 0 0 100px hsl(270 100% 60% / 0.4), inset 0 0 40px hsl(270 100% 80% / 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px hsl(270 100% 60% / 0.5), 0 0 60px hsl(270 100% 60% / 0.35), inset 0 0 30px hsl(270 100% 80% / 0.15)";
              }}
            >
              DOWNLOAD
            </button>
            <button 
              onClick={onClose} 
              className="flex-1 py-2 font-exo text-[10px] tracking-wider text-foreground rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(150, 100, 200, 0.15)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid hsl(270 100% 60% / 0.4)",
                boxShadow: "0 0 20px hsl(270 100% 60% / 0.3), inset 0 0 20px hsl(270 100% 80% / 0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px hsl(270 100% 60% / 0.5), inset 0 0 30px hsl(270 100% 80% / 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px hsl(270 100% 60% / 0.3), inset 0 0 20px hsl(270 100% 80% / 0.1)";
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPass;
