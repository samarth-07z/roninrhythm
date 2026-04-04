import { useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import roninLogo from "@/assets/logo_ronin.png";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up">
      <div className="relative max-w-sm w-full">
        {/* The pass card */}
        <div
          ref={passRef}
          className="relative overflow-hidden rounded-2xl neon-glow"
          style={{
            background: "linear-gradient(160deg, hsl(270 60% 12%), hsl(280 80% 8%), hsl(270 100% 5%))",
            border: "2px solid hsl(270 100% 50% / 0.5)",
            padding: "2rem 1.5rem",
          }}
        >
          {/* Decorative overlays */}
          <div className="absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(circle at 30% 20%, hsl(270 100% 60% / 0.4), transparent 60%), radial-gradient(circle at 70% 80%, hsl(280 100% 60% / 0.3), transparent 50%)" }}
          />
          <div className="relative z-10 text-center pt-2">
            <img src={roninLogo} alt="Ronin Rhythm" className="w-48 mx-auto drop-shadow-[0_0_20px_hsl(270_100%_60%/0.5)]" />

            <div className="my-6">
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 60%), transparent)" }} />
            </div>

            <h3 className="text-2xl font-display font-bold tracking-widest text-chrome">
              ALL ACCESS<br />VIP PASS
            </h3>

            <div className="mt-6 space-y-1 text-sm font-body tracking-wider text-foreground/80">
              <p className="font-semibold text-base text-foreground">WORKSHOP +</p>
              <p className="font-semibold text-base text-foreground">RONIN RHYTHM BATTLE</p>
            </div>

            <div className="mt-6 space-y-2 text-left glass-panel rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-body">NAME</span>
                <span className="font-tech text-foreground">{name.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-body">ID</span>
                <span className="font-tech text-accent">{uniqueId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-body">EVENT</span>
                <span className="font-tech text-foreground">RONIN RHYTHM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-body">VENUE</span>
                <span className="font-tech text-foreground text-right text-xs">SRINIVAS INST. OF TECH</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="p-3 rounded-lg" style={{ background: "hsl(0 0% 100% / 0.95)" }}>
                <QRCodeSVG value={qrData} size={120} level="H" />
              </div>
            </div>

            <p className="mt-3 text-xs font-tech text-muted-foreground tracking-widest">
              SRINIVAS INSTITUTE OF TECHNOLOGY
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-3">
          <button onClick={downloadPass} className="flex-1 btn-neon rounded-lg py-3 font-tech text-sm tracking-wider text-primary-foreground">
            DOWNLOAD PASS
          </button>
          <button onClick={onClose} className="flex-1 glass-panel rounded-lg py-3 font-tech text-sm tracking-wider text-foreground hover:border-primary/50 transition-colors">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPass;
