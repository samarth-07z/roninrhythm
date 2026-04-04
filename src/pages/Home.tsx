import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import poster from "@/assets/poster.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Background poster image - very subtle */}
        <div className="absolute inset-0 opacity-10">
          <img src={poster} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Cosmic glow behind title */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, hsl(270 100% 60%), hsl(280 80% 30%) 40%, transparent 70%)" }} />

        <div className="relative z-10 animate-fade-in-up">
          <p className="text-sm tracking-[0.4em] font-tech mb-3" style={{ color: "hsl(200 100% 60%)" }}>浪人の律動</p>
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-wider text-chrome leading-[0.9]">
            RONIN<br />RHYTHM
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-display tracking-[0.3em] text-foreground/80" style={{ animationDelay: "0.2s" }}>
            The Dance Battle
          </p>

          <div className="mt-8 h-px w-48 mx-auto" style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 60%), transparent)" }} />

          <p className="mt-8 text-lg md:text-xl font-tech tracking-[0.15em] neon-text-glow text-accent" style={{ animation: "flicker 4s infinite" }}>
            ONE FLOOR. ONE RHYTHM. ONE WINNER.
          </p>

          {/* Event details */}
          <div className="mt-10 space-y-2">
            <p className="text-3xl md:text-4xl font-display font-bold tracking-widest text-chrome">
              16 APRIL 2026
            </p>
            <p className="text-sm font-tech tracking-[0.2em] text-foreground/70">
              SRINIVAS INSTITUTE OF TECHNOLOGY
            </p>
            <p className="text-xs font-tech tracking-[0.3em] text-muted-foreground">
              VALACHIL
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/register")}
            className="mt-12 btn-neon rounded-lg px-12 py-5 font-tech text-base tracking-[0.25em] text-primary-foreground uppercase"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            Prove Your Groove
          </button>

          {/* Bottom tags */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs font-tech tracking-[0.2em] text-muted-foreground">
            <div className="text-left">
              <p className="text-foreground/60">BATTLE</p>
              <p className="text-foreground/60">MUSIC</p>
              <p className="text-foreground/60">CULTURE</p>
            </div>
            <div>
              <p className="text-accent neon-text-glow">● REGISTRATION OPEN</p>
            </div>
            <div className="text-right">
              <p className="text-foreground/60">TIME</p>
              <p className="text-foreground/60">1:00 PM ONW.</p>
            </div>
          </div>

          <p className="mt-6 text-xs font-body text-muted-foreground tracking-wider">
            CONTACT: 7411249290
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
