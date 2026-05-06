import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Dialogo({
    exibirForm,
    setExibirForm,
    titulo,
    id,
    onSubmit,
    validated,
    children,
    textoBotao = "Salvar"
}) {
    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)} centered>

            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>

            <Form
                id={id}
                onSubmit={onSubmit}
                noValidate
                validated={validated}
            >
                <Modal.Body>
                    <Container>
                        <Row>
                            {children}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExibirForm(false)}>
                        Fechar
                    </Button>
                    <Button variant="success" type="submit">
                        {textoBotao} <i className="bi bi-save"></i>
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default Dialogo;