"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

import { motion } from "framer-motion";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  const textVariants = {
    viewport: { once: true },
    initial: { opacity: 0, y: 10 },
    whileHover: {
      scale: 1.06,
      transition: { duration: 0.4 },
    },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0 },
    },
  };

  return (
    <motion.div
      {...textVariants}
      onClick={handleClick}
      className="shadow-xl bg-white group cursor-pointer  border  space-y-3"
    >
      {/* Image & actions */}
      <div className="aspect-square  bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover "
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-black" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-black" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="px-3">
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className="px-3 pb-3 flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </motion.div>
  );
};

export default ProductCard;
