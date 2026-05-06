import { useState } from "react";
import { cadastraUsuarioAPI } from "../../../servicos/usuariosServico";

function Cadastro() {

    const [nm_pessoa, setNome] = useState("");
    const [ds_email, setEmail] = useState("");
    const [ds_senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const salvar = async () => {
    try {

        const retorno = await cadastraUsuarioAPI({
            nm_pessoa,
            ds_email,
            ds_senha
        }, "POST");

        console.log("RETORNO:", retorno);

        if (retorno.cd_pessoa) {
            setMensagem("Usuário criado com sucesso!");

            setNome("");
            setEmail("");
            setSenha("");
        } else {
            setMensagem(retorno.message || "Erro ao cadastrar usuário");
        }

    } catch (error) {
        console.log(error);
        setMensagem("Erro ao conectar com o servidor");
    }
   };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card p-4 shadow" style={{ width: "380px" }}>

                <h3 className="text-center mb-3">Cadastro</h3>

                <input
                    className="form-control mb-2"
                    placeholder="Nome"
                    value={nm_pessoa}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    value={ds_email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Senha"
                    value={ds_senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button
                    className="btn btn-success w-100"
                    onClick={salvar}
                >
                    Criar conta
                </button>

                {mensagem && (
                    <div className="alert alert-info mt-3 text-center">
                        {mensagem}
                    </div>
                )}

            </div>

        </div>
    );
}

export default Cadastro;