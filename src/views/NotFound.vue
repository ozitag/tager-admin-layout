<template>
  <div class="container">
    <div class="image-container">
      <lamp-svg-image />
    </div>
    <div class="content">
      <h1 class="status-code">404</h1>
      <h3 class="status-text">{{ $t('pageNotFoundTitle') }}</h3>
      <p class="message">
        {{ $t('pageNotFoundMessage') }}
      </p>
      <div>
        <base-button variant="outline-secondary" @click="goToHome">
          {{ $t('goToHome') }}
        </base-button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import { BaseButton } from '@tager/admin-ui';

import LampSvgImage from '../assets/svg/lamp.svg';

export default Vue.extend({
  name: 'NotFound',
  components: { LampSvgImage, BaseButton },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  flex: 1;
  width: 100%;
  padding: 0 15px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
  }
}

.image-container {
  width: 200px;
  height: 200px;
  margin-right: 4rem;

  svg {
    width: 200px;
    height: 200px;
  }
}

.status-code {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: red;
}

.status-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.message {
  color: #666;
  margin-bottom: 1.5rem;
}
</style>
