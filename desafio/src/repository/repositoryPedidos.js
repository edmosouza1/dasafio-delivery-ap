import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

async function deletePedido(id) {
  const data = await getPedidos();

  data.pedidos = data.pedidos.filter((pedido) => pedido.id !== id);

  await writeFilePedido(data);
}

async function getPedido(id) {
    const data = await getPedidos();

    const pedido = data.pedidos.find(p => p.id === id);
    if (pedido) {
        return pedido
    }
    throw new Error("Pedido não encontrado.");
}

async function getPedidos() {
  return JSON.parse(await readFile(global.fileName));
}

async function savePedidos({ cliente, produto, valor }) {
  const data = await getPedidos();
  const dataHora = new Date().toISOString();
  const pedido = { id: data.nextId++, cliente, produto, valor, entregue: false, timestamp: dataHora };
  data.pedidos.push(pedido);

  await writeFilePedido(data);
  return pedido;
}

async function updatePedido({ id, cliente, produto, valor, entregue }) {
  const data = await getPedidos();
  const index = data.pedidos.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("Registro não econtrado.");
  }
  data.pedidos[index].cliente = cliente;
  data.pedidos[index].produto = produto;
  data.pedidos[index].valor = valor;
  data.pedidos[index].entregue = entregue;
  
  await writeFilePedido(data);
  return data.pedidos[index];
}

async function updateStatusPedido({ id, entregue }) {
  const data = await getPedidos();
  const index = data.pedidos.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("Registro não econtrado.");
  }
  data.pedidos[index].entregue = entregue;
  
  await writeFilePedido(data);
  return data.pedidos[index];
}

async function writeFilePedido(data) {
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

export default { deletePedido, getPedido, getPedidos, savePedidos, updatePedido, updateStatusPedido };
