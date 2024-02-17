"use client";

import React from "react";
import { motion } from "framer-motion";
import "./_contacto.scss";
import Image from "next/image";
import Logo from "../public/logoblanco.png";

const containerVariants = {
  viewport: { once: true },
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: 2, delay: 0, ease: "easeInOut" },
  },
};

function Contacto() {
  return (
    <div id="contacto" className="contacto-container">
      <div className="contacto">
        <motion.div className="img" {...containerVariants}>
          {" "}
          <Image src={Logo} alt=""></Image>
        </motion.div>

        <div className="cont">
          <motion.h2
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.1 },
            }}
          >
            Redes:
          </motion.h2>

          <div className="iconos">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/maderoimporta/"
            >
              <motion.i
                viewport={{ once: true }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, delay: 0.3 },
                }}
                className="bi bi-instagram"
              ></motion.i>
            </a>

            <a
              href="https://wa.me/5491134010666"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.i
                viewport={{ once: true }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, delay: 0.4 },
                }}
                className="bi bi-whatsapp"
              ></motion.i>
            </a>
          </div>
        </div>
        <div className="direc">
          <motion.h2
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.1 },
            }}
          >
            Contacto:
          </motion.h2>
          <motion.p
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.2 },
            }}
          >
            Celular: 11 34010666
          </motion.p>
          <motion.p
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.2 },
            }}
          >
            Mail: largo@surtown.com
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
