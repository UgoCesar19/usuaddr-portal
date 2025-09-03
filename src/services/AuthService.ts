import { appAxios } from "@/infra/axios";
import type { AuthResponse } from "@/model/AuthResponse";
import type { Credenciais } from "@/model/Credenciais";
import { useSnackbarStore } from "@/stores/snackbar";

let authResponse: AuthResponse;

const login = async (email: string, senha: string): Promise<void> => {

    let credenciais: Credenciais = {
        email: email,
        senha: senha
    };

    const snackbar = useSnackbarStore();

    return appAxios
        .post(`/autenticar`, credenciais)
        .then((response) => {
            authResponse = response.data;
            snackbar.show('Usuário autenticado!', 'success');
        })
        .catch((e) => {
            if (e.response) {
                // server responded with an error
                console.log("Erro na autenticação: " + JSON.stringify(e.response.data));
            } else if (e.request) {
                // request was made but no response
                console.log("Sem resposta do servidor: ", e.request);
            } else {
                // something else went wrong
                console.log("Erro inesperado: ", e.message);
            }
        });
};

export default {
  login
};