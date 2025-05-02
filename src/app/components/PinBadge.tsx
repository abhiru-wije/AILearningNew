"use client";

import { motion } from "framer-motion";
import React from "react";

interface PinBadgeProps {
  title: string;
  image: string; // e.g. "/assets/images/sea.jpg"
  onClick?: () => void;
  size?: number; // Optional: control badge size
  position?: string;
}

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

export const PinBadge: React.FC<PinBadgeProps> = ({
  image,
  title,
  onClick,
  size = 250,
  position,
}) => {
  return (
    <div
      className={`absolute ${position} transform -translate-x-1/2 -translate-y-1/2`}
    >
      <motion.button
        className="pin-badge relative cursor-pointer"
        onClick={onClick}
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${image})`,
        }}
        whileHover={{
          scale: 1.15,
          rotate: [0, -5, 5, -5, 0],
          transition: {
            rotate: {
              duration: 0.5,
              repeat: 1,
              repeatType: "reverse",
            },
          },
        }}
        whileTap={{ scale: 0.9 }}
        variants={itemVariants}
      >
        <motion.div
          className={`absolute text-nowrap -bottom-12 left-1/2 transform -translate-x-1/2 text-xl font-bold text-center text-gray-50 transition-transform duration-300 group-hover:scale-105`}
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
      </motion.button>
    </div>
  );
};
