import { Alert, Container, Table } from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { api } from '../../../config'
import { useEffect, useState } from 'react'

export const ListarServico = () => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  const getServicos = async () => {
    await axios
      .get(api + '/listaservicos')
      .then(response => {
        console.log(response.data.servicos)
        setData(response.data.servicos)
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
    getServicos()
  }, [])

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div>
            <h1>Visualizar informações do serviços</h1>
          </div>
          <div className="m-auto p-2">
            <Link
              to="cadastrarservico"
              className="btn btn-outline-primary btn-sm"
            >
              Cadastrar
            </Link>
          </div>
          {status.type === 'error' ? (
            <Alert color="danger">{status.message}</Alert>
          ) : (
            ''
          )}
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.descricao}</td>
                  <td className="text-center/">
                    <Link
                      to={'/listar-pedido/' + item.id}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Consultar
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
