import { appAxios } from "@/infra/axios";

const registrar = async (usuario: any): Promise<void> => {
    return appAxios
        .post('/registrar', usuario)
        .then((response) => {
            if (response) {
                return response.data
            }
        })
        .catch((error) => {
        console.log("Erro ao salvar o usuário:" + error);
        });
};

export default {
    registrar
};