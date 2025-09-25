import { Context } from "telegraf";

export const helpCommand = (ctx: Context) => {
  ctx.reply(`\
La funcion de este bot es ayudarte a administrar el personal del IMS de una manera eficiente y productiva.

Si no estas autentificado, no podras usar los comandos... Usa /auth <usuario> <contraseña> para autentificarte.

Puedes usar los comandos:
- /new: Registra un nuevo miembro del personal`);
};
