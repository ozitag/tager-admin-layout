<script lang="js">
import Vue from 'vue';
import { BaseButton, PageTitle } from '@tager/admin-ui';

export default Vue.extend({
  name: 'Top',
  props: {
    title: {
      type: String,
      default: '',
    },
    buttonList: {
      type: Array,
      default: () => []
    },
    topSlot: {
      type: [Object, Array],
      default: null
    },
  },
  render(createElement) {
    if (this.topSlot) return this.topSlot;

    return createElement('div', { class: 'top' }, [
      this.title ? createElement(PageTitle, this.title) : null,
      this.buttonList.length > 0 ? createElement('div', { class: 'button-list' }, this.buttonList.map(buttonConfig => {
        return createElement(
          BaseButton, {
            props: {
              variant: buttonConfig.variant ?? 'outline-secondary',
              href: buttonConfig.href
            },
            on: {
              click: (event) => {
                if (buttonConfig.onClick) {
                  buttonConfig.onClick(event);
                }
              }
            },
            attrs: {
              target: buttonConfig.target
            },
            class: buttonConfig.class,
            style: buttonConfig.style,
          },
          buttonConfig.text
        )
      })) : null
    ].filter(Boolean))
  }
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
  button:not(:last-child) {
    margin-right: 1rem;
  }
}
</style>
