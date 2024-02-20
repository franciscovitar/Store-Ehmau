"use client";

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import "./summary.scss";

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  // const [preferenceId, setPreferenceId] = useState(null);
  // const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);
  // const memoizedRemoveAll = useMemo(() => removeAll, [removeAll]);
  const [pagado, setPagado] = useState(false);

  // useEffect(() => {
  //   if (searchParams.get("success")) {
  //     toast.success("Pago completado.");
  //     memoizedRemoveAll();
  //   }

  //   if (searchParams.get("canceled")) {
  //     toast.error("Algo salió mal.");
  //   }
  // }, [memoizedSearchParams, memoizedRemoveAll]);

  const handleDireccionChange = (event: any) => {
    setDireccion(event.target.value);
    console.log("Direccion:", direccion);
  };

  const handleTelefonoChange = (event: any) => {
    const value = event.target.value as string; // Casting a string
    setTelefono(value.replace(/\D/g, ""));
  };

  // initMercadoPago("TEST-66a50373-c6b4-4da8-af68-8ed9223c8a4d", {
  //   locale: "es-AR",
  // });

  // const createPreference = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3042/create_preference`,
  //       {
  //         title: "Importa Madero",
  //         quantity: 1,
  //         price: Number(totalPrice),
  //       }
  //     );

  //     const { id } = response.data;

  //     return id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleBuy = async () => {
  //   const id = await createPreference();

  //   if (id) {
  //     setPreferenceId(id);
  //   }
  // };

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
        direccion: direccion,
        telefono: telefono,
      }
    );

    window.location = response.data.url;
  };

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const handleButtonClick = () => {
    if (!direccion || !telefono) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }
    onCheckout();
    setPagado(true);
  };

  const listo = () => {
    toast.success("Pago completado.");
    removeAll();
    setDireccion("");
    setTelefono("");
    setPagado(false);
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Resumen de orden</h2>
      <div className="mt-6 mb-4 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className=" text-base font-medium text-gray-900">Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <form className="pt-4 border-t border-gray-200">
        <label>
          <p>Direccion:</p>
        </label>
        <input
          placeholder="Ciudad, Calle, Número"
          type="text"
          value={direccion}
          onChange={handleDireccionChange}
        />
        <label>
          <p>Telefono:</p>
        </label>
        <input
          placeholder="Ingresa tu número"
          type="text"
          value={telefono}
          onChange={handleTelefonoChange}
        />
      </form>
      {/* {preferenceId ? (
        <Wallet
          initialization={{
            preferenceId: preferenceId,
            redirectMode: "blank",
          }}
        />
      ) : (
        
      )} */}

      <div className={pagado ? "visto cvu" : "oculto"}>
        <h3>
          Transferir a:<p>4324234324234342</p>{" "}
        </h3>
        <h3>
          Enviar comprobante a:{" "}
          <p>
            <a target="blank" href="https://wa.me/5491134010666">
              +54-9-351-7303606
            </a>
          </p>
        </h3>
        <button onClick={listo}>Listo!</button>
      </div>

      <div className={pagado ? "oculto" : "visto"}>
        <Button
          onClick={handleButtonClick}
          disabled={items.length === 0}
          className="w-full mt-6"
        >
          Pagar
        </Button>
      </div>
    </div>
  );
};

export default Summary;
