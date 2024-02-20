import React from "react";
import Image from "next/image";

import Surtown from "../public/logonavbar-removebg-preview.png";
import Ehmau from "../public/navbarlogo.png";
import "./navbarup.scss";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface NavBarUpProps {
  sur: () => void;
  ehm: () => void;
  marca: string;
}

const NavBarUp: React.FC<NavBarUpProps> = ({ sur, ehm, marca }) => {
  return (
    <div className="navup">
      <Link href="/">
        {" "}
        <Image
          onClick={sur}
          src={Surtown}
          alt=""
          data-tooltip-id="surtown"
          data-tooltip-content="Ir a Surtown"
        />
        <ReactTooltip id="surtown" className="bg-danger" />
      </Link>
      <Link href="/">
        <Image
          data-tooltip-id="ehmau"
          data-tooltip-content="Ir a Ehmau"
          onClick={ehm}
          src={Ehmau}
          alt=""
        ></Image>
        <ReactTooltip id="ehmau" className="bg-danger" />
      </Link>
    </div>
  );
};

export default NavBarUp;
