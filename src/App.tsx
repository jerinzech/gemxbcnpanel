import React from 'react';
import './App.css';

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
    imageUrl: '/public/AgatheTavernier.png'
  },
  {
    role: 'Benjamin Costes',
    jobTitle: 'Enterprise Account Executive',
    company: 'Confluent',
    imageUrl: '/public/BenjaminCostes.png'
  },
  {
    role: 'Jennifer Cabasson',
    jobTitle: 'Responsable Acquisition & CRM',
    company: 'JULES & JENN',
    imageUrl: '/public/JenniferCabasson.png'
  },
  {
    role: 'Marion Escaffre',
    jobTitle: 'Head of Partnerships',
    company: 'Shopify',
    imageUrl: '/public/MarionEscaffre.png'
  },

  {
    role: 'Romain Gatt',
    jobTitle: 'Managing Partner, Entrepreneur ',
    company: 'SILERON',
    imageUrl: '/public/RomainGatt.png'
  },

];

const hostSpeaker: SpeakerProps = {
  role: 'Assil El Kharsa',
  jobTitle: 'Student & Enterpreneur',
  company: 'GEM',
  imageUrl: 'public/AssilElKharsa.png'
};

export const App: React.FC = () => {
  return (
    <div className="panel-container animated-gradient">
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