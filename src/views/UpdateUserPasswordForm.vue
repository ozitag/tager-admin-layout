<template>
  <page
    title="Change password"
    :footer="{
      backHref: '/',
      backLabel: 'Back',
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <form novalidate @submit.prevent>
      <form-field
        v-model="values.oldPassword"
        name="oldPassword"
        label="Current password"
        :error="errors.oldPassword"
      />

      <form-field
        v-model="values.newPassword"
        name="newPassword"
        label="New password"
        :error="errors.newPassword"
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
  name: 'UpdateProfileForm',
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
    submitForm() {
      this.isSubmitting = true;

      console.log('Submit form', this.values);

      updateUserPassword(this.values)
        .then(() => {
          this.errors = {};
          this.$router.push('/');

          this.$toast({
            variant: 'success',
            title: 'Success',
            body: `Password successfully changed`,
          });
        })
        .catch((error) => {
          console.error(error);
          this.errors = convertRequestErrorToMap(error);
          this.$toast({
            variant: 'danger',
            title: 'Error',
            body: `Password update was failed`,
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
