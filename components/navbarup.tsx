import React from "react";
import Image from "next/image";

import Surtown from "../public/logonavbar-removebg-preview.png";
import Ehmau from "../public/navbarlogo.png";
import "./navbarup.scss";

interface NavBarUpProps {
  handleClick: () => void;
  marca: string;
}

const NavBarUp: React.FC<NavBarUpProps> = ({ handleClick, marca }) => {
  const imageSrc = marca === "surtown" ? Surtown : Ehmau;

  return (
    <div className="navup">
      <Image src={Surtown} alt="" />
      <Image src={Ehmau} alt=""></Image>
    </div>
  );
};

export default NavBarUp;
