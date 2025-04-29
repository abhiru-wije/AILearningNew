"use client";

import MapStepShape from "@/app/components/MapStepShape";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Define the map steps with theme-matching colors
const mapSteps = [
  {
    id: 1,
    title: "Beach",
    isLocked: false,
    bgColor: "#FFD54F",
    position: "top-[10%] left-[20%]",
    icon: "🏖️",
  },
  {
    id: 2,
    title: "Country Side",
    isLocked: false,
    bgColor: "#81C784",
    position: "top-[30%] right-[25%]",
    icon: "🌾",
  },
  {
    id: 3,
    title: "Forest",
    isLocked: true,
    bgColor: "#4CAF50",
    position: "top-[50%] left-[30%]",
    icon: "🌲",
  },
  {
    id: 4,
    title: "River",
    isLocked: false,
    bgColor: "#4FC3F7",
    position: "top-[70%] right-[30%]",
    icon: "🌊",
  },
  {
    id: 5,
    title: "Mountain",
    isLocked: true,
    bgColor: "#A1887F",
    position: "top-[90%] left-[25%]",
    icon: "⛰️",
  },
  {
    id: 6,
    title: "Park",
    isLocked: true,
    bgColor: "#8BC34A",
    position: "top-[110%] right-[20%]",
    icon: "🎡",
  },
  {
    id: 7,
    title: "Quiz",
    isLocked: true,
    bgColor: "#FF7043",
    position: "top-[130%] left-[40%]",
    icon: "❓",
  },
];

// Path connections between steps
const paths = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
];

export default function Map() {
  const router = useRouter();
  const params = useParams();
  const levelID = params.levelID as string;

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [unlockedSteps, setUnlockedSteps] = useState<number[]>([1]); // Start with Beach unlocked
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  // Handle step click
  const handleStepClick = (topicId: number) => {
    console.log(topicId, "topic");

    if (!mapSteps[topicId - 1].isLocked) {
      setActiveStep(topicId);
      // Navigate to the appropriate page based on the step
      if (topicId === 7) {
        router.push(`/level/${levelID}/quiz`);
      } else {
        router.push(`/level/${levelID}/topic/${topicId}`);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.5 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1,
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Background Image with Overlay - Fixed to cover entire screen */}
      <div className="fixed inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          style={{ opacity: 0.85 }}
          src="/assets/images/map.jpg"
          alt="Adventure Map Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/30 to-purple-100/30"></div>
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-20 pb-4 pt-2">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-800 text-center drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Your Adventure Map
        </motion.h1>
        <motion.p
          className="text-xl md:text-3xl text-gray-700 mt-2 text-center drop-shadow-md"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          Level {levelID}
        </motion.p>
      </div>

      {/* Scrollable Map Container */}
      <div className="w-screen h-screen overflow-y-auto pt-32 pb-20">
        {/* Map Content */}
        <div ref={containerRef} className="relative min-h-[200vh] w-full">
          {/* Map Steps */}
          <motion.div
            className="absolute inset-0 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Draw paths between steps */}
            <svg
              className="absolute inset-0"
              style={{ zIndex: 0 }}
              height={containerHeight || 0}
              width={windowSize.width || 0}
              viewBox={`0 0 ${windowSize.width || 0} ${containerHeight || 0}`}
            >
              {paths.map((path, index) => {
                const fromStep = mapSteps[path.from - 1];
                const toStep = mapSteps[path.to - 1];

                // Calculate path coordinates based on positions
                const fromPos = getPositionCoordinates(
                  fromStep.position,
                  windowSize,
                  containerHeight
                );
                const toPos = getPositionCoordinates(
                  toStep.position,
                  windowSize,
                  containerHeight
                );

                return (
                  <motion.path
                    key={`path-${index}`}
                    d={`M ${fromPos.x} ${fromPos.y} C ${fromPos.x + 100} ${
                      fromPos.y
                    }, ${toPos.x - 100} ${toPos.y}, ${toPos.x} ${toPos.y}`}
                    stroke="#6366F1"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="15,15"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.2 }}
                  />
                );
              })}
            </svg>

            {/* Map Steps */}
            {mapSteps.map((step, index) => {
              const isUnlocked = unlockedSteps.includes(step.id);

              return (
                <motion.div
                  key={step.id}
                  className={`absolute ${step.position} transform -translate-x-1/2 -translate-y-1/2`}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    transition: {
                      rotate: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="relative">
                    {/* Continuous floating animation for the icon */}
                    <motion.div
                      className="absolute -top-15 left-1/4 transform -translate-x-1/2 text-5xl"
                      animate={{
                        y: [0, -20, 0],
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
                        delay: index * 0.2,
                      }}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Continuous pulsing animation for the shape */}
                    <motion.div
                      className="relative"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    >
                      <MapStepShape
                        id={step.id}
                        title={step.title}
                        isLocked={!isUnlocked}
                        bgColor={step.bgColor}
                        icon={step.icon}
                        onClick={() => handleStepClick(step.id)}
                      />
                    </motion.div>

                    {/* Add a pulsing effect for the active step */}
                    {activeStep === step.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ boxShadow: `0 0 0 15px ${step.bgColor}80` }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 0.3, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Fixed Back Button */}
      {/* Floating End Session Button */}
      <div className="fixed bottom-8 right-5 transform -translate-x-1/2 z-50">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-12 py-8 rounded-full bg-red-500 hover:bg-red-600 font-bold text-3xl text-white transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Leave Session
        </button>
      </div>
    </div>
  );
}

// Helper function to convert position classes to coordinates
function getPositionCoordinates(
  position: string,
  windowSize: { width: number; height: number },
  containerHeight?: number
): { x: number; y: number } {
  const { width } = windowSize;
  const height = containerHeight || windowSize.height;
  const [vertical, horizontal] = position.split(" ");

  let x = 0;
  let y = 0;

  // Parse vertical position
  if (vertical.includes("top")) {
    const value =
      parseFloat(
        vertical.split("-")[1].split("[")[1].split("]")[0].split("%")[0]
      ) / 100;
    y = value * height;
  } else if (vertical.includes("bottom")) {
    const value =
      parseFloat(
        vertical.split("-")[1].split("[")[1].split("]")[0].split("%")[0]
      ) / 100;
    y = height - value * height;
  }

  // Parse horizontal position
  if (horizontal.includes("left")) {
    const value =
      parseFloat(
        horizontal.split("-")[1].split("[")[1].split("]")[0].split("%")[0]
      ) / 100;
    x = value * width * 0.8;
  } else if (horizontal.includes("right")) {
    const value =
      parseFloat(
        horizontal.split("-")[1].split("[")[1].split("]")[0].split("%")[0]
      ) / 100;
    x = width * 0.8 - value * width * 0.8;
  }

  return { x, y };
}
