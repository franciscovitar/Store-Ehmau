import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import { AlertTriangle } from "lucide-react";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        let itemsRepetidos = 0;

        if (existingItem) {
          itemsRepetidos = currentItems.filter(
            (item) => item.id === data.id
          ).length; // Contar cuántos items del mismo producto ya están en el carrito
        }

        const stock = parseInt(data.stock);

        if (itemsRepetidos >= stock) {
          return toast.error("No hay más stock.");
        } else {
          console.log(stock, itemsRepetidos);
        }

        set({ items: [...get().items, data] });
        toast.success("Item añadido al carrito.");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removido del carrito.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
