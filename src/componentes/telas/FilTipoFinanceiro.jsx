import TipoFinanceiroProvider from './TipoFinanceiro/TipoFinaceiro';
import TabelaTipoFinanceiro from './TipoFinanceiro/TabelaTipoFinanceiro';
import Formulario from './TipoFinanceiro/FormularioTipoFinanceiro';

function TipoFinanceiroPagina() {
    return (
        <TipoFinanceiroProvider>
            <TabelaTipoFinanceiro />
            <Formulario />
        </TipoFinanceiroProvider>
    );
}

export default TipoFinanceiroPagina;