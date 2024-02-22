"use client";

import axios from "axios";
import { useState } from "react";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

import "./summary.scss";

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [nombre, setNombre] = useState("");
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuento, setDescuento] = useState(1);
  const [pagado, setPagado] = useState(false);

  const codigo = ["FFGH", "FDSFDF", "FSADFSDSFD", "GFSDFG"];

  const handlecodigoDescuentoChange = (event: any) => {
    setCodigoDescuento(event.target.value);
  };

  const probarDescuento = () => {
    if (codigo.includes(codigoDescuento)) {
      setDescuento(0.75);
      toast.success("Código exitoso");
      setCodigoDescuento(" ");
    } else {
      setDescuento(1);
      toast.success("Código erroneo");
    }
  };

  const totalPrice = items.reduce((total, item) => {
    return (total + Number(item.price)) * descuento;
  }, 0);

  const handleDireccionChange = (event: any) => {
    setDireccion(event.target.value);
  };

  const handleTelefonoChange = (event: any) => {
    const value = event.target.value as string; // Casting a string
    setTelefono(value.replace(/\D/g, ""));
  };
  const handleMailChange = (event: any) => {
    setMail(event.target.value);
  };
  const handleNombreChange = (event: any) => {
    setNombre(event.target.value);
  };

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
        direccion: direccion,
        telefono: telefono,
        nombre: nombre,
        mail: mail,
        precioTotal: totalPrice.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 0,
        }),
      }
    );

    window.location = response.data.url;
  };

  const handleButtonClick = () => {
    setPagado(true);
  };

  const listo = () => {
    if (!direccion || !telefono || !mail || !nombre) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }
    onCheckout();
    toast.success("Pago completado.");
    removeAll();
    setDireccion("");
    setTelefono("");
    setNombre("");
    setMail("");
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
      <form
        className={!pagado ? "visto pt-4 border-t border-gray-200" : "oculto"}
      >
        <label>
          <p>Codigo de descuento:</p>
        </label>
        <div className="flex justify-between">
          <input
            placeholder="Ingresa un codigo"
            type="text"
            value={codigoDescuento}
            onChange={handlecodigoDescuentoChange}
          />
          <Button onClick={probarDescuento}>Probar</Button>
        </div>
      </form>

      <form
        className={pagado ? "visto pt-4 border-t border-gray-200" : "oculto"}
      >
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
        <label>
          <p>Mail:</p>
        </label>
        <input
          placeholder="Ingresa tu mail"
          type="text"
          value={mail}
          onChange={handleMailChange}
        />
        <label>
          <p>Nombre y Apellido:</p>
        </label>
        <input
          placeholder="Ingresa tu nombre completo"
          type="text"
          value={nombre}
          onChange={handleNombreChange}
        />
      </form>

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
