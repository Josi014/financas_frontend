import { useContext } from 'react';
import TipoFinanceiroContext from './TipoFinanceiroContext';
import Table from 'react-bootstrap/Table';
import Alerta from '../../comuns/Alerta';

function Tabela() {

    const {
        alerta,
        listaObjetos,
        // remover,
        // selecionarObjeto,
        // setExibirForm
    } = useContext(TipoFinanceiroContext);

    return (

        <div style={{ padding: '20px' }}>

            <h1>Tipos Financeiros</h1>

            {/* <Button variant="primary" onClick={() => setExibirForm(true)}>Novo</Button> */}
            <Alerta alerta={alerta} />

            {listaObjetos.length === 0 &&
                <h3>Nenhum registro encontrado</h3>
            }

            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {/* <th>Ações</th> */}
                            <th>ID</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.cd_tipo_financeiro}>
                                {/* <td>
                                    <Button variant="info" onClick={() => selecionarObjeto(objeto)}>✏</Button>
                                    <Button variant="danger" onClick={() => remover(objeto.cd_tipo_financeiro)}>🗑</Button>
                                </td> */}
                                <td>{objeto.cd_tipo_financeiro}</td>
                                <td>{objeto.ds_tipo}</td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
            )}

        </div>
    );
}

export default Tabela;