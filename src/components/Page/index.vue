<template>
  <div class="container">
    <top
      v-if="!isHeaderHidden"
      :title="title"
      :button-list="headerButtons"
      :top-slot="$slots.top"
    ></top>

    <div class="content-outer">
      <div class="content">
        <div class="content-inner">
          <slot name="content"></slot>
        </div>
      </div>
    </div>

    <footer v-if="!isFooterHidden" class="footer">
      <slot name="footer"></slot>
    </footer>
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
    isHeaderHidden: Boolean,
    isFooterHidden: Boolean
  },
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 0;
  background: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-outer {
  position: relative;
  background-color: white;
  padding: 1rem;
  flex: 1;
}

.content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.content-inner {
  max-height: 100%;
  overflow: auto;
  padding: 1rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 8px 15px;
  min-height: 50px;
  background: #fff;
  margin: 0 0 0;
  font-size: 14px;
}
</style>
