<template>
  <v-snackbar
    v-model="snackbar.isVisible"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    location="bottom right"
    multi-line
  >
    {{ snackbar.message }}
    <template #actions>
      <v-btn color="white" variant="text" @click="snackbar.isVisible = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore()
</script>