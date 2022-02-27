import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import { api } from '../../../config'

export const CadastrarCompra = () => {
  const [compras, setCompra] = useState({
    nome: '',
    descricao: ''
  })

  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  const valorInput = e =>
    setCompra({
      ...compras,
      [e.target.name]: e.target.value
    })

  const cadCompra = async e => {
    e.preventDefault()
    console.log(compras)

    const headers = {
      'Content-Type': 'application/json'
    }

    await axios
      .post(api + '/compras', compras, { headers })
      .then(response => {
        // console.log(response.data.message)
        if (response.data.error) {
          setStatus({
            type: 'error',
            message: response.data.message
          })
        } else {
          setStatus({
            type: 'success',
            message: response.data.message
          })
        }
      })
      .catch(() => {
        console.log('Erro: Sem conexão com a API.')
      })
  }
  return (
    <Container>
      <div className="d-flex">
        <div className="m-auto p-2">
          <h1>Cadastrar Nova Compra</h1>
        </div>
        <div className="p-2">
          <Link to="/listar-compras" className="btn btn-utline-success btn-sm">
            Compras
          </Link>
        </div>
      </div>
      <hr className="m-1" />

      {status.type === 'error' ? (
        <Alert color="danger">{status.message}</Alert>
      ) : (
        ''
      )}
      {status.type === 'success' ? (
        <Alert color="success">{status.message}</Alert>
      ) : (
        ''
      )}

      <Form className="p-2" onSubmit={cadCompra}>
        <FormGroup className="p-2">
          <Label>ID do Cliente</Label>
          <Input
            name="ClienteId"
            placeholder="ID do Cliente"
            type="text"
            onChange={valorInput}
          />
        </FormGroup>
        <FormGroup className="p-2">
          <Label>Data da Compra</Label>
          <Input
            name="data" //deve ter correspondecia a base de dados
            placeholder="Data da Compra"
            type="text"
            onChange={valorInput}
          />
        </FormGroup>
        <Button type="submit" outline color="success">
          Cadastrar
        </Button>
      </Form>
    </Container>
  )
}
