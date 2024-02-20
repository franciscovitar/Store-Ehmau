"use client";

import { Category } from "@/types";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import NavBarUp from "./navbarup";
import { useState } from "react";
import "./navbar.scss";
import Link from "next/link";

import Surtown from "../public/logonavbar-removebg-preview.png";
import Ehmau from "../public/navbarlogo.png";
import Image from "next/image";

interface NavbarProps {
  categories: Category[]; // Cambia esto al tipo real de tus categorías
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const [marca, setMarca] = useState("surtown");

  const imageSrc = marca === "surtown" ? Surtown : Ehmau;

  const sur = () => {
    setMarca("surtown");
  };

  const ehm = () => {
    setMarca("ehmau");
  };

  return (
    <>
      <NavBarUp marca={marca} sur={sur} ehm={ehm} />
      <div className="nav border-b">
        <Container>
          <div className="nav1">
            <Link href={"/"}>
              <Image alt="" src={imageSrc} />
            </Link>

            <div className="med">
              <MainNav data={categories} marca={marca} />
            </div>
            <div className="der">
              <NavbarActions />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
