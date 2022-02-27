import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarPedidoCliente = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedido/"+id,
            { id, data, ClienteId }, { headers })
            .then((response) => {
                console.log(response.data.error);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar a API.'
                });
            });
    }

    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + "/pedido/" + id)
                .then((response) => {
                    setId(response.data.pedidos.id)
                    setData(response.data.pedidos.data);
                    setClienteId(response.data.pedidos.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente"
                        className="btn btn-outline-success btn-sm">Clientes
                    </Link>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label>ID Pedido</Label>
                        <Input type="text" name="id"
                            placeholder="id do pedido" 
                            defaultValue={id}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="text" name="data"
                            placeholder="data do pedido" value={data}
                            onChange={e => setData(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ClienteId</Label>
                        <Input type="text" name="ClienteId"
                            placeholder="id do cliente" defaultValue={ClienteId} />
                    </FormGroup>

                    <Button type="submit" outline color="warning">Salvar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>

        </div>
    )
}