const API = process.env.REACT_APP_ENDERECO_API;

export const getUsuariosAPI = async () => {
    const response = await fetch(`${API}/usuarios`)
    return await response.json()
}

export const getUsuarioPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${API}/usuarios/${codigo}`)
    return await response.json()
}

export const deleteUsuarioPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${API}/usuarios/${codigo}`,{
        method: "DELETE"
    })
    return await response.json()
}

export const cadastraUsuarioAPI = async (objeto, metodo) => {
    const response = await fetch(`${API}/usuarios`,{
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    })
    return await response.json()
}

export const loginUsuarioAPI = async (obj) => {
    const response = await fetch(`${API}/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });

    return await response.json();
};