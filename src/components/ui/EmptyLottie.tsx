import React from "react";
import { SearchingLottie2 } from "../../assets/lottie";
import Lottie from "lottie-react";

interface EmptyLottieProps {
  height?: number;
  spanText: string;
}

const EmptyLottie: React.FC<EmptyLottieProps> = ({
  height = 350,
  spanText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full mx-auto">
      <Lottie
        animationData={SearchingLottie2}
        loop={true}
        autoplay={true}
        style={{ height }}
      />
      <span className="text-secondary-text-400 text-xl">{spanText}</span>
    </div>
  );
};

export default EmptyLottie;
