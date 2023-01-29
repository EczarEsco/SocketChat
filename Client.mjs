console.clear();
import net from "net";
import chalk from 'chalk';
const port = 4000;
const host = "192.168.0.34";

const client = new net.Socket();
client.connect(port, host);

client.on("data", (data) => {
  console.log(chalk.green(data.toString().trim()));
}); //Mensajes de los usuarios en el servidor

client.on("connect", () => {
  process.stdin.on("data", (data) => {
    client.write((data.toString().trim()));
  });
});

client.on("error", (err) => {
  if (err.errno === -4077) {
    console.log(chalk.red("Se ha perdido comunicación con el servidor"));
  } else {
    console.error(err);
  }
  process.exit(0);
});
