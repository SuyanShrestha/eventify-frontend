import React from "react";
import Lottie from "lottie-react";

interface LottieComponentProps {
  animationData: object;
  height?: number;
}

const LottieComponent: React.FC<LottieComponentProps> = ({
  animationData,
  height = 350,
}) => {
  return (
    <div className="flex items-center justify-center h-full w-full mx-auto">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ height }}
      />
    </div>
  );
};

export default LottieComponent;
