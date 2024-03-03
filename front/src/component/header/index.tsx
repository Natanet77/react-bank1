import React from "react";
import "./index.css";

let time: string;
time = new Date().toLocaleString("en-us", {
  hour: "numeric",
  minute: "numeric",
});
time = time.slice(-time.length, -2);

const Header: React.FC<{}> = () => {
  return (
    <div className="header">
      <span className="header__time">{time}</span>
      <span className="header__icons">
        <img
          className="header__icon"
          src="/svg/callular_connection_black.svg"
          alt="Connection"
        />
        <img className="header__icon" src="/svg/wifi_black.svg" alt="Wifi" />
        <img
          className="header__icon"
          src="/svg/battery_black.svg"
          alt="Battery"
        />
      </span>
    </div>
  );
};

export default Header;
