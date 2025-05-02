import React from "react";

interface IEndButtonProps {
  onClick: () => void;
  title: string;
}

function EndButton({ title, onClick }: IEndButtonProps) {
  return (
    <button onClick={onClick} className="cursor-pointer button-red kids-button">
      {title}
    </button>
  );
}

export default EndButton;
