import axios from "axios";
import { useAuthStore } from '@/stores/auth';
import { useSnackbarStore } from '@/stores/snackbar';
import router from "@/router";

export const appAxios = axios.create({
  baseURL: 'http://localhost:8080/usuaddr/',
  timeout: 30000,
});

appAxios.interceptors.request.use((conifg) => {
    const { method, url, params, data } = conifg;
    console.log(
        `➡️ [Axios Request] ${method} ${url}, params: ${params} , body: ${JSON.stringify(
        data
        )}`
    );
    return conifg;
});

appAxios.interceptors.response.use((response) => {
    console.log(
        `➡️ [Axios Response] status: ${response.status}  body: ${JSON.stringify(
            response.data
        )}`
    );
    return response;
});

appAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const snackbar = useSnackbarStore();

        if (error.response) {
            const msg = error.response.data?.message || error.response.data || 'Erro inesperado';
            snackbar.show(msg, 'error');
        } else if (error.request) {
            snackbar.show('Sem resposta do servidor', 'error');
        } else {
            snackbar.show('Erro inesperado: ' + error.message, 'error');
        }

        return Promise.reject(error)
    }
);

appAxios.interceptors.response.use(
    (respose) => respose,
    (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
            router.push('/login');
        } else {
            return Promise.reject(error);
        }
    }
);

appAxios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.tokenAcesso;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})