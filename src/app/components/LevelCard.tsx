import React from 'react';
import { FaLock } from 'react-icons/fa';

interface LevelCardProps {
  level: number;
  title: string;
  isLocked: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  isLocked,
  icon,
  onClick,
}) => {
  return (
    <div
      className={`
        relative p-6 rounded-2xl cursor-pointer transform transition-all duration-300
        ${isLocked 
          ? 'bg-gray-200 hover:bg-gray-300' 
          : 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
        }
        hover:scale-105 shadow-lg
      `}
      onClick={onClick}
    >
      {isLocked && (
        <div className="absolute top-4 right-4 text-gray-500">
          <FaLock size={24} />
        </div>
      )}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
        <p className="text-lg text-center">Level {level}</p>
      </div>
    </div>
  );
};

export default LevelCard; 