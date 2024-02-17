"use client";

import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import { motion } from "framer-motion";

import "./product-list.scss";

interface ProductListProps {
  title: string;
  items: Product[];
}
const lineVariants = {
  viewport: { once: true },
  initial: { width: 5 },
  whileInView: { width: 120, transition: { duration: 0.5 } },
};

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className="product space-y-4">
      <h3 className=" flex justify-center text-3xl">
        {title}
        {/* <motion.div className="line" {...lineVariants}></motion.div> */}
      </h3>

      {items.length === 0 && <NoResults />}
      <div className="hola grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;