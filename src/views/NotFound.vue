<template>
  <div class="not-found-page-container">
    <div class="image-container">
      <LampIcon />
    </div>
    <div class="content">
      <h1 class="status-code">404</h1>
      <h3 class="status-text">{{ $i18n.t("layout:pageNotFoundTitle") }}</h3>
      <p class="message">
        {{ $i18n.t("layout:pageNotFoundMessage") }}
      </p>
      <div>
        <BaseButton variant="outline-secondary" @click="goToHome">
          {{ $i18n.t("layout:goToHome") }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { BaseButton } from "@tager/admin-ui";

import LampIcon from "../components/LampIcon.vue";

export default defineComponent({
  name: "NotFound",
  components: { LampIcon, BaseButton },
  setup() {
    const router = useRouter();

    function goToHome() {
      router.push("/");
    }

    return { goToHome };
  },
});
</script>

<style scoped lang="scss">
.not-found-page-container {
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
