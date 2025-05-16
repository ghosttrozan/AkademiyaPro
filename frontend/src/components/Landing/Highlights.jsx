import { useEffect, useRef } from 'react';


export default function HighLights() {
  const partners = [
    {
      name: "Harvard University",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "Stanford University",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "MIT (Massachusetts Institute of Technology)",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "University of Oxford",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "IIT Delhi",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "National University of Singapore (NUS)",
      logo: "https://www.nus.edu.sg/images/default-source/base/logo.png",
    },
    {
      name: "University of Tokyo",
      logo: "https://www.nus.edu.sg/images/default-source/base/logo.png",
    },
    {
      name: "ETH Zurich",
      logo: "https://ethz.ch/etc/designs/ethz/img/header/ethz_logo_black.svg",
    },
    {
      name: "University of Cape Town",
      logo: "https://ethz.ch/etc/designs/ethz/img/header/ethz_logo_black.svg",
    },
    {
      name: "University of Sydney",
      logo: "https://ethz.ch/etc/designs/ethz/img/header/ethz_logo_black.svg",
    },
    // Duplicated for infinite scroll effect
    {
      name: "Harvard University",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "Stanford University",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "MIT (Massachusetts Institute of Technology)",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "University of Oxford",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "IIT Delhi",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "National University of Singapore (NUS)",
      logo: "https://www.nus.edu.sg/images/default-source/base/logo.png",
    },
    {
      name: "University of Tokyo",
      logo: "https://www.nus.edu.sg/images/default-source/base/logo.png",
    },
    {
      name: "ETH Zurich",
      logo: "https://ethz.ch/etc/designs/ethz/img/header/ethz_logo_black.svg",
    },
    {
      name: "University of Cape Town",
      logo: "https://ethz.ch/etc/designs/ethz/img/header/ethz_logo_black.svg",
    },
    {
      name: "University of Sydney",
      logo: "https://ethz.ch/etc/designs/ethz/img/header/ethz_logo_black.svg",
    },
  ];

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let animationFrameId;
    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Adjust speed here

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-black py-8 md:py-12 overflow-hidden relative">
      {/* Section title */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-8">
        Trusted by Leading Institutions Worldwide
      </h2>
      
      {/* Gradient fade effects */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      {/* Scrolling partners */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center h-[100px] md:h-[120px] overflow-hidden"
      >
        {partners.map((item, index) => (
          <div
            key={`${item.logo}-${index}`}
            className="inline-flex items-center justify-center mx-4 md:mx-6 bg-white rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
            style={{
              width: "80px",
              height: "80px",
              flexShrink: 0,
            }}
          >
            <img
              src={item.logo}
              alt={item.name}
              className="object-contain w-full h-full"
              loading="lazy"
              onError={(e) => {
                // e.currentTarget.src = 'https://via.placeholder.com/80?text=Logo';
              }}
            />
          </div>
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .hover\:pulse:hover {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
}