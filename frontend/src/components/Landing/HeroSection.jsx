import { useEffect, useRef } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaStar } from "react-icons/fa6";
import heroImage from "../../assets/images/hero-dark-bg.webp";
import heroVideo from "../../assets/videos/product-video-x2.mp4"
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animation for text content
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        textRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    // Animation for video
    if (videoRef.current) {
      videoRef.current.style.opacity = '0';
      videoRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        videoRef.current.style.transition = 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s';
        videoRef.current.style.opacity = '1';
        videoRef.current.style.transform = 'scale(1)';
      }, 100);
    }
  }, []);

  return (
    <div className="relative bg-black w-full lg:h-[600px] md:h-[500px] h-[700px] overflow-hidden">
      {/* Background Image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col md:flex-row justify-center gap-8 md:gap-14 px-4 sm:px-8 md:px-12 lg:px-20 items-center text-white">
        {/* Text Content */}
        <div 
          ref={textRef}
          className="flex flex-col gap-4 md:gap-6 text-center md:text-left max-w-[600px]"
          style={{ opacity: 0 }}
        >
          <div className="flex justify-center md:justify-start items-center flex-wrap">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold animate-pulse-slow">Akademiya</h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#07ACFF] animate-text-gradient bg-gradient-to-r from-[#07ACFF] to-[#00D1FF] bg-clip-text">
              Pro
            </h2>
          </div>
          
          <p className="text-xl sm:text-2xl md:text-3xl leading-tight">
            <span className="text-[#07ACFF] font-medium">Google EDLA Certified</span>{" "}
            AI-Powered <br className="hidden sm:block" />
            Connected School Management Software
          </p>
          
          <p className="text-sm sm:text-base text-white/80">
            Transform teaching and learning with our all-in-one Interactive{" "}
            <br className="hidden sm:block" />
            Software, which leverages AI & Cloud.
          </p>
          
          <div className="flex justify-center md:justify-start gap-2 items-center">
            <FcGoogle className="text-2xl sm:text-3xl md:text-4xl animate-bounce-slow" />
            <p className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className="text-yellow-400 text-sm sm:text-base animate-spin-slow"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </p>
            <h1 className="text-sm sm:text-base md:text-lg font-medium">5/5</h1>
          </div>
          
          <div className="flex justify-center md:justify-start mt-2">
            <button 
              className="relative px-8 py-3 bg-gradient-to-r from-[#07ACFF] to-[#00D1FF] text-white font-medium rounded-lg overflow-hidden group"
              onClick={() => console.log('Get Started clicked')}
            >
              <Link to={'/signup'}><span className="relative z-10">GET STARTED</span></Link>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00D1FF] to-[#07ACFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 border-2 border-[#07ACFF] rounded-lg scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></span>
            </button>
          </div>
        </div>

        {/* Video */}
        <div 
          ref={videoRef}
          className="w-full md:w-auto px-4 sm:px-0"
          style={{ opacity: 0 }}
        >
          <div className="relative h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full overflow-hidden rounded-xl shadow-2xl shadow-[#07ACFF]/30 hover:shadow-[#07ACFF]/50 transition-shadow duration-300">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source 
                src={heroVideo}
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Custom animations in global CSS */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        .animate-text-gradient {
          background-size: 200% auto;
          animation: text-gradient 3s linear infinite;
        }
        @keyframes text-gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}