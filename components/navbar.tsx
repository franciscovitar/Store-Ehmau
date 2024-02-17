"use client";

import { Category } from "@/types";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import NavBarUp from "./navbarup";
import { useState } from "react";
import "./navbar.scss";
import Link from "next/link";

interface NavbarProps {
  categories: Category[]; // Cambia esto al tipo real de tus categorías
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const [marca, setMarca] = useState("surtown");

  const handleClick = () => {
    setMarca(marca === "surtown" ? "ehmau" : "surtown");
  };

  return (
    <>
      <NavBarUp marca={marca} handleClick={handleClick} />
      <div className="nav border-b">
        <Container>
          <div className="nav1">
            <Link href={"/"}>
              <h3 onClick={handleClick}>
                Ir a {marca === "surtown" ? "ehmau" : "surtown"}
              </h3>
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
