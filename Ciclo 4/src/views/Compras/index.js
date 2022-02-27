import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { Container, Table } from 'reactstrap'
import { api } from '../../config'


export const ListarCompras = () => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  const getCompras = async () => {
    await axios
      .get(api + '/listacompras')
      .then(response => {
        console.log(response.data.compras)
        setData(response.data.compras)
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
    getCompras()
  }, [])

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div>
            <h1>Visualização das compras</h1>
          </div>
          <div className="m-auto p-2">
            <Link
              to="cadastrarcompras"
              className="btn btn-outline-primary btn-sm"
            >
              Cadastrar
            </Link>
          </div>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>ID da Compra</th>
              <th>ID do Cliente</th>
              <th>Data da Compra</th>
            
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.ClienteId}</td>
                <td>{item.data}</td>
              
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
