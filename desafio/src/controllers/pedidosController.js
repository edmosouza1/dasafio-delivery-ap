import PedidosService from "../services/pedidosServices.js";

/**
 * Função para exuclir pedido
 * @param {*} req requisiação
 * @param {*} res resposta
 * @param {*} next reporta erro
 */
async function deletePedido(req, res, next) {
  try {
    res.send(await PedidosService.deletePedido(+req.params.id));    
    global.logger.info(`${req.method}`);
  } catch (err) {
    next(err);
  }
}
/**
 * Função pesquisar um pedido
 * @param {*} req requisiação
 * @param {*} res resposta
 * @param {*} next reporta erro
 */
async function getPedido(req, res, next) {
  try {
    return res.send(await PedidosService.listaPedido(+req.params.id));
    global.logger.info(`${req.method}`);
  } catch (err) {
    next(err);
  }
}
/**
 * Função para listar pedidos
 * @param {*} req requisiação
 * @param {*} res resposta
 * @param {*} next reporta erro
 */
async function getPedidos(req, res, next) {
  try {
    return res.send(await PedidosService.listaPedidos());
    global.logger.info(`${req.method}`);
  } catch (err) {
    next(err);
  }
}

async function getProdutosMaisVendidos(req, res, next){
    try {
        return res.send(await PedidosService.produtosMaisVendidos());
        global.logger.info(`${req.method}`);
      } catch (err) {
        next(err);
      }
}

async function getValorTotalPedidosCliente(req, res, next){
    try {
        return res.send(await PedidosService.valorTotalPedidosCliente(req.params.cliente));
        global.logger.info(`${req.method}`);
      } catch (err) {
        next(err);
      }
}

async function getValorTotalPedidosProduto(req, res, next){
    try {
        return res.send(await PedidosService.valorTotalPedidosProduto(req.params.produto));
        global.logger.info(`${req.method}`);
      } catch (err) {
        next(err);
      }
}

/**
 * Função criar um pedido
 * @param {*} req requisiação
 * @param {*} res resposta
 * @param {*} next reporta erro
 */
async function postCreatePedido(req, res, next) {
  try {
    const pedido = req.body;
    return res.send(await PedidosService.createPedido(pedido));
    global.logger.info(`${req.method}`);
  } catch (err) {
    next(err);
  }
}

async function patchStatusEntregaPedido(req, res, next) {
    try {
        const pedido = req.body;
        return res.send(await PedidosService.editStatusPedido(pedido));
        global.logger.info(`${req.method}`);
      } catch (err) {
        next(err);
      }
}
/**
 * Função para editar um pedido
 * @param {*} req requisiação
 * @param {*} res resposta
 * @param {*} next reporta erro
 */
async function putEditPedido(req, res, next) {
  try {
    const pedido = req.body;
    return res.send(await PedidosService.editPedido(pedido));
    global.logger.info(`${req.method}`);
  } catch (err) {
    next(err);
  }
}

export default { deletePedido, getPedido, getPedidos, getProdutosMaisVendidos, getValorTotalPedidosCliente, getValorTotalPedidosProduto, postCreatePedido, patchStatusEntregaPedido, putEditPedido};
