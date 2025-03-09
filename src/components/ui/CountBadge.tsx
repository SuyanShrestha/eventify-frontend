import React from 'react';

interface CountBadgeProps {
  count: number;
  positionClass?: string;
}

const CountBadge: React.FC<CountBadgeProps> = ({ count, positionClass = '-top-2 -right-2' }) => {
  if (count === 0) return null;

  return (
    <span
      className={`absolute ${positionClass} bg-accent-300 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full`}
    >
      {count}
    </span>
  );
};

export default CountBadge;
