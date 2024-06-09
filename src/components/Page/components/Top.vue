<template>
  <div class="top-wrapper">
    <div class="top">
      <PageTitle v-if="title">{{ title }}</PageTitle>
      <div v-if="slots.topCenter" class="top-center">
        <slot name="topCenter" />
      </div>
      <slot v-if="slots.topRight" name="topRight" />
      <div v-else-if="buttonList.length > 0" class="button-list">
        <BaseButton
          v-for="(button, index) of buttons"
          :key="index"
          v-bind="button.props"
        >
          {{ button.children }}
        </BaseButton>
      </div>
    </div>
    <slot name="topBottom" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, type PropType, useSlots } from "vue";

import { BaseButton, PageTitle, type ButtonVariant } from "@tager/admin-ui";

export interface TopButtonConfigType {
  variant?: ButtonVariant;
  text?: string;
  onClick?: (event: Event) => void;
  class?: string | Record<string, unknown>[] | Record<string, unknown>;
  style?: string | Record<string, unknown>[] | Record<string, unknown>;
  href?: string;
  target?: string;
  loading?: boolean;
  disabled?: boolean;
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
    const slots = useSlots();

    const buttons = computed(() => {
      return props.buttonList.map((buttonConfig) => ({
        props: {
          ...buttonConfig,
          variant: buttonConfig.variant ?? "outline-secondary",
        },
        children: buttonConfig.text,
      }));
    });

    return { buttons, slots };
  },
});
</script>

<style scoped lang="scss">
.top-wrapper {
  border-bottom: 1px solid #eee;
  padding: 10px 15px;
  min-height: 60px;
}

.top-center {
  flex: 1 1 1px;
  display: flex;
  margin-right: 10px;
  justify-content: center;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;
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
