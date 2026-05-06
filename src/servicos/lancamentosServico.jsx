const API = process.env.REACT_APP_ENDERECO_API;

export const getLancamentosAPI = async () => {
    const response = await fetch(`${API}/lancamentos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export const getLancamentoPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${API}/lancamentos/${codigo}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export const deleteLancamentoPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${API}/lancamentos/${codigo}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export const cadastraLancamentoAPI = async (objeto, metodo) => {
    const response = await fetch(`${API}/lancamentos`,{
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    })
    const data = await response.json()
    return data
}
