import React, { useEffect, useRef } from 'react';
import './App.css';

import agatheTavernier from '/AgatheTavernier.png';
import benjaminCostes from '/BenjaminCostes.png';
import jenniferCabasson from '/JenniferCabasson.png';
import marionEscaffre from '/MarionEscaffre.png';
import romainGatt from '/RomainGatt.png';
// import assilElKharsa from '/AssilElKharsa.png';

// 1. Add imageUrl to your interface
interface SpeakerProps {
  role: string;
  jobTitle: string;
  company: string;
  imageUrl: string; // <-- ADD THIS
}

// 2. Add sample image URLs to your dummy data
const guestSpeakers: SpeakerProps[] = [
  {
    role: 'Agathe Tavernier',
    jobTitle: 'Head of People - Spain',
    company: 'Skello',
    imageUrl: agatheTavernier
  },
  {
    role: 'Benjamin Costes',
    jobTitle: 'Enterprise Account Executive',
    company: 'Confluent',
    imageUrl: benjaminCostes
  },
  {
    role: 'Jennifer Cabasson',
    jobTitle: 'Responsable Acquisition & CRM',
    company: 'JULES & JENN',
    imageUrl: jenniferCabasson
  },
  {
    role: 'Marion Escaffre',
    jobTitle: 'Head of Partnerships',
    company: 'Shopify',
    imageUrl: marionEscaffre
  },

  {
    role: 'Romain Gatt',
    jobTitle: 'Managing Partner, Entrepreneur ',
    company: 'SILERON',
    imageUrl: romainGatt
  },

];

const hostSpeaker: SpeakerProps = {
  role: 'Assil El Kharsa',
  jobTitle: 'Student & Enterpreneur',
  company: 'GEM',
  imageUrl: " /AssilElKharsa.png"
};

export const App: React.FC = () => {
  const dotsRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dc = dotsRef.current!;
    const nc = noiseRef.current!;
    const dctx = dc.getContext('2d')!;
    const nctx = nc.getContext('2d')!;

    // const SPACING = 28, BASE_R = 1.8, MAX_R = 5.5;
    const SPACING = 15;   // ← decrease to increase count (try 18)
    const BASE_R = 1;  // ← decrease for smaller dots (try 1.0)
    const MAX_R = 3.2;  // ← decrease for smaller dots (try 3.2)
    const COLORS: [number, number, number][] = [
      [212, 175, 55], [240, 210, 100], [200, 158, 40], [255, 248, 220], [255, 255, 255]
    ];
    const TILE = 300;
    const tile = document.createElement('canvas');
    tile.width = tile.height = TILE;
    const tctx = tile.getContext('2d')!;

    let cols = 0, rows = 0, t = 0, frameCount = 0;
    let rafId: number;

    function resize() {
      dc.width = nc.width = window.innerWidth;
      dc.height = nc.height = window.innerHeight;
      cols = Math.ceil(dc.width / SPACING) + 2;
      rows = Math.ceil(dc.height / SPACING) + 2;
    }
    resize();
    window.addEventListener('resize', resize);

    function buildNoiseTile() {
      const img = tctx.createImageData(TILE, TILE);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = 255;
      }
      tctx.putImageData(img, 0, 0);
    }

    function drawNoise() {
      const w = nc.width, h = nc.height;
      nctx.clearRect(0, 0, w, h);
      for (let y = 0; y < h; y += TILE)
        for (let x = 0; x < w; x += TILE)
          nctx.drawImage(tile, x, y);
    }

    function loop() {
      const w = dc.width, h = dc.height;
      // t += 0.012;
      t += 0.025;
      dctx.fillStyle = '#faf8f2';
      dctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING, y = row * SPACING;
          const wave =
            Math.sin(col * 0.35 + t * 1.1) * 0.5 +
            Math.sin(row * 0.28 + t * 0.8) * 0.5 +
            Math.sin((col + row) * 0.20 + t * 1.4) * 0.35 +
            Math.sin((col - row) * 0.18 + t * 0.6) * 0.25;
          const norm = (wave + 1.6) / 3.2;
          const r = BASE_R + norm * (MAX_R - BASE_R);
          const dx = (x - cx) / (w * 0.5), dy = (y - cy) / (h * 0.5);
          const fade = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) * 0.6);
          const ci = Math.floor(norm * (COLORS.length - 1));
          const cf = norm * (COLORS.length - 1) - ci;
          const c0 = COLORS[Math.min(ci, COLORS.length - 1)];
          const c1 = COLORS[Math.min(ci + 1, COLORS.length - 1)];
          const cr = c0[0] + (c1[0] - c0[0]) * cf;
          const cg = c0[1] + (c1[1] - c0[1]) * cf;
          const cb = c0[2] + (c1[2] - c0[2]) * cf;
          const alpha = (0.15 + norm * 0.55) * fade;
          dctx.beginPath();
          dctx.arc(x, y, r * fade, 0, Math.PI * 2);
          dctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha.toFixed(3)})`;
          dctx.fill();
        }
      }
      if (frameCount % 2 === 0) { buildNoiseTile(); drawNoise(); }
      frameCount++;
      rafId = requestAnimationFrame(loop);
    }

    buildNoiseTile(); drawNoise(); loop();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="panel-container">
      {/* Background canvases */}
      <canvas ref={dotsRef} className="bg-canvas" />
      <canvas ref={noiseRef} className="bg-canvas bg-noise" />
      <div className="bg-vignette" />

      {/* Live Indicator (Top Right) */}
      <div className="live-indicator">
        <span className="red-dot"></span> LIVE
      </div>

      {/* Top Welcome Section (Animated Wave) */}
      <div className="welcome-container">
        {["BENVINGUTS A", "WELCOME TO", "BIENVENIDOS A"].map((phrase, phraseIndex) => (
          <div key={phraseIndex} className="welcome-phrase">
            {phrase.split('').map((char, charIndex) => {
              const delay = (phraseIndex * 3) + (charIndex * 0.05);
              return (
                <span
                  key={charIndex}
                  className="wave-letter"
                  style={{ animationDelay: `${delay}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Main Title */}
      <h1 className="main-title font-syne">GEM <span className='xshouldbesmall'>x</span> BCN</h1>

      {/* Subtitle / Theme */}
      <div className="theme-row">
        <span>CONVERSATION</span>
        <span className="dot">•</span>
        <span>COLLABORATION</span>
        <span className="dot">•</span>
        <span>COMMUNITY</span>
      </div>

      {/* Intro Paragraph */}
      <p className="intro-text">
        We are thrilled to welcome you to today's panel - a space for{' '}
        <span className="bold-italic">bold ideas, open dialogue & authentic connection</span>
      </p>

      {/* Speakers Section */}
      <div className="speakers-section">
        <h2 className="speakers-title">TODAY'S SPEAKERS</h2>

        <div className="speakers-layout">
          {/* Guests */}
          <div className="guests-container">
            {guestSpeakers.map((speaker, index) => (
              <SpeakerCard key={index} {...speaker} />
            ))}
          </div>

          {/* Hosted By Divider */}
          <div className="hosted-by">
            <span>hosted by</span>
          </div>

          {/* Host */}
          <div className="host-container">
            <SpeakerCard {...hostSpeaker} />
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <img
        src="gemnewlogo2.png"
        alt="Panel Logo"
        className="footer-image"
      />

      {/* Auto-scrolling Ticker (Bottom) */}
      <div className="ticker-wrap">
        <div className="ticker-content">
          {/* Repeating the content so the scroll is seamless */}
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
          <span>#WeAreGEM</span><span>#WeAreGEM</span><span>#WeAreGEM</span>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-component for the Speaker Avatars
const SpeakerCard: React.FC<SpeakerProps> = ({ role, jobTitle, company, imageUrl }) => (
  <div className="speaker-card">
    {/* Replaced the empty div with an img tag */}
    <img src={imageUrl} alt={role} className="speaker-avatar" />

    <div className="speaker-info">
      <p className="speaker-name">{role}</p>
      <p className="speaker-title">{jobTitle}</p>
      <p className="speaker-company">{company}</p>
    </div>
  </div>
);