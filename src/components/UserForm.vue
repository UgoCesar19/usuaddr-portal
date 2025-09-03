<template>
  <h1
    class="text-center mt-10">New User</h1>
  <v-card class="mx-auto px-6 py-8 mt-3" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="id"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="User ID"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="name"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Name"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="E-Mail"
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
          Save User
        </v-btn>

        <v-btn
          class="mt-3"
          :disabled="!form"
          :loading="loading"
          color="warning"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Cancel
        </v-btn>
      </v-form>
    </v-card>
</template>
<script setup>
  import { ref } from 'vue';
  import Usuario from '../model/Usuario'

  const props = defineProps({
    usuario: Usuario
  });

  const form = ref(false);
  const id = ref(null);
  const name = ref(null);
  const email = ref(null);
  const password = ref(null);
  const loading = ref(false);

  function onSubmit () {
    if (!form.value)
        return;
    
    loading.value = true;

    setTimeout(() => {
        loading.value = false;
        const userData = {
            id: id.value,
            name: name.value,
            email: email.value,
            password: password.value
        };
        alert(JSON.stringify(userData, null, 2));
    }, 2000);

  }
  
  function required (v) {
    return !!v || 'Field is required';
  }

</script>