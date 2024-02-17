"use client";

import React from "react";
import Image from "next/image";
import Nos from "../public/pexels-clem-onojeghuo-211050.jpg";
import "./nosotros.scss";
import { motion } from "framer-motion";

const lineVariants = {
  viewport: { once: true },
  initial: { width: 0 },
  whileInView: { width: 60, transition: { duration: 0.5, delay: 0.5 } },
};

const textVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 10 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0 },
  },
};

const tittleVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

const imageVariants = {
  initial: { scale: 0.8, opacity: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1 },
  },
  viewport: { once: true },
};

function Nosotros() {
  return (
    <div id="nosotros" className="nos-container">
      <div className="fila">
        <div className="texto">
          <motion.h2 {...tittleVariants}>Acerca de mí</motion.h2>
          <motion.div className="line" {...lineVariants}></motion.div>
          <motion.p {...textVariants}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            pariatur, numquam debitis laudantium dignissimos quod perspiciatis
            ducimus reprehenderit a labore voluptatum ullam blanditiis nemo
            eveniet aspernatur omnis temporibus quasi et. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Nesciunt pariatur, numquam
            debitis laudantium dignissimos quod perspiciatis ducimus
            reprehenderit a.
          </motion.p>
        </div>
        <motion.div {...imageVariants} className="imagen">
          <Image alt="" src={Nos}></Image>
        </motion.div>
      </div>
    </div>
  );
}

export default Nosotros;
