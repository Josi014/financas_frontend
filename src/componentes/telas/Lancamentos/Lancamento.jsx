import { useState, useEffect } from 'react';
import LancamentoContext from './LancamentoContext';
import Carregando from '../../comuns/Carregando';
import {
    getLancamentosAPI,
    deleteLancamentoPorCodigoAPI,
    cadastraLancamentoAPI
} from '../../../servicos/lancamentosServico';

function Lancamento(props) {

    const [alerta, setAlerta] = useState({
        status: "",
        message: ""
    });

    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [objeto, setObjeto] = useState({});
    const [exibirForm, setExibirForm] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setObjeto({...objeto, [name]: value});
    };

    const selecionarObjeto = (objeto) => {
        const dataFormatada = new Date(objeto.dt_lancamento).toISOString().split("T")[0];
        setObjeto({...objeto, dt_lancamento: dataFormatada});
        setExibirForm(true);
    };

    const acaoCadastrar = async (event) => {
        event.preventDefault();
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        const objetoEnvio = {
          ...objeto,
          vl_lancamento: Number(objeto.vl_lancamento),
          dt_lancamento: new Date(objeto.dt_lancamento),
          cd_pessoa: Number(usuario.cd_pessoa),
          cd_tipo_financeiro: Number(objeto.cd_tipo_financeiro),
          id_tipo: Number(objeto.id_tipo),
          tp_natureza: Number(objeto.cd_tipo_financeiro) === 1 ? "ENTRADA" : "SAIDA"
        };

        const metodo = objeto.cd_lancamento ? "PUT" : "POST";
        const retorno = await cadastraLancamentoAPI(objetoEnvio,metodo);

        if (retorno.status === "error") {
            setAlerta({
                status: "error",
                message: retorno.message
            });
            return;
        }

        setAlerta({
            status: "success", 
            message: objeto.cd_lancamento ? "Lançamento atualizado com sucesso" : "Lançamento cadastrado com sucesso"
        });
        setExibirForm(false);
        setObjeto({});
        recuperaLancamentos();
    };

    const recuperaLancamentos = async () => {
        setCarregando(true);
        const dados = await getLancamentosAPI();
        setListaObjetos(dados);
        setCarregando(false);
    };

    const remover = async (codigo) => {
        if (window.confirm('Deseja remover este lançamento?')) {
            let retornoAPI = await deleteLancamentoPorCodigoAPI(codigo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            recuperaLancamentos();
        }
    };

    useEffect(() => {
        recuperaLancamentos();
    }, []);

    return (
        <Carregando carregando={carregando}>
        <LancamentoContext.Provider
            value={{
                alerta,
                setAlerta,
                listaObjetos,
                setListaObjetos,
                carregando,
                setCarregando,
                objeto,
                setObjeto,
                exibirForm,
                setExibirForm,
                handleChange,
                selecionarObjeto,
                acaoCadastrar,
                remover,
                recuperaLancamentos
            }}
        >
            
        {props.children}

        </LancamentoContext.Provider>
        </Carregando>
    );
}

export default Lancamento;