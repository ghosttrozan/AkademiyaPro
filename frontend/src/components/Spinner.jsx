import React from "react";
import styled, { keyframes } from "styled-components";

// Spin animation for slow rotation
const spinSlow = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Spin animation for reverse rotation
const spinReverse = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

// Glow animation for inner circle
const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 8px rgba(255, 255, 0, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 0, 1);
  }
  100% {
    box-shadow: 0 0 8px rgba(255, 255, 0, 0.7);
  }
`;

// Main outer spinner
const AnimatedSpinner = styled.div`
  animation: ${spinSlow} 6s linear infinite;
  border: 8px solid transparent;
  border-top: 8px solid #009688; /* teal */
  border-bottom: 8px solid transparent;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: relative;
`;

// Reverse spinner for educational symbols
const ReverseSpinner = styled.div`
  animation: ${spinReverse} 6s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Inner pulsing circle with glowing effect
const PulsingCircle = styled.div`
  animation: ${glowPulse} 2s ease-in-out infinite;
  background-color: #ffeb3b; /* yellow */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// Educational symbols that rotate around the spinner
const Symbol = styled.div`
  background-color: #2196f3; /* blue */
  border-radius: 50%;
  width: 12px;
  height: 12px;
  position: absolute;
`;

const AdvancedEducationSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="relative">
        {/* Outer Spinning Circle */}
        <AnimatedSpinner>
          {/* Pulsing Inner Circle */}
          <PulsingCircle />

          {/* Bouncing Dot (representing dynamic energy) */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-12 h-12 rounded-full bg-white border-4 border-teal-400 relative">
              <div className="animate-bounce w-6 h-6 bg-teal-600 rounded-full absolute top-0 left-0 m-2"></div>
            </div>
          </div>
        </AnimatedSpinner>

        {/* Educational Symbols */}
        <ReverseSpinner>
          {/* Symbols positioned in the four corners */}
          <Symbol style={{ top: "10%", left: "10%" }} />
          <Symbol style={{ top: "10%", right: "10%" }} />
          <Symbol style={{ bottom: "10%", left: "10%" }} />
          <Symbol style={{ bottom: "10%", right: "10%" }} />
        </ReverseSpinner>
      </div>
    </div>
  );
};

export default AdvancedEducationSpinner;
