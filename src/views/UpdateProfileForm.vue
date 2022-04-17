<template>
  <Page
    :title="$i18n.t('layout:changeUserProfile')"
    :is-content-loading="isInitialLoading"
  >
    <form novalidate @submit.prevent>
      <FormField
        v-model:value="values.name"
        name="name"
        :label="$i18n.t('layout:name')"
        :error="errors.name"
      />

      <FormField
        v-model:value="values.email"
        name="email"
        :label="$i18n.t('layout:email')"
        :error="errors.email"
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
import { defineComponent, onMounted, ref } from "vue";
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

import {
  getUserProfile,
  updateUserProfile,
  type UserProfileType,
} from "../services/requests";
import Page from "../components/Page/Page.vue";

export default defineComponent({
  name: "UpdateProfileForm",
  components: { Page, FormField, FormFooter },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const i18n = useI18n();
    const values = ref({ name: "", email: "" });
    const errors = ref({});
    const isSubmitting = ref(false);
    const isInitialLoading = ref(false);

    function convertProfileToInitialValues(profile: UserProfileType) {
      return {
        name: profile.name,
        email: profile.email,
      };
    }

    onMounted(() => {
      isInitialLoading.value = true;

      getUserProfile()
        .then((response) => {
          values.value = convertProfileToInitialValues(response.data);
        })
        .catch((error) => {
          console.error(error);

          toast.show({
            variant: "danger",
            title: "Error",
            body: "Server error",
          });
        })
        .finally(() => {
          isInitialLoading.value = false;
        });
    });

    function handleFormSubmit(event: TagerFormSubmitEvent) {
      isSubmitting.value = true;

      updateUserProfile(values.value)
        .then(() => {
          errors.value = {};

          if (event.type === "save_exit") {
            router.push("/");
          }

          toast.show({
            variant: "success",
            title: "Success",
            body: i18n.t("layout:changeUserProfileSuccess"),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          toast.show({
            variant: "danger",
            title: "Error",
            body: i18n.t("layout:changeUserProfileFailure"),
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    return { values, errors, isSubmitting, isInitialLoading, handleFormSubmit };
  },
});
</script>

<style scoped lang="scss"></style>
