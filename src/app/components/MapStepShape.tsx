import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import React from "react";

interface MapStepShapeProps {
  id: number;
  title: string;
  isLocked: boolean;
  bgColor: string;
  icon: string;
  onClick: () => void;
}

const colors = [
  {
    bg: "bg-yellow-300", // Bright warm yellow
    text: "text-yellow-900",
    icon: "text-yellow-100",
  },
  {
    bg: "bg-pink-400", // Soft coral red
    text: "text-[#2f6131]",
    icon: "text-red-100",
  },
  {
    bg: "bg-green-400", // Fresh mint green
    text: "text-green-900",
    icon: "text-green-100",
  },
  {
    bg: "bg-orange-400", // Light salmon
    text: "text-[#133e52]",
    icon: "text-orange-100",
  },
  {
    bg: "bg-blue-400", // Sky blue
    text: "text-[#6b5249]",
    icon: "text-blue-300",
  },
  {
    bg: "bg-purple-400", // Plum
    text: "text-[#364f18]",
    icon: "text-purple-100",
  },
];

const MapStepShape: React.FC<MapStepShapeProps> = ({
  id,
  title,
  isLocked,
  bgColor,
  icon,
  onClick,
}) => {
  const shapeIndex = id - 1;
  const colorSet = colors[shapeIndex] || colors[0];

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className="map-step-button map-step-button-red cursor-pointer"
      aria-label={`Step ${id}: ${title}`}
    >
      <motion.div
        className={`text-xl font-bold text-center text-gray-50 transition-transform duration-300 group-hover:scale-105`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {title}
      </motion.div>
    </button>
  );

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        relative cursor-pointer group flex justify-center items-center
        ${
          isLocked
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 active:scale-95"
        }
        transition-all duration-300 ease-in-out transform map-step-button
      `}
      aria-label={`Step ${id}: ${title}`}
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
          className="transition-colors duration-300 group-hover:brightness-110"
          fill={isLocked ? "#19181A" : bgColor}
        />
        <foreignObject x="170" y="140" width="400" height="400">
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              className={`mb-5 ${
                isLocked ? "text-gray-400" : colorSet.text
              } transition-transform duration-300 group-hover:scale-110`}
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              {isLocked ? (
                <Lock size={60} />
              ) : (
                <span className="text-7xl">{icon}</span>
              )}
            </motion.div>
            <motion.div
              className={`text-6xl font-bold text-center ${
                isLocked ? "text-gray-400" : colorSet.text
              } transition-transform duration-300 group-hover:scale-105`}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {title}
            </motion.div>
          </div>
        </foreignObject>
      </svg>
    </button>
  );
};

export default MapStepShape;
