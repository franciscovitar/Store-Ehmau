"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import CodigoDescuento from "./codigos-descuento";
import "./summary.scss";
import Envios from "./envios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);
  const [mail, setMail] = useState("");
  const [nombre, setNombre] = useState("");
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuento, setDescuento] = useState(1);
  const [descuentoUsado, setDescuentoUsado] = useState("");
  const [usosNuevos, setUsosNuevos] = useState("");
  const [pagado, setPagado] = useState(false);
  const [codigoAleatorio, setCodigoAleatorio] = useState("");
  const [idCodigoDescuento, setIdCodigoDescuento] = useState("");
  const [valorEnvioInput, setValorEnvioInput] = useState("0");
  const [zonaEnvio, setZonaEnvio] = useState("");
  const [opciones, setOpciones] = useState<JSX.Element[]>([]);
  const [envioCalculado, setEnvioCalculado] = useState(false);
  const [ordenCompra, setOrdenCompra] = useState("");

  useEffect(() => {
    const obtenerEnvios = async () => {
      const { ZonaEnvio } = await Envios();
      const opcionesZona = [
        <option className="opcion" key="default" value="Elije tu provincia">
          Elije tu provincia
        </option>, // Opción por defecto
        ...ZonaEnvio.map((zona: any) => (
          <option className="opcion" key={zona} value={zona}>
            {zona}
          </option>
        )),
      ];
      setOpciones(opcionesZona);
    };

    obtenerEnvios();
  }, []);

  initMercadoPago("TEST-66a50373-c6b4-4da8-af68-8ed9223c8a4d", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create_preference`,
        {
          title: "Importa Madero",
          quantity: 1,
          price: totalPrice,
          ordenCompra: ordenCompra,
          productIds: items.map((item) => item.id),
        }
      );

      const { id } = response.data;
      console.log(response);
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    if (!direccion || !telefono || !mail || !nombre) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }
    if (!envioCalculado) {
      toast.error("Por favor calcula el precio de envio.");
      return;
    }

    const id = await createPreference();

    if (id) {
      setPreferenceId(id);
    }
  };

  const handleZonaEnvio = (event: any) => {
    setZonaEnvio(event.target.value);
    console.log(zonaEnvio);
  };

  const calcularEnvio = async () => {
    const { ZonaEnvio } = await Envios();
    const { ValorEnvio } = await Envios();

    for (let i = 0; i < ZonaEnvio.length; i++) {
      if (ZonaEnvio[i] === zonaEnvio) {
        setValorEnvioInput(ValorEnvio[i]);
        setEnvioCalculado(true);
        break;
      } else setValorEnvioInput("0");
    }

    console.log(valorEnvioInput);
  };

  const generarOrdenCompra = () => {
    const longitud = 10;
    let codigo = "";
    for (let i = 0; i < longitud; i++) {
      codigo += Math.floor(Math.random() * 10).toString(); // Convertir el número aleatorio en una cadena
    }
    return codigo;
  };

  const generarCodigoAleatorio = () => {
    const longitud = 6;
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let codigo = "";
    for (let i = 0; i < longitud; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    setCodigoAleatorio(codigo);
  };

  const handlecodigoDescuentoChange = (event: any) => {
    setCodigoDescuento(event.target.value);
  };

  const nombresProductos = () => {
    let productos = [];
    for (let i = 0; i < items.length; i++) {
      console.log(items[i].name);
      productos.push(items[i].name);
    }
    return productos;
  };

  const probarDescuento = async () => {
    const { codigosDescuento } = await CodigoDescuento();
    const { porcentajeDescuento } = await CodigoDescuento();
    const { usosCodigosDescuento } = await CodigoDescuento();
    const { idCodigosDescuento } = await CodigoDescuento();
    let codigoEncontrado = false;

    for (let i = 0; i < codigosDescuento.length; i++) {
      if (
        codigosDescuento[i] === codigoDescuento &&
        usosCodigosDescuento[i] > 0
      ) {
        setDescuento(porcentajeDescuento[i]);
        setUsosNuevos((usosCodigosDescuento[i] - 1).toString());
        setIdCodigoDescuento(idCodigosDescuento[i]);
        toast.success("Código exitoso");
        setDescuentoUsado(codigoDescuento);
        setCodigoDescuento("");
        codigoEncontrado = true;
        break; // Salir del bucle
      }
    }

    if (!codigoEncontrado) {
      setDescuento(1);
      toast.error("Código erróneo");
    }
  };

  const casiTotalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const totalPrice = (parseInt(valorEnvioInput) + casiTotalPrice) * descuento;

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
        ordenCompra: ordenCompra,
        nombre: nombre,
        descuentoUsado: descuentoUsado,
        mail: mail,
        precioTotal: totalPrice.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 0,
        }),
        codigoAleatorio: codigoAleatorio,
        descuento: "10",
        usos: "1",
        usosNuevos: usosNuevos,
        idCodigoDescuento: idCodigoDescuento,
      }
    );

    window.location = response.data.url;
  };

  const handleButtonClick = () => {
    generarCodigoAleatorio();
    setPagado(true);
    const nuevaOrdenCompra = generarOrdenCompra();
    setOrdenCompra(nuevaOrdenCompra);
  };

  const sendEmail = () => {
    // Crear un formulario temporal en el DOM

    const nombreProducto = nombresProductos();
    const form = document.createElement("form");

    // Agregar campos al formulario
    form.innerHTML = `
      <input type="hidden" name="firstName" value="${nombre}">
      <input type="hidden" name="nombreProducto" value="${nombreProducto}">
      <input type="hidden" name="precio" value="${totalPrice.toLocaleString(
        "es-AR",
        {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 0,
        }
      )}">
      <input type="hidden" name="ordenCompra" value="${ordenCompra}">
      <input type="hidden" name="mail" value="${mail}">
    `;

    document.body.appendChild(form);

    emailjs
      .sendForm(
        "service_bdh41ue",
        "template_cqp6rdt",
        form,
        "_Xi61NPw_YghhsDhm"
      )
      .then(
        (response: any) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error: any) => {
          console.log("FAILED...", error);
        }
      );

    document.body.removeChild(form);
  };

  const listo = () => {
    sendEmail();
    removeAll();
    setDireccion("");
    setTelefono("");
    setNombre("");
    setMail("");
    onCheckout();
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
      <form className="visto pt-4 mb-3 border-t border-gray-200">
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
        className={pagado ? "visto pt-2 border-t border-gray-200" : "oculto"}
      >
        <label>
          <p>Calcular Envio:</p>
        </label>
        <div className="flex justify-between selec">
          <div className="flex items-center">
            <select value={zonaEnvio} onChange={handleZonaEnvio}>
              {opciones}
            </select>
            <p className="ml-5 bg-black text-white p-4">
              ${valorEnvioInput != "" ? valorEnvioInput : "0"}
            </p>
          </div>

          <Button onClick={calcularEnvio}>Calcular</Button>
        </div>
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
        {preferenceId ? (
          <a onClick={listo}>
            <Wallet
              initialization={{
                preferenceId: preferenceId,
              }}
            />
          </a>
        ) : (
          <Button onClick={handleBuy} className=" mt-6">
            Pagar
          </Button>
        )}
      </form>

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
