import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv: string[]): any {
  const resultado = minimist(argv);

  return resultado;
}
const controller = new PelisController();

async function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);

  if (params.add) {
    const peli: Peli = {
      id: params.id,
      title: params.title,
      tags: typeof params.tags === "string" ? params.tags.split(",") : [],
    };

    const resultado = await controller.add(peli);
    console.log(
      resultado ? "Pelicula agregada ✅" : "Error al agregar la pelicula ❌"
    );
  } else if (params.get) {
    const peli = await controller.getOne({ id: params.get });

    console.log(peli || "Pelicula no encontrada ❌");
  } else if (params.search) {
    const resultados = await controller.get({
      search: { title: params.search },
    });
    console.log(resultados);
  } else {
    console.log("Comando no reconocido ❌");
  }
}

main();
