<template>
  <div class="image-upload">
    <div 
      class="upload-area"
      :class="{ 'has-error': errorMessage }"
      @click="$refs.fileInput.$refs.input.click()"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <div v-if="!preview && !value" class="upload-placeholder">
        <v-icon size="40" color="grey darken-1">mdi-camera-plus</v-icon>
        <div class="upload-text mt-2">
          Click or drag image to upload
          <div class="upload-subtext">Maximum file size: {{ maxSize }}MB</div>
        </div>
      </div>

      <v-img
        v-else
        :src="preview || value"
        max-height="200"
        contain
        class="mx-auto"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-row>
        </template>
      </v-img>

      <v-fade-transition>
        <div v-if="preview || value" class="image-overlay">
          <v-btn small icon @click.stop="clearImage">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-fade-transition>
    </div>

    <v-file-input
      ref="fileInput"
      v-model="file"
      accept="image/*"
      class="d-none"
      @change="handleFileChange"
      :loading="loading"
      hide-input
    ></v-file-input>

    <v-scale-transition>
      <v-alert
        v-if="errorMessage"
        dense
        outlined
        type="error"
        class="mt-2 mb-0"
      >
        {{ errorMessage }}
      </v-alert>
    </v-scale-transition>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    value: String,
    maxSize: {
      type: Number,
      default: 5 // 5MB
    }
  },
  data() {
    return {
      file: null,
      preview: null,
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    clearImage() {
      this.file = null;
      this.preview = null;
      this.$emit('input', null);
      if (this.$refs.fileInput) {
        this.$refs.fileInput.reset();
      }
    },

    handleDrop(e) {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleFileChange(files[0]);
      }
    },

    async handleFileChange(file) {
      this.errorMessage = '';
      if (!file) {
        this.preview = null;
        this.$emit('input', null);
        return;
      }

      // Validate file size
      if (file.size > this.maxSize * 1024 * 1024) {
        this.errorMessage = `File size should not exceed ${this.maxSize}MB`;
        this.file = null;
        return;
      }

      try {
        this.loading = true;
        // Create preview
        this.preview = URL.createObjectURL(file);

        // Convert to base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result;
          this.$emit('input', base64String);
        };
        reader.onerror = () => {
          this.errorMessage = 'Error reading file';
          this.$emit('error', 'Error reading file');
        };
        reader.readAsDataURL(file);
      } catch (error) {
        this.errorMessage = 'Error processing image';
        this.$emit('error', error.message);
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    value(newVal) {
      if (!newVal) {
        this.file = null;
        this.preview = null;
      }
    }
  },
  beforeDestroy() {
    if (this.preview) {
      URL.revokeObjectURL(this.preview);
    }
  }
}
</script>

<style scoped>
.image-upload {
  width: 100%;
}

.upload-area {
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: #1976d2;
  background: #f5f5f5;
}

.upload-area.has-error {
  border-color: #ff5252;
}

.upload-placeholder {
  text-align: center;
  color: #757575;
}

.upload-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.upload-subtext {
  font-size: 0.75rem;
  color: #9e9e9e;
  margin-top: 4px;
}

.image-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

.image-overlay .v-btn {
  color: white !important;
}

.v-file-input {
  display: none;
}
</style>