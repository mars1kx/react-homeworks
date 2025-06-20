import React from "react";
import styled from "styled-components";
import trustpilotLogo from "../../assets/trustpilot-logo.png";
import Rating from "../Rating/Rating";
import { useTheme } from "../../contexts/ThemeContext";

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 992px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  padding-right: 2rem;

  @media (max-width: 992px) {
    max-width: 100%;
    padding-right: 0;
    margin-bottom: 2rem;
  }
`;

interface HeroTitleProps {
  isDarkTheme: boolean;
}

const HeroTitle = styled.h1<HeroTitleProps>`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 60px;
  line-height: 60px;
  letter-spacing: 1.8px;
  color: ${props => props.isDarkTheme ? '#ffffff' : '#000'};
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;

  @media (max-width: 992px) {
    font-size: 40px;
    line-height: 40px;
  }
`;

const Highlighted = styled.span`
  color: #35b8be;
`;

const HeroDescription = styled.p<HeroTitleProps>`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 19px;
  line-height: 24.12px;
  letter-spacing: 0.36px;
  color: ${props => props.isDarkTheme ? '#b0b0b0' : '#5a5a77'};
  margin-bottom: 2rem;
  transition: color 0.3s ease;
`;

const HeroCta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderButton = styled.button`
  background-color: #35b8be;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 180px;

  &:hover {
    background-color: #2ca7ad;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 992px) {
    justify-content: center;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const HomeHero: React.FC = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle isDarkTheme={isDarkTheme}>
          Beautiful food & takeaway, <Highlighted>delivered</Highlighted> to
          your door.
        </HeroTitle>
        <HeroDescription isDarkTheme={isDarkTheme}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500.
        </HeroDescription>
        <HeroCta>
          <OrderButton>Place an Order</OrderButton>
          <Rating
            logoSrc={trustpilotLogo}
            ratingValue="4.8 out of 5"
            reviewCount="2000+"
            altText="Trustpilot"
          />
        </HeroCta>
      </HeroContent>
      <HeroImage>
        <img src="/images/HomeImage.png" alt="Food delivery" />
      </HeroImage>
    </HeroContainer>
  );
};

export default HomeHero; 