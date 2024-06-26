"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import { Product } from "@/types";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";

import "./page.scss";
import CodigoDescuento from "./components/codigos-descuento";

export const revalidate = 0;

interface CartItemWithQuantity extends Product {
  quantity: number;
}

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="bg-white carro">
        <Container>
          <div className="px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-black">Carrito de compra</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                {cart.items.length === 0 && (
                  <p className="text-neutral-500">
                    No hay items añadidos en el carrito.
                  </p>
                )}
                <ul>
                  {/* {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))} */}
                  {Object.values(
                    cart.items.reduce(
                      (acc: Record<string, CartItemWithQuantity>, item) => {
                        if (!acc[item.id]) {
                          acc[item.id] = { ...item, quantity: 1 };
                        } else {
                          acc[item.id].quantity++;
                        }
                        return acc;
                      },
                      {}
                    )
                  ).map((item: CartItemWithQuantity) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </ul>
              </div>
              <Summary />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CartPage;
