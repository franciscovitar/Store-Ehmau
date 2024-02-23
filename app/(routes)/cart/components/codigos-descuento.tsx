import getCodigos from "@/actions/get-codigos";

const CodigoDescuento = async () => {
  const codigos = await getCodigos();
  const codigosDescuento = codigos.map((codigo) => codigo.codigo);
  const porcentajeDescuento = codigos.map((codigo) => {
    return (100 - parseInt(codigo.descuento)) / 100;
  });
  return {
    codigosDescuento: codigosDescuento,
    porcentajeDescuento: porcentajeDescuento,
  };
};

export default CodigoDescuento;
