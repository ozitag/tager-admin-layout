<template>
  <page
    :title="$t('layout:changeUserPassword')"
    :footer="{
      backHref: '/',
      backLabel: $t('layout:back'),
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <form novalidate @submit.prevent>
      <form-field
        v-model="values.oldPassword"
        name="oldPassword"
        :label="$t('layout:currentPassword')"
        :error="errors.oldPassword"
        type="password"
      />

      <form-field
        v-model="values.newPassword"
        name="newPassword"
        :label="$t('layout:newPassword')"
        :error="errors.newPassword"
        type="password"
      />
    </form>
  </page>
</template>

<script lang="js">
import Vue from 'vue';
import {
  convertRequestErrorToMap
} from '@tager/admin-services';
import { updateUserPassword } from '../services/requests';

export default Vue.extend({
  name: 'UpdateUserPasswordForm',
  data() {
    return {
      values: {
        oldPassword: '',
        newPassword: '',
      },
      errors: {},
      isSubmitting: false,
    };
  },
  methods: {
    submitForm({ shouldExit }) {
      this.isSubmitting = true;

      updateUserPassword(this.values)
        .then(() => {
          this.errors = {};

          if (shouldExit) {
            this.$router.push('/');
          }

          this.$toast({
            variant: 'success',
            title: 'Success',
            body: this.$t('layout:changeUserPasswordSuccess'),
          });
        })
        .catch((error) => {
          console.error(error);
          this.errors = convertRequestErrorToMap(error);
          this.$toast({
            variant: 'danger',
            title: 'Error',
            body: this.$t('layout:changeUserPasswordFailure'),
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
});
</script>

<style scoped lang="scss"></style>
