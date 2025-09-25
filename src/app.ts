import { bot } from "@/lib/telegram-bot";

bot.start((ctx) =>
  ctx.reply(
    "Bienvenido! Usa /auth y la contraseña que se te asigno para obtener permisos de administrador de personal del IMS",
  ),
);

bot.help((ctx) =>
  ctx.reply(`\
La funcion de este bot es ayudarte a administrar el perrsonal del IMS de una manera eficiente y productiva.

Si no estas autentificado, no podras usar los comandos...

Puedes usar los comandos:
- /new: Registra un nuevo miembro del personal`),
);

bot.launch();
