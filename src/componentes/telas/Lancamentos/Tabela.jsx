import { useContext } from 'react';
import LancamentoContext from './LancamentoContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button, Badge } from 'react-bootstrap';

function Tabela({ listaObjetos = [] }) {
    const {
        alerta,
        remover,
        selecionarObjeto
    } = useContext(LancamentoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lançamentos</h1>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && (
                <h5>Nenhum lançamento encontrado</h5>
            )}
            {listaObjetos.length > 0 && (
                <Table
                    striped
                    bordered
                    hover
                    responsive
                >
                <thead className="table-dark">
                    <tr>
                        <th style={{textAlign: 'center'}}>Ações</th>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Natureza</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {listaObjetos.map(
                        (objeto) => (
                            <tr key={objeto.cd_lancamento}>
                                <td align="center">
                                    <Button variant="info" className="me-2" onClick={() => selecionarObjeto(objeto)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(objeto.cd_lancamento)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.cd_lancamento}</td>
                                <td>{objeto.ds_lancamento}</td>
                                <td>R$ {Number(objeto.vl_lancamento).toFixed(2)}</td>
                                <td>
                                    <Badge bg={objeto.tp_natureza === "ENTRADA" ? "success" : "danger"}>
                                        {objeto.tp_natureza}
                                    </Badge>
                                </td>
                                <td>{new Date(objeto.dt_lancamento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                            </tr>
                        )
                    )}
                </tbody>

                </Table>
            )}

        </div>
    );
}

export default Tabela;