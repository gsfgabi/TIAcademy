import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home } from './views/Home'
import { ListarCliente } from './views/Cliente/Listar/'
// import { ListarPedido } from './views/Pedido/Listar'
import { ListarServico } from './views/Servico/Listar'
import { Menu } from './components/Menu'
import { Item } from './views/Servico/Item'
import { Cadastrar } from './views/Servico/Cadastrar'
import { CadastrarCliente } from './views/Cliente/Cadastrar'
import { ListarProduto } from './views/Produto/Listar'
import { CadastrarProd } from './views/Produto/Cadastrar'
import { PedidoCliente } from './views/Cliente/Pedidos'
import { CompraCliente } from './views/Cliente/Compras'
import { ItemCompra } from './views/Produto/Item'
import { EditarPedidoCliente } from './views/Cliente/EditarPedido'
import { ListarCompras } from './views/Compras'
import { ListarPedidos } from './views/Pedidos/Listar'
import { CadastrarPedido } from './views/Pedidos/Cadastrar'
import { CadastrarCompra } from './views/Compras/Cadastrar'




function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/listar-cliente" component={ListarCliente} />
          <Route path="/listar-servicos" component={ListarServico} />
          <Route path="/listar-compras" component={ListarCompras} />
          <Route path="/listar-pedidos" component={ListarPedidos} />
          <Route path="/listar-pedido/:id" component={Item} />
          <Route path="/cadastrarservico" component={Cadastrar} />
          <Route path="/cadastrarcliente" component={CadastrarCliente} />
          <Route path="/cadastrarpedidos" component={CadastrarPedido}/>
          <Route path="/cadastrarcompras" component={CadastrarCompra} />
          <Route path="/listar-produtos" component={ListarProduto} />
          <Route path="/cadastrarproduto" component={CadastrarProd} />
          <Route path="/clientepedido/:id" component={PedidoCliente} />
          <Route path="/clientecompra/:id" component={CompraCliente} />
          <Route path="/listar-compra/:id" component={ItemCompra} />
          <Route path="/editar-pedido/:id" component={EditarPedidoCliente} />

        </Switch>
      </Router>
    </div>
  )
}

export default App
