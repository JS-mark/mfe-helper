<template>
  <div class="form">
    <span>dddd</span>
    <!-- footer -->
    <section class="row f-end a-center">
      <n-space class="user-control a-center">
        <slot name="control"></slot>
        <!-- 取消 -->
        <n-button strong secondary type="error" @click="cancel">取消</n-button>
        <!-- 确认 -->
        <n-button @click="confirm" strong secondary type="primary">
          确认
        </n-button>
      </n-space>
    </section>
  </div>
</template>

<script lang="ts">
/**
 * 命令设置
 */
export default {
  name: "CMD",
};
</script>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
import { reactive, onBeforeMount } from "vue";
import { useSettingsStore, SettingSpace } from "@/store/useSettings";
const store = useSettingsStore();
const message = useMessage();
const model = reactive<SettingSpace.Cmd>({
  cmd: "",
});

onBeforeMount(() => {
  for (const [key, value] of Object.entries(store.cmd)) {
    Reflect.set(model, key, value);
  }
});

const confirm = () => {
  cancel();
  store.setSettingsByData({ cmd: model });
  message.success("更新配置成功！");
};
const cancel = () => {
  store.hide();
};
</script>

<style lang="stylus" scoped>
.tip
  color #718096
  font-size 12px
  margin-top 6px

.form
  height 423px
</style>
