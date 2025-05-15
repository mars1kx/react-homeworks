import React from "react";
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 24px;
  width: auto;
`;

const RatingText = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #5a5a77;
`;

const RatingValue = styled.span`
  font-weight: 400;
  color: rgba(53, 184, 190, 1);
`;

const Rating = ({
  logoSrc,
  ratingValue,
  reviewCount,
  altText = "Rating logo",
}) => {
  return (
    <RatingContainer>
      <LogoContainer>
        <LogoImage src={logoSrc} alt={altText} />
      </LogoContainer>
      <RatingText>
        <RatingValue>{ratingValue}</RatingValue> based on {reviewCount} reviews
      </RatingText>
    </RatingContainer>
  );
};

export default Rating;
