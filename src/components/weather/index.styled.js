import styled, { keyframes } from "styled-components";
import { Row, Col, Card, Typography } from "antd";   

const { Title, Text } = Typography;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const GradientBackground = styled.div`
  min-height: 100vh;
  background: ${props => props.gradient};
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullHeightRow = styled(Row)`
  width: 100%;
  min-height: 100vh;
`;

export const CenterCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ModernCard = styled.div`
  width: 100%;
  max-width: 1400px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  padding: 40px;
  margin: 20px;
`;

export const AnimatedContainer = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
  width: 100%;
`;

export const WeatherHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const StyledTitle = styled(Title)`
  &.ant-typography {
    color: #1677ff !important;
    margin-bottom: 25px !important;
    font-weight: 700;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 32px;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export const WeatherHero = styled.div`
  background: linear-gradient(135deg, rgba(140, 177, 233, 0.9) 0%, rgba(9, 109, 217, 0.9) 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

export const HeroContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

export const PulseAnimation = styled.div`
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const Temperature = styled(Title)`
  &.ant-typography {
    color: #fff !important;
    margin: 0 !important;
    font-size: 3.5em !important;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin-bottom: 30px;
  
  .ant-card-body {
    padding: 30px;
  }
`;

export const UpdatedText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
`;

export const CapitalizedText = styled(Text)`
  text-transform: capitalize;
  font-size: 16px;
  display: block;
  font-weight: 500;
`;

export const InfoContainer = styled.div`
  margin-top: 32px;
  text-align: center;
`;

export const AdditionalInfo = styled.div`
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
`;

export const WeatherInfoBox = styled.div`
  background: ${props => {
    switch(props.variant) {
      case 'primary': return 'linear-gradient(135deg, #f2bfbfff 0%, #ee5a52 100%)';
      case 'secondary': return 'linear-gradient(135deg, #b4cdccff 0%, #44a08d 100%)';
      default: return 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
    }
  }};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    ${props => props.variant ? '0 0 0 2px rgba(255,255,255,0.3)' : '0 0 0 1px rgba(0,0,0,0.05)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  color: ${props => props.variant ? 'white' : 'inherit'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.12),
      ${props => props.variant ? '0 0 0 2px rgba(255,255,255,0.4)' : '0 0 0 1px rgba(0,0,0,0.1)'};
  }
`;

export const WeatherIcon = styled.div`
  font-size: 36px;
  color: ${props => props.variant ? 'rgba(255,255,255,0.9)' : '#1890ff'};
  margin-bottom: 12px;
`;

export const WeatherValue = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.variant ? 'white' : '#333'};
  margin-bottom: 4px;
`;

export const WeatherLabel = styled(Text)`
  font-size: 14px;
  color: ${props => props.variant ? 'rgba(255,255,255,0.8)' : '#666'};
  text-align: center;
  font-weight: 500;
`;

export const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ForecastContainer = styled.div`
  margin-top: 50px;
  text-align: center;
`;

export const ForecastCard = styled(Card)`
  width: 190px;
  border-radius: 16px;
  margin: 20px auto;
  margin-right: 23px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
  
  .ant-card-body {
    padding: 20px 16px;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, #e8f4fd, transparent);
  margin: 30px 0;
`;