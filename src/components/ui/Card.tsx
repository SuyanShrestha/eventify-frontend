import styled from "styled-components";
import type React from "react";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: bisque;
  width: 10rem;
  aspect-ratio: 9/16;
  border-radius: 2rem;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 14rem;
  }

  @media (min-width: 1024px) {
    width: 18rem;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
  }
`;

const Card: React.FC<CardProps> = ({ imageSrc, imageAlt, imageTitle }) => {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });
  return (
    <StyledCard
      as={animated.div}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        title={imageTitle}
        className="w-full h-full object-cover rounded-2xl object-center"
      />
    </StyledCard>
  );
};

export default Card;
