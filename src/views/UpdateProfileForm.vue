<template>
  <page
    :title="$t('layout:changeUserProfile')"
    :is-content-loading="isInitialLoading"
    :footer="{
      backHref: '/',
      backLabel: $t('layout:back'),
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <form novalidate @submit.prevent>
      <form-field
        v-model="values.name"
        name="name"
        :label="$t('layout:name')"
        :error="errors.name"
      />

      <form-field
        v-model="values.email"
        name="email"
        :label="$t('layout:email')"
        :error="errors.email"
      />
    </form>
  </page>
</template>

<script lang="js">
import Vue from 'vue';
import {
  convertRequestErrorToMap, removeAuthTokensAndRedirectToAuthPage, RequestError
} from '@tager/admin-services';
import { getUserProfile, updateUserProfile } from '../services/requests';
import { isProduction } from '../utils/common';

export default Vue.extend({
  name: 'UpdateProfileForm',
  data() {
    return {
      values: {
        name: '',
        email: ''
      },
      errors: {},
      isSubmitting: false,
      isInitialLoading: false
    };
  },
  mounted() {
    this.isInitialLoading = true;

    getUserProfile()
        .then((response) => {
          this.values = this.convertProfileToInitialValues(response.data);
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);

          if (
              error instanceof RequestError &&
              error.status.code === 401 &&
              isProduction()
          ) {
            removeAuthTokensAndRedirectToAuthPage();
          } else {
            this.isLoading = false;

            this.$toast({
              variant: 'danger',
              title: 'Error',
              body: 'Server error'
            });
          }
        })
        .finally(() => {
          this.isInitialLoading = false;
        });

  },
  methods: {
    convertProfileToInitialValues(profile) {
      return {
        name: profile.name,
        email: profile.email
      };
    },
    submitForm() {
      this.isSubmitting = true;

      console.log('Submit form', this.values);

      updateUserProfile(this.values)
          .then(() => {
            this.errors = {};
            this.$router.push('/');

            this.$toast({
              variant: 'success',
              title: 'Success',
              body: this.$t('layout:changeUserProfileSuccess')
            });
          })
          .catch((error) => {
            console.error(error);
            this.errors = convertRequestErrorToMap(error);
            this.$toast({
              variant: 'danger',
              title: 'Error',
              body: this.$t('layout:changeUserProfileFailure')
            });
          })
          .finally(() => {
            this.isSubmitting = false;
          });
    }
  }
});
</script>

<style scoped lang="scss"></style>
