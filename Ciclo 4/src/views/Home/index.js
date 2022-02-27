import { Container } from 'reactstrap'

export const Home = () => {
  return (
    <div>
      <Container>
        <div className="d-flex "><h1>Home</h1>
          <div ClassName="m-auto p-2 ">
            
          </div>
          <div className="p-2">
            <a
              href="/listar-cliente"
              className="btn btn-outline-success btn-sm"
            >
              Clientes
            </a>
          </div>
          <div className="p-2">
            <a
              href="/listar-servicos"
              className="btn btn-outline-success btn-sm"
            >
              Serviços
            </a>
          </div>
          <div className="p-2">
            <a href="/listar-produtos" className="btn btn-outline-success btn-sm">
              Produtos
            </a>
          </div>
          <div className="p-2">
            <a href="/listar-pedidos" className="btn btn-outline-success btn-sm">
              Pedidos
            </a>
          </div>
          <div className="p-2">
            <a href="/listar-compras" className="btn btn-outline-success btn-sm">
              Compras
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
