<template>
  <div class="top">
    <PageTitle v-if="title">{{ title }}</PageTitle>
    <div v-if="buttonList.length > 0" class="button-list">
      <BaseButton
        v-for="(button, index) of buttons"
        :key="index"
        v-bind="button.props"
      >
        {{ button.children }}
      </BaseButton>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

import { BaseButton, PageTitle, type ButtonVariant } from "@tager/admin-ui";

export interface TopButtonConfigType {
  variant?: ButtonVariant;
  text?: string;
  onClick?: (event: Event) => void;
  class?: string | Record<string, unknown>[] | Record<string, unknown>;
  style?: string | Record<string, unknown>[] | Record<string, unknown>;
  href?: string;
  target?: string;
}

interface Props {
  title: string;
  buttonList: Array<TopButtonConfigType>;
}

export default defineComponent({
  name: "PageTop",
  components: { PageTitle, BaseButton },
  props: {
    title: {
      type: String,
      default: "",
    },
    buttonList: {
      type: Array as PropType<Array<TopButtonConfigType>>,
      default: () => [],
    },
  },
  setup(props: Props) {
    const buttons = computed(() => {
      return props.buttonList.map((buttonConfig) => ({
        props: {
          variant: buttonConfig.variant ?? "outline-secondary",
          href: buttonConfig.href,
          onClick: buttonConfig.onClick,
          target: buttonConfig.target,
          class: buttonConfig.class,
          style: buttonConfig.style,
        },
        children: buttonConfig.text,
      }));
    });

    return { buttons };
  },
});
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 15px;
  min-height: 60px;
}

.button-list {
  display: flex;

  button,
  a {
    white-space: nowrap;
  }

  button:not(:last-child),
  a:not(:last-child) {
    margin-right: 1rem;
  }
}
</style>
