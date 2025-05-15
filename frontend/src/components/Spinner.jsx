import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
const spinSlow = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinReverse = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
`;

const glowPulse = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 8px #ffeb3b);
    opacity: 0.8;
  }
  50% { 
    filter: drop-shadow(0 0 20px #ffeb3b);
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const particleFlow = keyframes`
  0% { 
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 1;
  }
  100% { 
    transform: translate(-50%, -50%) rotate(360deg) scale(2);
    opacity: 0;
  }
`;

// Styled Components
const QuantumSpinner = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const MainOrbit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #2196f3;
  border-bottom-color: #2196f3;
  animation: ${spinSlow} 8s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-left-color: #e91e63;
    border-right-color: #e91e63;
    animation: ${spinReverse} 6s linear infinite;
  }
`;

const Core = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #ffeb3b, #ff5722);
  border-radius: 50%;
  animation: ${glowPulse} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    background: linear-gradient(45deg, transparent, #ffeb3b, transparent);
    border-radius: 50%;
    animation: ${spinReverse} 4s linear infinite;
  }
`;

const Particle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: ${particleFlow} ${props => props.duration || '3s'} linear infinite;
`;

const FloatingSymbol = styled.div`
  position: absolute;
  font-size: 24px;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0.8;
`;

const AdvancedEducationSpinner = () => {
  return (
    <QuantumSpinner>
      {/* Main Orbital System */}
      <MainOrbit>
        {/* Particle Effects */}
        {[...Array(12)].map((_, i) => (
          <Particle
            key={i}
            color={`hsl(${i * 30}, 80%, 60%)`}
            style={{
              left: `${Math.cos((i * 30 * Math.PI) / 180) * 90 + 50}%`,
              top: `${Math.sin((i * 30 * Math.PI) / 180) * 90 + 50}%`,
            }}
            duration={`${3 + i * 0.2}s`}
          />
        ))}
      </MainOrbit>

      {/* Floating Educational Symbols */}
      <FloatingSymbol style={{ top: '10%', left: '20%' }} delay="0.2s">📚</FloatingSymbol>
      <FloatingSymbol style={{ top: '20%', right: '10%' }} delay="0.4s">⚛️</FloatingSymbol>
      <FloatingSymbol style={{ bottom: '15%', left: '15%' }} delay="0.6s">🔬</FloatingSymbol>
      <FloatingSymbol style={{ bottom: '10%', right: '20%' }} delay="0.8s">💡</FloatingSymbol>

      {/* Quantum Core */}
      <Core>
        {/* Inner Dynamics */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full opacity-20 animate-ping"></div>
        </div>
      </Core>

      {/* Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-3/4 border-2 border-purple-500/30 rounded-full animate-pulse"></div>
      </div>
    </QuantumSpinner>
  );
};

export default AdvancedEducationSpinner;