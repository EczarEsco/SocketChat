console.clear();
import net from "net";
import chalk from 'chalk';

const server = net.createServer();
const arrayClients = [];
const port = 4000;
const host = "192.168.0.34";
const arrayUserNames = {};
const Color=0


//el usuario entra al servidor
server.on("connection", (client) => {
  if (arrayUserNames[client.remoteAddress] === undefined) {
    arrayUserNames[client.remoteAddress] = {apodo: client.remoteAddress,R: Color+ Math.ceil(Math.random()*255),G: Color+ Math.ceil(Math.random()*255), B: Color+ Math.ceil(Math.random()*255)};
    client.write(chalk.green("Escribe tu nombre de usuario"));
  }
//se hace el metodo push al array
  arrayClients.push(client);

  //se manada mensaje a todos los usuarios
  console.log(chalk.rgb(arrayUserNames[client.remoteAddress].R,arrayUserNames[client.remoteAddress].G,arrayUserNames[client.remoteAddress].B,).underline("se ha conectado: " + arrayUserNames[client.remoteAddress].apodo));
  client.on("data", (data) => {
    if (arrayUserNames[client.remoteAddress].apodo === client.remoteAddress) {
      arrayUserNames[client.remoteAddress].apodo = data.toString().trim();
      client.write(chalk.rgb(arrayUserNames[client.remoteAddress].R,arrayUserNames[client.remoteAddress].G,arrayUserNames[client.remoteAddress].B,).underline("tu nickName ahora es: " + arrayUserNames[client.remoteAddress].apodo));
      return;
    }
    for (const key in arrayClients){
      if(arrayClients[key].remoteAddress ===client.remoteAddress) continue
      arrayClients[key].write(chalk.rgb(arrayUserNames[client.remoteAddress].R,arrayUserNames[client.remoteAddress].G,arrayUserNames[client.remoteAddress].B).underline(arrayUserNames[client.remoteAddress].apodo) + ":" + data);
    }

    console.log(chalk.rgb(arrayUserNames[client.remoteAddress].R,arrayUserNames[client.remoteAddress].G,arrayUserNames[client.remoteAddress].B,).underline(arrayUserNames[client.remoteAddress].apodo) + ":" + data);
  });

  //El usuario abandona el servidor
  client.on("close", () => {
    arrayClients.map((usuario) => {
      usuario.write(chalk.rgb(arrayUserNames[client.remoteAddress].R,arrayUserNames[client.remoteAddress].G,arrayUserNames[client.remoteAddress].B,).underline(arrayUserNames[client.remoteAddress].apodo) + chalk.red(" ha salido del servidor"));
    });
  });
//Cuando ocurre un error
  client.on("error", (err) => {
    if (err.errno === -4077) {
      arrayClients.map((usuario) => {
        usuario.write(chalk.rgb(arrayUserNames[client.remoteAddress].R,arrayUserNames[client.remoteAddress].G,arrayUserNames[client.remoteAddress].B,).underline(arrayUserNames[client.remoteAddress].apodo) + chalk.red(" ha salido del servidor"));
      });

      console.log(chalk.rgb(arrayUserNames[client.remoteAddress].R,arrayUserNames[client.remoteAddress].G,arrayUserNames[client.remoteAddress].B,).underline(arrayUserNames[client.remoteAddress].apodo) + chalk.red(" ha salido del servidor"));
    } else {
      console.error(err);
    }
  });
});
server.on("error", (err) => {
  console.log(chalk.red(err));
});

//Notificacion al servidor cuando un usuario entra
server.listen(port, host, () => {
  console.log(chalk.green("Servidor a la escucha"));
});


