import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { Container, Table } from 'reactstrap'
import { api } from '../../../config'




export const ListarPedidos = () => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  const getPedidos = async () => {
    await axios
      .get(api + '/listapedidos')
      .then(response => {
        console.log(response.data.pedidos)
        setData(response.data.pedidos)
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
    getPedidos()
  }, [])

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div>
            <h1>Visualização dos Pedidos</h1>
          </div>
          <div className="m-auto p-2">
            <Link
              to="cadastrarpedidos"
              className="btn btn-outline-primary btn-sm"
            >
              Cadastrar
            </Link>
          </div>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>ID do Pedido</th>
              <th>ID do Cliente</th>
              <th>Data do Pedido</th>

            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.ClienteId}</td>
                <td>{item.data}</td>
                {/* <td>  
                  <div className="m-auto">
            <Link
              to="cadastrarpedidos"
              className="btn btn-outline-primary btn-sm"
            >
              Cadastrar Item
            </Link>
          </div></td> */}
              
                <td className="p-2 text-center/">
                 
              
              
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}
