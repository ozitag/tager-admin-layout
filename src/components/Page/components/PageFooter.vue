<script lang="js">
import Vue from 'vue';
import { BaseButton } from '@tager/admin-ui';

export default Vue.extend({
  name: 'PageFooter',
  functional: true,
  props: {
    backHref: {
      type: String,
      default: '/'
    },
    backLabel: {
      type: String,
      default: 'Back'
    },
    onSubmit: {
      type: Function,
      default: () => {
        console.error('Please, specify "onSubmit" prop for page footer');
      }
    },
    submitLabel: {
      type: String,
      default: 'Submit'
    },
    footerSlot: {
      type: [Object, Array],
      default: null
    }
  },
  render(createElement, context) {
    if (context.props.footerSlot) return context.props.footerSlot;

    return createElement('footer', { class: 'page-footer' }, [
      createElement('div', { class: 'bottom' }, [
        createElement(BaseButton, {
          class: 'footer-button',
          props: { variant: 'secondary', href: context.props.backHref }
        }, context.props.backLabel),
        createElement(BaseButton, {
          class: 'footer-button',
          props: { variant: 'primary' },
          on: {
            click: (event) => {
              context.props.onSubmit(event);
            }
          },
        }, context.props.submitLabel),
      ])
    ]);
  }
});
</script>

<style scoped lang="scss">
.page-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 8px 15px;
  min-height: 55px;
  background: #fff;
  margin: 0 0 0;
  font-size: 14px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.footer-button {
  min-width: 100px;
}
</style>
