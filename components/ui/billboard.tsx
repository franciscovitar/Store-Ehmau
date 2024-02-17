"use client";

import { Billboard } from "@/types";
import { motion } from "framer-motion";

import "./billboard.scss";

interface BillboardProps {
  data: Billboard;
}

const textVariants = {
  viewport: { once: true },
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: 2, delay: 0 },
  },
};

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  console;
  return (
    <div className="bboard p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <motion.div
        {...textVariants}
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="bboard1 rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="bboard2 h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="bboard3 font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data?.label}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Billboard;
