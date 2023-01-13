<template>
  <div class="top">
    <PageTitle v-if="title">{{ title }}</PageTitle>
    <div v-if="slots.topRight">
      <slot name="topRight" />
    </div>
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
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 15px;
  min-height: 60px;

  > *:first-child {
    min-width: 300px;
    + * {
      margin-left: 20px;
    }
  }
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
