import repositoryPedidos from "../repository/repositoryPedidos.js";
//import pkg from "lodash";
//const { sumBy } = pkg;

async function createPedido(pedido) {
  return await repositoryPedidos.savePedidos(pedido);
}

async function deletePedido(id) {
  return await repositoryPedidos.deletePedido(id);
}

async function editPedido(pedido) {
  return await repositoryPedidos.updatePedido(pedido);
}

async function editStatusPedido(pedido) {
  return await repositoryPedidos.updateStatusPedido(pedido);
}

async function listaPedido(id) {
  return await repositoryPedidos.getPedido(id);
}

async function listaPedidos() {
  return await repositoryPedidos.getPedidos();
}

async function produtosMaisVendidos() {
  const data = await repositoryPedidos.getPedidos();
  const produtos = data.pedidos.map((p) => ({ produto: p.produto, quantidade: 1, entregue: p.entregue }));

  const newArrProdutos = [];
  produtos.forEach((p) => {
    if (p.entregue) {
      //verifica se o array é vazio
      if (newArrProdutos.length === 0) {
        //adiciona o primeiro item no array
        newArrProdutos.push({ produto: p.produto, quantidade: 1 });
      }
      //verifica se existe o item no array
      else if (newArrProdutos.length > 0 && newArrProdutos.some((pr) => pr.produto === p.produto)) {
        //atualiza a quantidade no array
        newArrProdutos[newArrProdutos.findIndex((pf) => pf.produto === p.produto)].quantidade += 1;
      } else {
        //adicioana o item no array
        newArrProdutos.push({ produto: p.produto, quantidade: 1 });
      }
    }
  });

  //ordena por quantidade e ordem alfabetica
  //return newArrProdutos.sort((a, b) => b.quantidade - a.quantidade || a.produto.localeCompare(b.produto)).map(({ produto, quantidade }) => `${produto} - ${quantidade}`);

  return newArrProdutos.sort((a, b) => b.quantidade - a.quantidade || a.produto.localeCompare(b.produto)).map(({ produto }) => produto);
}

async function valorTotalPedidosCliente(cliente) {
  let c;
  try {
    const data = await repositoryPedidos.getPedidos();
    const pedidos = [];
    data.pedidos.forEach((p, i) => {
      c = `${i} - ${p.cliente}`;
      if (p.cliente && p.entregue) {
        if (p.cliente.toUpperCase() == cliente.toUpperCase()) {
          pedidos.push(p);
        }
      }
    });

    const valotTotal = pedidos.reduce(function (valor, currentPedido) {
      return valor + currentPedido.valor;
    }, 0);

    return  `${cliente} - R$ ${valotTotal}`;
  } catch (err) {
    console.log(err.message + " - " + c);
  }
}

async function valorTotalPedidosProduto(produto) {
  let c;
  try {
    const data = await repositoryPedidos.getPedidos();
    const pedidos = [];
    data.pedidos.forEach((p, i) => {
      c = `${i} - ${p.produto}`;
      if (p.produto && p.entregue) {
        if (p.produto.toUpperCase() == produto.toUpperCase()) {
          pedidos.push(p);
        }
      }
    });

    const valotTotal = pedidos.reduce(function (valor, currentPedido) {
      return valor + currentPedido.valor;
    }, 0);

    return  `${produto} - R$ ${valotTotal}`;
  } catch (err) {
    console.log(err.message + " - " + c);
  }
}

export default { createPedido, deletePedido, editPedido, editStatusPedido, listaPedido, listaPedidos, produtosMaisVendidos, valorTotalPedidosCliente, valorTotalPedidosProduto };
