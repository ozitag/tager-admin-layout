<template>
  <Page :title="$i18n.t('layout:changeUserPassword')">
    <form novalidate @submit.prevent>
      <FormField
        v-model:value="values.oldPassword"
        name="oldPassword"
        :label="$i18n.t('layout:currentPassword')"
        :error="errors.oldPassword"
        type="password"
      />

      <FormField
        v-model:value="values.newPassword"
        name="newPassword"
        :label="$i18n.t('layout:newPassword')"
        :error="errors.newPassword"
        type="password"
      />
    </form>

    <template #footer>
      <FormFooter
        :back-label="$i18n.t('layout:back')"
        :is-submitting="isSubmitting"
        @submit="handleFormSubmit"
      ></FormFooter>
    </template>
  </Page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import {
  convertRequestErrorToMap,
  useI18n,
  useToast,
} from "@tager/admin-services";
import {
  FormField,
  FormFooter,
  type TagerFormSubmitEvent,
} from "@tager/admin-ui";

import { updateUserPassword } from "../services/requests";
import Page from "../components/Page/Page.vue";

export default defineComponent({
  name: "UpdateUserPasswordForm",
  components: { Page, FormField, FormFooter },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const i18n = useI18n();
    const values = ref({ oldPassword: "", newPassword: "" });
    const errors = ref({});
    const isSubmitting = ref(false);

    function handleFormSubmit(event: TagerFormSubmitEvent) {
      isSubmitting.value = true;

      updateUserPassword(values.value)
        .then(() => {
          errors.value = {};

          if (event.type === "save_exit") {
            router.push("/");
          }

          toast.show({
            variant: "success",
            title: "Success",
            body: i18n.t("layout:changeUserPasswordSuccess"),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          toast.show({
            variant: "danger",
            title: "Error",
            body: i18n.t("layout:changeUserPasswordFailure"),
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    return { values, errors, handleFormSubmit, isSubmitting };
  },
});
</script>

<style scoped lang="scss"></style>
