import { useContext, useState } from 'react';
import TipoFinanceiroContext from './TipoFinanceiroContext';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Dialogo from '../../comuns/Dialogo';
import Alerta from '../../comuns/Alerta';

function Formulario() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm
    } = useContext(TipoFinanceiroContext);

    const [validated, setValidated] =
        useState(false);

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
            id="modalTipoFinanceiro"
            titulo="Tipo Financeiro"
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
            onSubmit={handleSubmit}
            validated={validated}
        >

            <Alerta alerta={alerta} />

            <Col xs={12} className="mb-3">

               <Form.Label>ID Tipo</Form.Label>
               <Form.Control
                    type="number"
                    name="id_tipo"
                    value={objeto?.id_tipo || ""}
                    onChange={handleChange}
                    required
                />

                <Form.Control.Feedback type="invalid">
                    Informe o ID do tipo
                </Form.Control.Feedback>
            </Col>

            <Col xs={12}>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    type="text"
                    name="ds_tipo"
                    value={objeto?.ds_tipo || ""}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">Informe a descrição</Form.Control.Feedback>
            </Col>

        </Dialogo>
    );
}

export default Formulario;