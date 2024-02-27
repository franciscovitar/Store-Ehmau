import getEnvios from "@/actions/get-envios";

const Envios = async () => {
  const envios = await getEnvios();
  const ZonaEnvio = envios.map((envio) => envio.zona);
  const ValorEnvio = envios.map((envio) => envio.valor);

  return {
    ZonaEnvio: ZonaEnvio,
    ValorEnvio: ValorEnvio,
  };
};

export default Envios;
