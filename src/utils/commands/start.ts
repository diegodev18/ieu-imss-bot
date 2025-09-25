import { Context } from "telegraf";

export const startCommand = (ctx: Context) => {
  ctx.reply(
    "Bienvenido! Usa /auth y la contraseña que se te asigno para obtener permisos de administrador de personal del IMS",
  );
};
