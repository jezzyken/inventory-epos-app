<template>
  <v-sheet class="login-container" color="primary" height="100vh">
    <div class="text-center mb-6">
      <h1 class="text-h3 font-weight-bold white--text">Welcome Back</h1>
    </div>
    
    <v-card class="login-card pa-8" elevation="8" width="450">
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="email"
          label="Email Address"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          :rules="[rules.required, rules.email]"
          autocomplete="email"
        />

        <v-text-field
          v-model="password"
          label="Password"
          prepend-inner-icon="mdi-lock"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          variant="outlined"
          :rules="[rules.required]"
          @click:append="show = !show"
          autocomplete="current-password"
          class="mb-4"
        />

        <v-btn
          block
          color="primary"
          size="large"
          type="submit"
          :loading="isLoading"
          elevation="2"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="top"
      timeout="3000"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    show: false,
    isLoading: false,
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: 'error',
    rules: {
      required: v => !!v || 'This field is required',
      email: v => /.+@.+\..+/.test(v) || 'Invalid email address'
    }
  }),

  methods: {
    async login() {
      this.isLoading = true;
      try {
        const response = await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        });
        
        if (response.status === 500) {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        this.snackbarMessage = error.message;
        this.snackbar = true;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-card {
  border-radius: 16px;
  max-width: 90%;
}
</style>