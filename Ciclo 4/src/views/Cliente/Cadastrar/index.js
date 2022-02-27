import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { api } from '../../../config'

export const CadastrarCliente = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    descricao: ''
  })

  const[status, setStatus] = useState({
    type: '',
    message: ''
  });

  const valorInput = e =>
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    })

  const cadCliente = async e => {
    e.preventDefault()
    console.log(cliente)

    const headers = {
      'Content-Type': 'application/json'
    }

    await axios
      .post(api + '/clientes', cliente, { headers })
      .then(response => {
        // console.log(response.data.message)
        if(response.data.error){
          setStatus({
            type:'error',
            message: response.data.message
          });
        }else {
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
          <h1>Cadastrar Novo Cliente</h1>
        </div>
        <div className="p-2">
          <Link to="/listar-cliente" className="btn btn-utline-success btn-sm">
            Clientes
          </Link>
        </div>
      </div>
      <hr className="m-1" />

      {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>: ""}
      {status.type === 'success' ? <Alert color="success">{status.message}</Alert>: ""}

      <Form className="p-2" onSubmit={cadCliente}>
        <FormGroup className="p-2">
          <Label>Nome</Label>
          <Input
            name="nome"
            placeholder="Nome do cliente"
            type="text"
            onChange={valorInput}
          />
        </FormGroup>
        <FormGroup className="p-2">
          <Label>Data de Nascimento</Label>
          <Input
            name="nascimento" //deve ter correspondecia a base de dados
            placeholder="Data de Nascimento do Cliente"
            type="text"
            onChange={valorInput}
          />
        </FormGroup>
        <FormGroup className="p-2">
          <Label>Endereço</Label>
          <Input
            name="endereco" //deve ter correspondecia a base de dados
            placeholder="Endereço do Cliente"
            type="text"
            onChange={valorInput}
          />
        </FormGroup>
        <FormGroup className="p-2">
          <Label>Cidade</Label>
          <Input
            name="cidade" //deve ter correspondecia a base de dados
            placeholder="Cidade do Cliente"
            type="text"
            onChange={valorInput}
          />
        </FormGroup>
        <FormGroup className="p-2">
          <Label>UF</Label>
          <Input
            name="uf" //deve ter correspondecia a base de dados
            placeholder="UF do cliente"
            type="text"
            onChange={valorInput}
          />
        </FormGroup>
        <FormGroup className="p-2">
          <Label>Cliente desde:</Label>
          <Input
            name="clienteDesde" //deve ter correspondecia a base de dados
            placeholder="Cliente Desde"
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
