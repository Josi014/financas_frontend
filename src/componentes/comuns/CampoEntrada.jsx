import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CampoEntrada({
    value,
    name,
    label,
    tipo = "text",
    requerido = false,
    id,
    onchange,
    msgvalido,
    msginvalido,
    readonly = false,
    maxCaracteres,
    isInvalid = false,
    isValid = false
}) {
    return (
        <FloatingLabel controlId={id} label={label} className="mb-3">

            <Form.Control
                type={tipo}
                required={requerido}
                name={name}
                value={value}
                onChange={onchange}
                readOnly={readonly}
                maxLength={maxCaracteres}
                isInvalid={isInvalid}
                isValid={isValid}
            />

            {msgvalido && (
                <Form.Control.Feedback>
                    {msgvalido}
                </Form.Control.Feedback>
            )}

            {msginvalido && (
                <Form.Control.Feedback type="invalid">
                    {msginvalido}
                </Form.Control.Feedback>
            )}

        </FloatingLabel>
    );
}

export default CampoEntrada;