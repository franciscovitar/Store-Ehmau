// import { Resend } from "resend";
// import { EmailTemplate } from "../../(routes)/cart/components/email-template";

// const resend = new Resend("re_iTCj3fNi_MfYhXLQ4LyfxzR73bN36gAYG");

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const data = await resend.emails.send({
//       from: "Mauricio <onboarding@resend.dev>",
//       to: [body.mail],
//       subject: "Resumen de compra",
//       react: EmailTemplate({
//         firstName: body.nombre,
//         precio: body.precioTotal,
//         nombreProducto: body.nombreProducto,
//         ordenCompra: body.ordenCompra,
//       }),
//       text: "",
//     });

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error });
//   }
// }
