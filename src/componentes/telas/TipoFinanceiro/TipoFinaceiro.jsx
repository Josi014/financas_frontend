import { useState, useEffect } from 'react';
import TipoFinanceiroContext from './TipoFinanceiroContext';
import {
    getTiposFinanceirosAPI,
    deleteTipoFinanceiroPorCodigoAPI,
    cadastraTipoFinanceiroAPI
} from '../../../servicos/tiposFinanceirosServico';

function TipoFinanceiroProvider({ children }) {

    const [alerta, setAlerta] = useState({
        status: "",
        message: ""
    });

    const [listaObjetos, setListaObjetos] = useState([]);
    const [objeto, setObjeto] = useState({});
    const [exibirForm, setExibirForm] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setObjeto({...objeto, [name]: value});
    };

    const selecionarObjeto = (objeto) => {
        setObjeto(objeto);
        setExibirForm(true);
    };

    const recuperaTipos = async () => {
        setListaObjetos(await getTiposFinanceirosAPI());
    };
    const acaoCadastrar = async (event) => {
        event.preventDefault();
        const metodo = objeto.cd_tipo_financeiro ? "PUT" : "POST";
    
        const objetoEnvio = {
            ...objeto,
            id_tipo: Number(objeto.id_tipo),
            ds_tipo: objeto.ds_tipo
        };
    
        const retorno = await cadastraTipoFinanceiroAPI(objetoEnvio, metodo);
        console.log("RETORNO:", retorno);
    
        if (retorno.cd_tipo_financeiro) {
            setAlerta({
                status: "success",
                message: "Tipo financeiro salvo com sucesso"
            });
    
            setObjeto({});
            setExibirForm(false);
            recuperaTipos();
        } else {
            setAlerta({
                status: "error",
                message: retorno.message || "Erro ao salvar"
            });
        }
    };     
    
    const remover = async (codigo) => {
        if (window.confirm('Deseja remover este tipo financeiro?')) {
            let retorno = await deleteTipoFinanceiroPorCodigoAPI(codigo);
            setAlerta({
                status: retorno.status,
                message: retorno.message
            });
            recuperaTipos();
        }
    };

    useEffect(() => {

        recuperaTipos();

    }, []);

    return (

        <TipoFinanceiroContext.Provider
            value={{
                alerta,
                setAlerta,
                listaObjetos,
                setListaObjetos,
                objeto,
                setObjeto,
                exibirForm,
                setExibirForm,
                handleChange,
                selecionarObjeto,
                acaoCadastrar,
                remover,
                recuperaTipos
            }}
        >

            {children}

        </TipoFinanceiroContext.Provider>
    );
}

export default TipoFinanceiroProvider;