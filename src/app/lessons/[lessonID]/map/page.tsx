"use client";

import EndButton from "@/app/components/EndButton";
import { PinBadge } from "@/app/components/PinBadge";
import { ILessonDetails } from "@/types/types";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Define the map steps with theme-matching colors
const mapSteps = [
  {
    id: 1,
    title: "Beach",
    position: "top-[10%] left-[20%]",
    image: "/assets/images/sea.jpg",
  },
  {
    id: 2,
    title: "Country Side",
    position: "top-[30%] right-[25%]",
    image: "/assets/images/country.jpeg",
  },
  {
    id: 3,
    title: "Forest",
    position: "top-[50%] left-[30%]",
    image: "/assets/images/forest.jpg",
  },
  {
    id: 4,
    title: "River",
    position: "top-[70%] right-[30%]",
    image: "/assets/images/river.jpg",
  },
  {
    id: 5,
    title: "Mountain",
    position: "top-[90%] left-[25%]",
    image: "/assets/images/mountain.webp",
  },
  {
    id: 6,
    title: "Park",
    position: "top-[110%] right-[20%]",
    image: "/assets/images/park.jpg",
  },
  {
    id: 7,
    title: "Quiz 1",
    position: "top-[130%] left-[40%]",
    image: "/assets/images/quiz.png",
  },
  {
    id: 8,
    title: "Quiz 2",
    position: "top-[150%] right-[20%]",
    image: "/assets/images/quiz.png",
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

function getTopicImage(topicID: string) {
  return `/assets/images/${topicID}.jpg`;
}

export default function Map() {
  const router = useRouter();
  const params = useParams();
  const levelID = params.lessonID as string;

  const { data: session } = useSession();

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lessonDetails, setLessonDetails] = useState<ILessonDetails | null>(
    null
  );

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

  useEffect(() => {
    if (!session?.access_token) {
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/lesson/${levelID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to load lesson details");
        }

        setLessonDetails(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

  // Handle step click
  const handleStepClick = (topicId: string) => {
    router.push(`/lessons/${levelID}/topic/${topicId}`);
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
          src="/assets/images/map.jpg"
          alt="Adventure Map Background"
        />
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-20 pb-4 pt-2">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-50 text-center drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Your Adventure Map
        </motion.h1>
        <motion.p
          className="text-xl md:text-3xl text-gray-200 mt-2 text-center drop-shadow-md"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          Level {lessonDetails?.name}
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
            {lessonDetails?.topics && (
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
            )}

            {lessonDetails?.topics.map((topic, index) => (
              <PinBadge
                key={topic.topicId}
                position={mapSteps[index].position}
                image={getTopicImage(topic.topicId)}
                title={topic.title}
                onClick={() => handleStepClick(topic.topicId)}
              />
            ))}

            <PinBadge
              key={mapSteps[6].id}
              position={mapSteps[6].position}
              image={mapSteps[6].image}
              title={mapSteps[6].title}
              isLocked={!lessonDetails?.isLessonDone}
              onClick={() => router.push(`/lessons/${levelID}/quiz`)}
            />

            <PinBadge
              key={mapSteps[7].id}
              position={mapSteps[7].position}
              image={mapSteps[7].image}
              title={mapSteps[7].title}
              isLocked={!lessonDetails?.isLessonDone}
              onClick={() => router.push(`/lessons/${levelID}/quiz2`)}
            />
          </motion.div>
        </div>
      </div>

      {/* Floating End Session Button */}
      <div className="fixed bottom-8 right-5 transform -translate-x-1/2 z-50">
        <EndButton
          title="Leave Session"
          onClick={() => router.push("/dashboard")}
        />
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
