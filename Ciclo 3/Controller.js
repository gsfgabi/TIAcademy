const express = require('express')
const cors = require('cors')

const { sequelize, Sequelize } = require('./models')

const models = require('./models')
const { application } = require('express')

const app = express()
app.use(cors())
app.use(express.json())

let cliente = models.Cliente
let itempedido = models.ItemPedido
let pedido = models.Pedido
let servico = models.Servico
let compra = models.Compra
let produto = models.Produto
let itemcompra = models.ItemCompra

app.get('/', function (req, res) {
  res.send('Olá Mundo!')
})
//ROTAS PARA CRIAÇÃO
app.post('/clientes', async (req, res) => {
  await cliente
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: 'Cliente criado com sucesso!'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Não foi possível criar um novo cliente.'
      })
    })
})

app.post('/pedidos', async (req, res) => {
  await pedido
    .create(req.body)
    .then(() => {
      return res.json({
        error: false,
        message: 'Pedido criado com sucesso.'
      })
    })
    .catch(() => {
      res.status(400).json({
        error: true,
        message: 'Não foi possível criar o pedido.'
      })
    })
  res.send('Pedido realizado com sucesso!')
})

app.post('/itempedido', async (req, res) => {
  await itempedido
    .create(req.body)
    .then(() => {
      return res.json({
        error: false,
        message: 'Item adicionado ao pedido com sucesso.'
      })
    })
    .catch(() => {
      res.json({
        error: true,
        message: 'Não foi possível adicionar o item ao pedido.'
      })
    })
  res.send('Item adicionado ao pedido com sucesso.')
})

app.post('/servicos', async (req, res) => {
  await servico
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: 'Serviço criado com sucesso!'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Não foi possível realizar a conexão'
      })
    })
})

app.post('/compras', async (req, res) => {
  await compra
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: 'A compra foi realizada com sucesso!'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Não foi possível realizar a compra.'
      })
    })
})

app.post('/produto', async (req, res) => {
  await produto
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: 'O produto foi criado com sucesso!'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Não foi possível criar o produto.'
      })
    })
})

app.post('/itemcompra', async (req, res) => {
  await itemcompra
    .create(req.body)
    .then(() => {
      return res.json({
        error: false,
        message: 'Item adicionado a compra com sucesso'
      })
    })
    .catch(() => {
      res.json({
        error: true,
        message: 'Não foi possível adicionar o item a compra.'
      })
    })
  res.send('Compra realizada com sucesso.')
})

//LISTAGEM
app.get('/listaclientes', async (req, res) => {
  await cliente
    .findAll({
      raw: true
    })
    .then(function (clientes) {
      res.json({ clientes })
    })
})

app.get('/listapedidos', async (req, res) => {
  await pedido
    .findAll({
      raw: true
    })
    .then(function (pedidos) {
      res.json({ pedidos })
    })
})

app.get('/listaitempedidos', async (req, res) => {
  await itempedido
    .findAll({
      raw: true
    })
    .then(function (itempedido) {
      res.json({ itempedido })
    })
})

//LISTA TODOS OS SERVIÇOS EM ORDEM ASCENDENTE DE NOME
app.get('/listaservicos', async (req, res) => {
  await servico
    .findAll({
      //raw: true
      order: [['nome', 'ASC']]
    })
    .then(function (servicos) {
      res.json({ servicos })
    })
})

//LISTA A QUANTIDADE DE SERVIÇOS
app.get('/ofertaservicos', async (req, res) => {
  await servico.count('id').then(function (servicos) {
    res.json({ servicos })
  })
})

app.get('/listacompras', async (req, res) => {
  await compra
    .findAll({
      raw: true
    })
    .then(function (compras) {
      res.json({ compras })
    })
})

app.get('/listaprodutos', async (req, res) => {
  await produto
    .findAll({
      raw: true
    })
    .then(function (produtos) {
      res.json({ produtos })
    })
})

app.get('/listaitemcompra', async (req, res) => {
  await itemcompra
    .findAll({
      raw: true
    })
    .then(function (itemcompras) {
      res.json({ itemcompras })
    })
})



//LISTAR PEDIDO POR ID
app.get('/pedidos/:id', async (req, res) => {
  await pedido
    .findByPk(req.params.id)
    .then(ped => {
      return res.json({ 
        error: false,
        ped
    });
}).catch(erro => {
  return res.status(400).json({
    error:true,
    message: "Erro: não foi possível acessar a API"
  })
})
})


//EDITAR ITEM POR ID
app.put('/pedidos/:id/editaritem', async (req, res) => {
  const item = {
    quantidade: req.body.quantidade,
    valor: req.body.valor
  }

  if (!(await pedido.findByPk(req.params.id))) {
    return res.status(400).json({
      error: true,
      message: 'Pedido não foi encontrado.'
    })
  }
  if (!(await servico.findByPk(req.body.ServicoId))) {
    return res.status(400).json({
      error: true,
      message: 'Serviço não encontrado.'
    })
  }
  await itempedido
    .update(item, {
      where: Sequelize.and(
        { ServicoId: req.body.ServicoId },
        { PedidoId: req.params.id }
      )
    })
    .then(function (itens) {
      return res.json({
        error: false,
        message: 'Pedido alterado com sucesso!',
        itens
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Não foi possível alterar o pedido.'
      })
    })
})


//EDITAR PEDIDO 

app.put('/pedido/:id', async (req, res) => {
  const ped = {
      id: req.params.id,
      ClienteId: req.body.ClienteId,
      data: req.body.data
  };

  if (!await cliente.findByPk(req.body.ClienteId)){
      return res.status(400).json({
          error: true,
          message: 'Cliente não existe.'
      });
  };

  await pedido.update(ped,{
      where: Sequelize.and({ClienteId: req.body.ClienteId},
          {id: req.params.id})
  }).then(pedidos=>{
      return res.json({
          error: false,
          mensagem: 'Pedido foi alterado com sucesso.',
          pedidos
      });
  }).catch(erro=>{
      return res.status(400).json({
          error: true,
          message: "Erro: não foi possível alterar."
      });
  });
});


//UTILIZADO PARA ENCONTRAR UM SERVIÇO POR ID
app.get('/servico/:id/pedidos', async (req, res) => {
  await itempedido
    .findAll({
      where: { ServicoId: req.params.id }
    })
    .then(item => {
      return res.json({
        error: false,
        item
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro: Não foi possível fazer a conexão!'
      })
    })
})

app.get('/produto/:id/compras', async (req, res) => {
  await itemcompra
    .findAll({
      where: { ProdutoId: req.params.id }
    })
    .then(item => {
      return res.json({
        error: false,
        item
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro: Não foi possível fazer a conexão!'
      })
    })
})


app.get('/cliente/:id/pedido', async (req, res) => {
  await pedido
    .findAll({
      where: { ClienteId: req.params.id }
    })
    .then(item => {
      return res.json({
        error: false,
        item
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro: Não foi possível fazer a conexão!'
      })
    })
})


app.get('/cliente/:id/compra', async (req, res) => {
  await compra
    .findAll({
      where: { ClienteId: req.params.id }
    })
    .then(item => {
      return res.json({
        error: false,
        item
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro: Não foi possível fazer a conexão!'
      })
    })
})

// app.get('/atualizarservico', async (req, res) => {
//   await servico.findByPk(1).then(serv => {
//     serv.nome = 'HTML/CSS/JS/Typescript';
//     serv.descricao = 'Páginas Estáticas Estilizadas';
//     serv.save(); //salva o que foi feito
//     return res.json({serv})
//   })
// })

//ATUALIZAÇÃO DE UM DADO SERVIÇO
app.put('/atualizarcliente', async (req, res) => {
  await cliente
    .update(req.body, {
      where: { id: req.body.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Cliente alterado com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.json({
        error: true,
        message: 'Erro na tentativa de alterar o cliente.'
      })
    })
})

app.put('/atualizarservico', async (req, res) => {
  await servico
    .update(req.body, {
      where: { id: req.body.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Serviço alterado com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.json({
        error: true,
        message: 'Erro na tentativa de alteração do serviço.'
      })
    })
})

app.put('/atualizaritempedido', async (req, res) => {
  await itempedido
    .update(req.body, {
      where: { PedidoId: req.body.PedidoId }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Item do pedido alterado com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.json({
        error: true,
        message: 'Erro na tentativa de alterar o item do pedido.'
      })
    })
})

app.put('/atualizarpedido', async (req, res) => {
  await pedido
    .update(req.body, {
      where: { id: req.body.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Pedido alterado com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.json({
        error: true,
        message: 'Erro na tentativa de alterar o pedido.'
      })
    })
})

app.put('/atualizarcompra', async (req, res) => {
  await compra
    .update(req.body, {
      where: { id: req.body.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Compra alterada com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.json({
        error: true,
        message: 'Erro na tentativa de alterar a compra.'
      })
    })
})

app.put('/atualizarproduto', async (req, res) => {
  await produto
    .update(req.body, {
      where: { id: req.body.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Produto alterado com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.json({
        error: true,
        message: 'Erro na tentativa de alterar o produto.'
      })
    })
})

app.put('/atualizaritemcompra', async (req, res) => {
  await itemcompra
    .update(req.body, {
      where: { CompraId: req.body.CompraId }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Item da compra alterado com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.json({
        error: true,
        message: 'Erro na tentativa de alterar o item da compra.'
      })
    })
})

//EXCLUSÃO:
app.get('/excluirCliente/:id', async (req, res) => {
  await cliente
    .destroy({
      where: { id: req.params.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Cliente excluido com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro ao excluir o cliente.'
      })
    })
})

app.get('/excluirPedidos/:id', async (req, res) => {
  await pedido
    .destroy({
      where: { id: req.params.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Pedido excluido com sucesso'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro ao excluir o pedido.'
      })
    })
})

app.get('/excluirItemPedido/:Servicoid', async (req, res) => {
  await itempedido
    .destroy({
      where: { Servicoid: req.params.Servicoid }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Item do Pedido excluido com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro ao excluir o item do pedido.'
      })
    })
})

app.get('/excluirServicos/:id', async (req, res) => {
  await servico
    .destroy({
      where: { id: req.params.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Serviço excluido com sucesso'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro ao excluir o serviço.'
      })
    })
})

app.get('/excluirCompra/:id', async (req, res) => {
  await compra
    .destroy({
      where: { id: req.params.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Compra excluida com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro ao excluir a compra.'
      })
    })
})

app.get('/excluirItemCompra/:Produtoid', async (req, res) => {
  await itemcompra
    .destroy({
      where: { Produtoid: req.params.Produtoid }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Item da compra excluido com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro ao excluir o item da compra.'
      })
    })
})

app.get('/excluirProduto/:id', async (req, res) => {
  await produto
    .destroy({
      where: { id: req.params.id }
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Produto excluido com sucesso.'
      })
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro ao excluir o produto.'
      })
    })
})

let port = process.env.PORT || 3001
app.listen(port, (req, res) => {
  console.log('Servidor ativo: http://localhost:3001')
})