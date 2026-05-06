import { useContext, useState, useEffect } from 'react';
import LancamentoContext from './LancamentoContext';
import Col from 'react-bootstrap/Col';
import Dialogo from '../../comuns/Dialogo';
import CampoEntrada from '../../comuns/CampoEntrada';
import Alerta from '../../comuns/Alerta';
import Form from 'react-bootstrap/Form';
import { getTiposFinanceirosAPI } from '../../../servicos/tiposFinanceirosServico';

function Formulario() {
    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm
    } = useContext(LancamentoContext);

    const [validated, setValidated] = useState(false);
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        const carregarTipos = async () => {
            const response = await getTiposFinanceirosAPI();
            setTipos(response);
        };

        carregarTipos();
    }, []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity() === true) {
            acaoCadastrar(event);
        }
    };

    return (
        <Dialogo
            id="modalLancamento"
            titulo="Novo Lançamento"
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
            onSubmit={handleSubmit}
            validated={validated}
            textoBotao="Salvar"
        >
            <Alerta alerta={alerta} />

            <Col xs={12}>
                <CampoEntrada
                    label="Descrição"
                    name="ds_lancamento"
                    value={objeto?.ds_lancamento || ""}
                    onchange={handleChange}
                    requerido
                    id="desc"
                    msginvalido="Informe a descrição"
                />
            </Col>

            <Col xs={12}>
                <CampoEntrada
                    label="Valor"
                    tipo="number"
                    name="vl_lancamento"
                    value={objeto?.vl_lancamento || ""}
                    onchange={handleChange}
                    requerido
                    id="valor"
                    msginvalido="Informe o valor"
                />
            </Col>

            <Col xs={12}>
                <Form.Label>Tipo</Form.Label>

                <Form.Select
                    name="cd_tipo_financeiro"
                    value={objeto?.cd_tipo_financeiro || ""}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>

                    {tipos.map((tipo) => (
                        <option
                            key={tipo.cd_tipo_financeiro}
                            value={tipo.cd_tipo_financeiro}
                        >
                            {tipo.ds_tipo}
                        </option>
                    ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                    Informe o tipo
                </Form.Control.Feedback>
            </Col>

            <Col xs={12}>
                <CampoEntrada
                    label="Data"
                    tipo="date"
                    name="dt_lancamento"
                    value={objeto?.dt_lancamento || ""}
                    onchange={handleChange}
                    requerido
                    id="data"
                    msginvalido="Informe a data"
                />
            </Col>
        </Dialogo>
    );
}

export default Formulario;