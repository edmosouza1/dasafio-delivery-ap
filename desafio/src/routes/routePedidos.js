import express from "express";
import PedidosController from "../controllers/pedidosController.js";

const router = express.Router();

//#region funções delte
router.delete("/excluirPedido/:id", PedidosController.deletePedido);
//#endregion

//#region funções get
router.get("/consultarPedido/:id", PedidosController.getPedido);

router.get("/consultarValorTotalPedidosCliente/:cliente", PedidosController.getValorTotalPedidosCliente);

router.get("/consultarValorTotalPedidosProduto/:produto", PedidosController.getValorTotalPedidosProduto);

router.get("/retornaProdutosMaisVendidos", PedidosController.getProdutosMaisVendidos);
//#endregion

//#region funções post
router.post("/criarPedido", PedidosController.postCreatePedido);
//#endregion

//#region funções put and pacth
router.put("/atualizarPedido", PedidosController.putEditPedido);

router.patch("/atualizarStatusEntregaPedido", PedidosController.patchStatusEntregaPedido);
//#endregion

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default  router ;
