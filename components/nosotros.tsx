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
        <motion.div {...imageVariants} className="imagen">
          <Image alt="" src={Nos}></Image>
        </motion.div>
        <div className="texto">
          <motion.h2 {...tittleVariants}>MOTTO</motion.h2>
          <motion.div className="line" {...lineVariants}></motion.div>
          <motion.p {...textVariants}>
            En nuestra tienda online de ropa, nos enfocamos en las personas que
            aprecian la vida en un contexto natural y disfrutan de un
            &quot;tiempo sin tecnología&quot; para conectar consigo mismos,
            amigos y la naturaleza. Creemos que vivir sin la dependencia de los
            gadgets es un verdadero placer y un lujo que todos deberíamos
            experimentar.
            <br />
            <br />
            Nuestros productos están pensados para quienes buscan un estilo de
            vida auténtico, valoran la calidad y la sostenibilidad. Ya sea para
            disfrutar en solitario de momentos de desconexión o compartir
            experiencias con amigos y familiares en la naturaleza, nuestra
            colección te invita a reencontrarte contigo mismo y tus seres
            queridos.
            <br />
            <br />
            En un mundo dominado por la tecnología, encontrar momentos para
            disfrutar de la vida offline y conectar con lo que realmente importa
            es un privilegio que queremos que todos puedan experimentar. Únete a
            nuestra comunidad de amantes de la naturaleza y la vida sin
            tecnología, descubre la belleza de compartir tiempo de calidad, ya
            sea individualmente o en compañía de quienes más quieres. ¡Te damos
            la bienvenida a nuestra tienda online de ropa!
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
