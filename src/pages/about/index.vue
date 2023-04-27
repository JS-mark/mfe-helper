<template>
  <iframe
    src="https://js-mark.com/mfe-helper"
    class="container"
    frameborder="0"
  ></iframe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "About",
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" scoped>
.container
  border none
  margin 0
  padding: 0
  width 100%
  height 100%
</style>
