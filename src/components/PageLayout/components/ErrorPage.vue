<template>
  <div class="error-page">
    <div class="inner">
      <span class="status-code">{{ code }}</span>
      <Nl2Br class="status-text" tag="p" :text="text" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Nl2Br } from "@tager/admin-ui";

export default defineComponent({
  name: "ErrorPage",
  components: { Nl2Br },
  props: {
    code: {
      type: [Number, String],
      required: true,
    },
    text: {
      type: [Number, String],
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.error-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-bottom: 35px;
  text-align: center;
  color: #262626;
  background-color: rgb(245, 245, 245);

  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
  }

  .status-code {
    max-width: 100%;
    font-size: 180px;
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
    text-shadow: 0 0 1px #000;

    @media (max-width: 1259.98px) {
      font-size: 160px;
    }

    @media (max-width: 1023.98px) {
      font-size: 130px;
    }

    @media (max-width: 767.98px) {
      font-size: 100px;
    }
  }

  .status-text {
    max-width: 100%;
    margin-top: 25px;
    font-size: 40px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #000;

    @media (max-width: 1259.98px) {
      font-size: 32px;
    }

    @media (max-width: 1023.98px) {
      font-size: 26px;
    }

    @media (max-width: 767.98px) {
      font-size: 18px;
    }
  }
}
</style>
