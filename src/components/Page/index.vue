<template>
  <div class="container">
    <top
      v-if="!isHeaderHidden"
      :title="title"
      :button-list="headerButtons"
      :top-slot="$slots.top"
    ></top>

    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';

import Top from './components/Top';

export default Vue.extend({
  name: 'Page',
  components: { Top },
  props: {
    title: {
      type: String,
      default: '',
    },
    headerButtons: {
      type: Array,
      default: () => []
    },
    isHeaderHidden: Boolean
  },
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 0;
  background: #fff;
  flex: 1;
}

.content {
  background-color: white;
  padding: 15px;
}
</style>
