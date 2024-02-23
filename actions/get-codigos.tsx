"use server";

import { Codigos } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/codes`;

const getCodigos = async (): Promise<Codigos[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getCodigos;
