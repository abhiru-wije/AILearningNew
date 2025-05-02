import { Lock } from "lucide-react";
import React from "react";

interface LevelShapeProps {
  level: number;
  title: string;
  isLocked: boolean;
  bgColor: string;
  onClick: () => void;
}

const LevelShape: React.FC<LevelShapeProps> = ({
  title,
  isLocked,
  onClick,
}) => {
  return (
    <button
      className="kids-button button-blue flex items-center justify-center gap-2"
      onClick={onClick}
      disabled={isLocked}
    >
      {isLocked && <Lock size={25} />}
      {title}
    </button>
  );
};

export default LevelShape;
