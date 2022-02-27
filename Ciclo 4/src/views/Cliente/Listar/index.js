import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { Container, Table } from 'reactstrap'
import { api } from '../../../config'

export const ListarCliente = () => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  const getClientes = async () => {
    await axios
      .get(api + '/listaclientes')
      .then(response => {
        console.log(response.data.clientes)
        setData(response.data.clientes)
      })
      .catch(() => {
        setStatus({
          type: 'error',
          message: 'Erro: sem conexão com a API'
        })
        console.log('Erro: sem conexão com a API')
      })
  }

  useEffect(() => {
    getClientes()
  }, [])

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div>
            <h1>Visualização dos clientes</h1>
          </div>
          <div className="m-auto p-2">
            <Link
              to="cadastrarcliente"
              className="btn btn-outline-primary btn-sm"
            >
              Cadastrar
            </Link>
          </div>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Uf</th>
              <th>Cliente Desde</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.nascimento}</td>
                <td>{item.endereco}</td>
                <td>{item.cidade}</td>
                <td>{item.uf}</td>
                <td>{item.clienteDesde}</td>
                <td className="p-2 text-center/">
                  <Link
                    to={'/clientepedido/' + item.id}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Consultar Pedido
                  </Link>
              
                </td>
                <td className="d-flex p-2 text-center/">
                  <Link
                    to={'/clientecompra/' + item.id}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Consultar Compra
                  </Link>
              
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}
