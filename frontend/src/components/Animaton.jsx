import React from "react";
import styled, { keyframes } from "styled-components";

const WelcomeAnimation = () => {
  return (
    <AnimationContainer>
      <MainSpinner>
        <Orbit>
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
        </Orbit>

        <Core>
          <PingDot />
        </Core>

        <FloatingSymbol style={{ top: '10%', left: '20%' }} delay="0.2s">📚</FloatingSymbol>
        <FloatingSymbol style={{ top: '20%', right: '10%' }} delay="0.4s">⚛️</FloatingSymbol>
        <FloatingSymbol style={{ bottom: '15%', left: '15%' }} delay="0.6s">🔬</FloatingSymbol>
        <FloatingSymbol style={{ bottom: '10%', right: '20%' }} delay="0.8s">💡</FloatingSymbol>

        <WelcomeMessage>
          <h1>Welcome to Akademiya Pro</h1>
          <p>Thanks for signing up! Now register your school</p>
        </WelcomeMessage>
      </MainSpinner>
    </AnimationContainer>
  );
};

// Styled Components
const AnimationContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
  position: relative;
`;

const MainSpinner = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinReverse = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
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

const Orbit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: rgba(100, 255, 218, 0.7);
  border-bottom-color: rgba(100, 255, 218, 0.7);
  animation: ${spin} 8s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
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
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #121212, #1e1e1e);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
  animation: ${pulse} 2s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PingDot = styled.div`
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  opacity: 0.2;
  animation: ping 1.5s ease-in-out infinite;
  
  @keyframes ping {
    0%, 100% { transform: scale(1); opacity: 0.2; }
    50% { transform: scale(1.5); opacity: 0.1; }
  }
`;

const Particle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
  box-shadow: 0 0 10px ${props => props.color};
  animation: ${particleFlow} ${props => props.duration || '3s'} linear infinite;
  z-index: 1;
`;

const FloatingSymbol = styled.div`
  position: absolute;
  font-size: 28px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 15px rgba(100, 255, 218, 0.7);
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0.8;
  z-index: 2;
`;

const WelcomeMessage = styled.div`
  position: absolute;
  top: calc(100% + 40px);
  width: 100%;
  text-align: center;
  margin-top: 20px;
  
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #64ffda;
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
  }
  
  p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
`;

export default WelcomeAnimation;