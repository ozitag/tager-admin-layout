<script lang="js">
import Vue from "vue";
import { BaseButton } from "@tager/admin-ui";

export default Vue.extend({
  name: "PageFooter",
  functional: true,
  props: {
    backHref: {
      type: String,
      default: "/"
    },
    backLabel: {
      type: String,
      default: "Back"
    },
    onSubmit: {
      type: Function,
      default: () => {
        console.error("Please, specify \"onSubmit\" prop for page footer");
      }
    },
    submitLabel: {
      type: String,
      default: ""
    },
    submitAndExitLabel: {
      type: String,
      default: ""
    },
    isSubmitButtonDisabled: Boolean,
    isSubmitting: Boolean,
    footerSlot: {
      type: [Object, Array],
      default: null
    }
  },
  render(createElement, context) {
    if (context.props.footerSlot) return context.props.footerSlot;

    function goBack() {
      if (context.root && context.root.$previousRoute) {
        context.parent.$router.back();
      } else if (context.parent && context.parent.root && context.parent.root && context.parent.root.$previousRoute) {
        context.parent.$router.back();
      } else if (context.props.backHref) {
        context.parent.$router.push(context.props.backHref);
      } else {
        console.error("Please, specify \"backHref\" prop for page footer");
      }
    }

    return createElement("footer", { class: "page-footer" }, [
      createElement("div", { class: "bottom" }, [
        createElement(
          BaseButton,
          {
            class: "footer-button",
            props: { variant: "secondary" },
            on: {
              click: goBack
            }
          },
          context.props.backLabel
        ),
        createElement("div", { class: "bottom-right" }, [
          createElement(
            BaseButton,
            {
              class: "footer-button",
              props: {
                variant: "primary",
                loading: context.props.isSubmitting,
                disabled: context.props.isSubmitButtonDisabled
              },
              on: {
                click: () => {
                  context.props.onSubmit({ shouldExit: false });
                }
              }
            },
            context.props.submitLabel || context.parent.$t("layout:save")
          ),

          createElement(
            BaseButton,
            {
              class: "footer-button",
              props: {
                variant: "primary",
                loading: context.props.isSubmitting,
                disabled: context.props.isSubmitButtonDisabled
              },
              on: {
                click: () => {
                  context.props.onSubmit({ shouldExit: true });
                }
              }
            },
            context.props.submitAndExitLabel ||
            context.parent.$t("layout:saveAndExit")
          )
        ])
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

.bottom-right {
  .footer-button:first-child {
    margin-right: 1rem;
  }
}
</style>
