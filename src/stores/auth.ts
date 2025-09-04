import { defineStore } from 'pinia'
import { appAxios } from "@/infra/axios"
import { useSnackbarStore } from "@/stores/snackbar"
import type { AuthResponse } from "@/model/AuthResponse"
import type { Credenciais } from "@/model/Credenciais"
import type { AxiosResponse } from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authResponse: null as AuthResponse | null
  }),

  getters: {
    tokenAcesso: (state) => state.authResponse?.tokenAcesso || null,
    refreshToken: (state) => state.authResponse?.refreshToken || null
  },

  actions: {
    async login(email: string, senha: string) {
      const credenciais: Credenciais = { email, senha }
      const snackbar = useSnackbarStore()

      try {
        const response: AxiosResponse = await appAxios.post<AuthResponse>('/autenticar', credenciais);
        this.authResponse = response.data;
        snackbar.show('Usuário autenticado!', 'success');
      } catch (e: any) {
        if (e.response) {
          console.log("Erro na autenticação: " + JSON.stringify(e.response.data))
        } else if (e.request) {
          console.log("Sem resposta do servidor: ", e.request)
        } else {
          console.log("Erro inesperado: ", e.message || e)
        }
      }
    },

    logout() {
      this.authResponse = null
    }
  }
})