import { useState } from "react";
import { loginUsuarioAPI } from "../../servicos/usuariosServico";

function Login() {

    const [ds_email, setEmail] = useState("");
    const [ds_senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const entrar = async () => {
        try {
            const retorno = await loginUsuarioAPI({
                ds_email,
                ds_senha
            });

            console.log("RETORNO LOGIN:", retorno);

            if (retorno.status === "success") {
                localStorage.setItem("usuario", JSON.stringify(retorno.usuario));
                window.location.href = "/app";
            } else {
                setMensagem(retorno.message);
            }

        } catch (error) {
            console.log("ERRO FRONT LOGIN:", error);
            setMensagem("Erro ao conectar com o servidor");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card shadow p-4" style={{ width: "380px" }}>

                <h3 className="text-center mb-4">Login</h3>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        className="form-control"
                        placeholder="Digite seu email"
                        value={ds_email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Digite sua senha"
                        value={ds_senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={entrar}
                >
                    Entrar
                </button>

                <button className="btn btn-link w-100 mt-2" onClick={() => window.location.href = "/cadastro"}>
                    Criar conta
                </button>
                
                {mensagem && (
                    <div className="alert alert-danger mt-3 p-2 text-center">
                        {mensagem}
                    </div>
                )}

            </div>

        </div>
    );
}

export default Login;