"use server";

import { Envios } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/envios`;

const getEnvios = async (): Promise<Envios[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getEnvios;
