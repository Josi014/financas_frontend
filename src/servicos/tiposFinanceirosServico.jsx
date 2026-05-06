const API = process.env.REACT_APP_ENDERECO_API;

export const getTiposFinanceirosAPI = async () => {
    const response = await fetch(`${API}/tiposfinanceiros`);
    if (!response.ok) {
        throw new Error("Erro ao buscar tipos financeiros");
    }
    return await response.json();
};
export const getTipoFinanceiroPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${API}/tiposfinanceiros/${codigo}`)
    return await response.json()
}

export const deleteTipoFinanceiroPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${API}/tiposfinanceiros/${codigo}`,{
        method: "DELETE"
    })
    return await response.json()
}

export const cadastraTipoFinanceiroAPI = async (objeto, metodo) => {
    const response = await fetch(`${API}/tiposfinanceiros`,{
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    })
    return await response.json()
}