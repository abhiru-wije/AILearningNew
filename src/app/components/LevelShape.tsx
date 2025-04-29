import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Lock } from 'lucide-react';

interface LevelShapeProps {
  level: number;
  title: string;
  isLocked: boolean;
  bgColor: string;
  onClick: () => void;
}

const levelIcons = [
  // Simple star shape
  <svg key="star" viewBox="0 0 100 100" className="w-20 h-20">
    <path
      d="M50 5 L61 35 L95 35 L65 55 L75 85 L50 65 L25 85 L35 55 L5 35 L39 35 Z"
      fill="currentColor"
    />
  </svg>,
  // Simple heart shape
  <svg key="heart" viewBox="0 0 100 100" className="w-25 h-25">
    <path
      d="M50 80 C50 80 20 60 20 35 C20 20 35 15 50 35 C65 15 80 20 80 35 C80 60 50 80 50 80 Z"
      fill="currentColor"
    />
  </svg>,
  // Simple house shape
  <svg key="house" viewBox="0 0 100 100" className="w-20 h-20">
    <path
      d="M10 90 L10 40 L50 10 L90 40 L90 90 Z"
      fill="currentColor"
    />
  </svg>,
  // Simple sun shape
  <svg key="sun" viewBox="0 0 100 100" className="w-20 h-20">
    <circle cx="50" cy="50" r="30" fill="currentColor" />
    <path
      d="M50 5 L50 15 M50 85 L50 95 M5 50 L15 50 M85 50 L95 50 M20 20 L25 25 M75 75 L80 80 M20 80 L25 75 M75 25 L80 20"
      stroke="currentColor"
      strokeWidth="5"
    />
  </svg>,
  // Simple moon shape
  <svg key="moon" viewBox="0 0 100 100" className="w-20 h-20">
    <path
      d="M30 50 A20 20 0 1 1 70 50 A15 15 0 1 0 30 50"
      fill="currentColor"
    />
  </svg>,
  // Simple cloud shape
  <svg key="cloud" viewBox="0 0 100 100" className="w-25 h-25">
    <path
      d="M20 60 A20 20 0 0 1 60 60 A15 15 0 0 1 80 60 A20 20 0 0 1 60 80 L20 80 A20 20 0 0 1 20 60"
      fill="currentColor"
    />
  </svg>,
];

const colors = [
  {
    bg: 'bg-yellow-300', // Bright warm yellow
    text: 'text-yellow-900',
    icon: 'text-yellow-100',
  },
  {
    bg: 'bg-pink-400', // Soft coral red
    text: 'text-red-900',
    icon: 'text-red-100',
  },
  {
    bg: 'bg-green-400', // Fresh mint green
    text: 'text-green-900',
    icon: 'text-green-100',
  },
  {
    bg: 'bg-orange-400', // Light salmon
    text: 'text-orange-900',
    icon: 'text-orange-100',
  },
  {
    bg: 'bg-blue-400', // Sky blue
    text: 'text-blue-900',
    icon: 'text-blue-300',
  },
  {
    bg: 'bg-purple-400', // Plum
    text: 'text-purple-900',
    icon: 'text-purple-100',
  },
];

const LevelShape: React.FC<LevelShapeProps> = ({
  level,
  title,
  isLocked,
  bgColor,
  onClick,
}) => {
  const shapeIndex = level - 1;
  const colorSet = colors[shapeIndex] || colors[0];

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        relative cursor-pointer group flex justify-center items-center
        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        transition-all duration-300 ease-in-out transform
      `}
      aria-label={`Level ${level}: ${title}`}
    >
      <svg 
        width="300" 
        height="300" 
        viewBox="0 0 735 735" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:rotate-3"
      >
        <path 
          d="M735.001 367.5C735.001 398.558 690.338 423.329 682.682 451.947C674.756 481.585 700.822 525.322 685.81 551.269C670.584 577.591 619.503 576.791 598.173 598.153C576.842 619.514 577.611 670.564 551.289 685.79C525.342 700.802 481.605 674.743 451.967 682.662C423.33 690.318 398.559 734.981 367.52 734.981C336.482 734.981 311.692 690.318 283.074 682.662C253.436 674.743 209.699 700.802 183.751 685.79C157.429 670.564 158.23 619.483 136.868 598.153C115.506 576.822 64.4564 577.591 49.231 551.269C34.2182 525.322 60.2841 481.585 52.3586 451.947C44.7084 423.31 0.0390625 398.539 0.0390625 367.5C0.0390625 336.461 44.7084 311.671 52.3586 283.053C60.2841 253.416 34.2182 209.678 49.231 183.731C64.4564 157.409 115.537 158.21 136.868 136.848C158.199 115.486 157.429 64.4362 183.751 49.2107C209.699 34.1979 253.436 60.2639 283.074 52.3384C311.71 44.6881 336.488 0.0187988 367.52 0.0187988C398.553 0.0187988 423.349 44.6881 451.967 52.3384C481.605 60.2639 525.342 34.1979 551.289 49.2107C577.611 64.4424 576.811 115.517 598.173 136.854C619.535 158.191 670.584 157.409 685.81 183.731C700.822 209.678 674.756 253.416 682.682 283.053C690.338 311.671 735.001 336.449 735.001 367.5Z"  
          className={`${colorSet.bg} transition-colors duration-300 group-hover:brightness-110`}
          fill={isLocked ? '#808080' : bgColor} 
        />
        <foreignObject x="170" y="140" width="400" height="400">
          <div className="flex flex-col items-center justify-center h-full">
            <div className={`mb-1 ${isLocked ? 'text-gray-800' : colorSet.icon} transition-transform duration-300 group-hover:scale-110`}>
              {/* {levelIcons[shapeIndex]} */}{
                isLocked ? <Lock size={60} /> :levelIcons[shapeIndex] 
              }
            </div>
            <div className={`text-8xl font-bold text-center ${isLocked ? 'text-gray-800' : colorSet.text} transition-transform duration-300 group-hover:scale-105`}>
              {title}
            </div>
            {/* <div className={`text-5xl mt-2 ${colorSet.text} transition-transform duration-300 group-hover:scale-105`}>
              Level {level}
            </div> */}
          </div>
        </foreignObject>
      </svg>

      {/* {isLocked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 transition-opacity duration-300 group-hover:opacity-75">
          <FaLock size={40} />
        </div>
      )} */}
    </button>
  );
};

export default LevelShape; 