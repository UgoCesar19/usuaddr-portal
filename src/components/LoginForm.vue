<template>
  <h1
    class="text-center mt-10">Who are You?</h1>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8 mt-3" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          type="password"
          placeholder="Enter your password"
          clearable
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
        <p class="text-center mt-5">Do not have an account?</p>
        <p class="text-center"><router-link to="/user">Create it!</router-link></p>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore();

  const form = ref(false);
  const email = ref(null);
  const password = ref(null);
  const loading = ref(false);

  async function onSubmit () {
    if (!form.value)
      return;
    
    await authStore.login(email.value, password.value);

    loading.value = false;

  }

  function required (v) {
    return !!v || 'Field is required'
  }

</script>