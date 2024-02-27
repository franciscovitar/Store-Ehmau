import getCodigos from "@/actions/get-codigos";

const CodigoDescuento = async () => {
  const codigos = await getCodigos();
  const idCodigosDescuento = codigos.map((codigo) => codigo.id);
  const usosCodigosDescuento = codigos.map((codigo) => parseInt(codigo.usos));
  const codigosDescuento = codigos.map((codigo) => codigo.codigo);
  const porcentajeDescuento = codigos.map((codigo) => {
    return (100 - parseInt(codigo.descuento)) / 100;
  });

  return {
    codigosDescuento: codigosDescuento,
    porcentajeDescuento: porcentajeDescuento,
    usosCodigosDescuento: usosCodigosDescuento,
    idCodigosDescuento: idCodigosDescuento,
  };
};

export default CodigoDescuento;
