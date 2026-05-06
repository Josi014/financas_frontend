import { useState, useEffect } from 'react';
import TipoFinanceiroContext from '../TipoFinanceiro/TipoFinanceiroContext';
import {
    getTiposFinanceirosAPI,
    deleteTipoFinanceiroPorCodigoAPI
} from '../../../servicos/tiposFinanceirosServico';

function TipoFinanceiroProvider({ children }) {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaTipos = async () => {
        setListaObjetos(await getTiposFinanceirosAPI());
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
        <TipoFinanceiroContext.Provider value={{
            alerta,
            setAlerta,
            listaObjetos,
            remover,
            recuperaTipos
        }}>
            {children}
        </TipoFinanceiroContext.Provider>
    );
}

export default TipoFinanceiroProvider;