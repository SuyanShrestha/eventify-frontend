import React from "react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: IconComponent,
  title,
  description,
}) => {
  return (
    <div className="bg-secondary-500 shadow-lg rounded-lg p-6 flex-1 w-full min-h-60 min-w-60 md:w-80 flex flex-col items-center">
      <div className="mb-4 text-accent-500">
        <IconComponent size={60} />
      </div>

      <h3 className="text-xl font-semibold text-center text-[#553c9a] mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;
