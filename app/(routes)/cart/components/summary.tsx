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
import Seleccionar from "./seleccionar";

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
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

  const totalPrice = items.reduce((total, item) => {
    return (parseInt(valorEnvioInput) + total + Number(item.price)) * descuento;
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

  const onCheckout = async (ordenCompra: any) => {
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
  };

  const sendEmail = (ordenCompra: any) => {
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

    // Adjuntar el formulario al cuerpo del documento (para asegurar que los datos sean enviados)
    document.body.appendChild(form);

    // Enviar el formulario usando emailjs
    emailjs
      .sendForm(
        "service_bdh41ue",
        "template_cqp6rdt",
        form, // Pasar el formulario como tercer argumento
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

    // Remover el formulario del DOM después de enviarlo
    document.body.removeChild(form);
  };

  const listo = () => {
    if (!direccion || !telefono || !mail || !nombre) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }
    if (!envioCalculado) {
      toast.error("Por favor calcula el precio de envio.");
      return;
    }
    const ordenCompra = generarOrdenCompra();
    sendEmail(ordenCompra);
    toast.success("Pago completado.");
    removeAll();
    setDireccion("");
    setTelefono("");
    setNombre("");
    setMail("");
    onCheckout(ordenCompra);
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
          <p>Calcular Envio:</p>
        </label>
        <div className="flex justify-between selec">
          <div className="flex items-center">
            <select value={zonaEnvio} onChange={handleZonaEnvio}>
              {opciones}
            </select>
            <p className="ml-5 bg-black text-white">
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
      </form>

      <div className={pagado ? "visto cvu" : "oculto"}>
        <h3>
          Transferir a:<p>00700498-30004027410014</p>
        </h3>
        <h3>
          Alias: <p> TIENDASURTOWN</p>
        </h3>
        <h3>
          Enviar comprobante a:{" "}
          <p>
            <a target="blank" href="https://wa.me/5491134010666">
              +54 9 11 3401-0666
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
