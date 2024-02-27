import React, { useState, useEffect } from "react";
import Envios from "./envios";

const Seleccionar = (pagado: any) => {
  const [opciones, setOpciones] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const obtenerEnvios = async () => {
      const { ZonaEnvio } = await Envios();
      const opcionesZona = ZonaEnvio.map((zona: any) => (
        <option key={zona} value={zona}>
          {zona}
        </option>
      ));
      setOpciones(opcionesZona);
    };

    obtenerEnvios();
  }, []);

  return (
    <div>
      <select>{opciones}</select>
    </div>
  );
};

export default Seleccionar;
