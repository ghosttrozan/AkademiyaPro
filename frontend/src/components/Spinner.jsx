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
    filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.8));
    opacity: 0.8;
  }
  50% { 
    filter: drop-shadow(0 0 20px rgba(100, 255, 218, 0.9));
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
  border-top-color: rgba(100, 255, 218, 0.7);
  border-bottom-color: rgba(100, 255, 218, 0.7);
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
    border-left-color: rgba(155, 89, 255, 0.7);
    border-right-color: rgba(155, 89, 255, 0.7);
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
  background: linear-gradient(45deg, #121212, #1e1e1e);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.5);
  animation: ${glowPulse} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    background: linear-gradient(45deg, transparent, rgba(100, 255, 218, 0.3), transparent);
    border-radius: 50%;
    animation: ${spinReverse} 4s linear infinite;
  }
`;

const Particle = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: ${props => props.color};
  border-radius: 50%;
  box-shadow: 0 0 10px ${props => props.color};
  animation: ${particleFlow} ${props => props.duration || '3s'} linear infinite;
`;

const FloatingSymbol = styled.div`
  position: absolute;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.7);
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0.8;
`;

const DarkSpinnerContainer = styled.div`
  background: #0a0a0a;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrbitalRing = styled.div`
  position: absolute;
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  animation: pulse 4s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.75); }
    50% { opacity: 0.1; transform: scale(1); }
  }
`;

const AdvancedEducationSpinner = () => {
  const particleColors = [
    'rgba(100, 255, 218, 0.8)',
    'rgba(155, 89, 255, 0.8)',
    'rgba(255, 107, 107, 0.8)',
    'rgba(255, 230, 109, 0.8)'
  ];

  return (
    <DarkSpinnerContainer>
      <QuantumSpinner>
        {/* Main Orbital System */}
        <MainOrbit>
          {/* Particle Effects */}
          {[...Array(16)].map((_, i) => (
            <Particle
              key={i}
              color={particleColors[i % particleColors.length]}
              style={{
                left: `${Math.cos((i * 22.5 * Math.PI) / 180) * 90 + 50}%`,
                top: `${Math.sin((i * 22.5 * Math.PI) / 180) * 90 + 50}%`,
              }}
              duration={`${3 + i * 0.1}s`}
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
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: 'rgba(100, 255, 218, 0.3)',
              borderRadius: '50%',
              animation: 'ping 1.5s ease-in-out infinite'
            }}></div>
          </div>
        </Core>

        {/* Orbital Rings */}
        <OrbitalRing style={{ width: '75%', height: '75%' }} />
        <OrbitalRing style={{ width: '50%', height: '50%', animationDelay: '0.5s' }} />
      </QuantumSpinner>
    </DarkSpinnerContainer>
  );
};

export default AdvancedEducationSpinner;