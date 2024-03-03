import "./index.css";
import React from "react";

const AnotherAction: React.FC<{
  text: string;
  button: string;
  onClick: () => any;
}> = ({ text, button, onClick }) => {
  return (
    <div className="another-action">
      {text}
      <span onClick={onClick} className="click another-action__button">
        {button}
      </span>
    </div>
  );
};

export default AnotherAction;
