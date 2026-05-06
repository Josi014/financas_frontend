import { useEffect, useState, useContext } from "react";

import Alerta from "../comuns/Alerta";
import LancamentoContext from "../telas/Lancamentos/LancamentoContext";
import Tabela from "../telas/Lancamentos/Tabela";
import Formulario from "../telas/Lancamentos/Formulario";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

  const {
    exibirForm,
    setExibirForm,
    listaObjetos,
    alerta

  } = useContext(LancamentoContext);

  const [usuario, setUsuario] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [mes, setMes] = useState("");

  useEffect(() => {
    const u = JSON.parse(
      localStorage.getItem("usuario")
    );
    setUsuario(u);

  }, []);

  const listaFiltrada =
    listaObjetos.filter((objeto) => {

      const descricao =
        objeto.ds_lancamento
          ?.toLowerCase()
          .includes(
            filtro.toLowerCase()
          );

      if (!mes) return descricao;

      return objeto.dt_lancamento
        .includes(mes);
    });

  const entradas = listaFiltrada
    ?.filter(l => l.tp_natureza === "ENTRADA").reduce((t, l) => t + Number(l.vl_lancamento), 0);
  const saidas = listaFiltrada
    ?.filter(l => l.tp_natureza === "SAIDA").reduce((t, l) => t + Number(l.vl_lancamento), 0);
  const saldo = entradas - saidas;

  return (
    <div className="container mt-4">
      <Alerta alerta={alerta} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Bem-vindo 👋</h2>
          {usuario && (
            <div className="alert alert-success mt-3">
              Olá,
              <strong>
                {" "}
                {usuario.nm_pessoa}
              </strong>
              💰
            </div>
          )}
        </div>
        <button className="btn btn-primary" onClick={() => setExibirForm(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Novo Lançamento
        </button>
      </div>
      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Pesquisar lançamento"
            value={filtro}
            onChange={(e) =>
              setFiltro(
                e.target.value
              )
            }
          />

        </Col>

        <Col md={4}>

          <Form.Control
            type="month"
            value={mes}
            onChange={(e) =>
              setMes(
                e.target.value
              )
            }
          />

        </Col>

      </Row>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Entradas</h5>
              <h2 className="text-success">R$ {entradas.toFixed(2)}🤑</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Saídas</h5>
              <h2 className="text-danger">R$ {saidas.toFixed(2)} 💸</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Saldo</h5>
              <h2 className="text-primary">
                R$ {saldo.toFixed(2)}🏦
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Tabela
        listaObjetos={
          listaFiltrada
        }
      />
      {exibirForm && (
        <Formulario />
      )}

    </div>
  );
}

export default Home;