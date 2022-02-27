import { Alert, Container, Table } from 'reactstrap'
import axios from 'axios'
import { Link } from "react-router-dom";

import { api } from '../../../config'
import { useEffect, useState } from 'react'

export const PedidoCliente = (props) => {
  // console.log(props.match.params.id)
  const [data, setData] = useState([])

  const[id] = useState(props.match.params.id)

  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  const getItens = async () => {
    await axios
      .get(api + '/cliente/'+id+'/pedido')
      .then(response => {
        console.log(response.data.item)
        setData(response.data.item)
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
    getItens();
  }, [id]);

  return (
    <div>
      <Container>
        <div>
          <h1>Pedidos do cliente</h1>
        </div>
        {status.type === 'error' ? (
          <Alert color="danger">{status.message}</Alert>
        ) : (
          ''
        )}
        <Table striped>
          <thead>
            <tr>
        
              <th>Id do Pedido</th>
              <th>Data do Pedido</th>
             
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.data}</td>
              
                <td className="text-center/">
                  <Link to = {"/editar-pedido/" +item.id}
                  className="btn btn-outline-warning btn-sm ">
                    Editar
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
