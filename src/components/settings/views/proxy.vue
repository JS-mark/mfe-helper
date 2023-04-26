<template>
  <n-form
    ref="formRef"
    :model="model"
    label-placement="left"
    label-width="auto"
    class="form"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="使用代理" path="useProxy">
      <n-switch v-model:value="model.useProxy" />
    </n-form-item>

    <n-form-item label="协议" path="origin">
      <n-select
        :disabled="!model.useProxy"
        v-model:value="model.origin"
        placeholder="选择协议"
        :options="origins"
        value-field="key"
      />
    </n-form-item>

    <n-form-item label="主机" path="host">
      <n-input
        v-model:value="model.host"
        :disabled="!model.useProxy"
        placeholder="输入主机地址"
      />
    </n-form-item>

    <n-form-item label="端口" path="port">
      <n-input
        v-model:value="model.port"
        :disabled="!model.useProxy"
        placeholder="请输入端口"
      />
    </n-form-item>
  </n-form>
  <!-- footer -->
  <section class="row f-end a-center">
    <n-space class="user-control a-center">
      <slot name="control"></slot>
      <!-- 取消 -->
      <n-button strong secondary type="error" @click="cancel">取消</n-button>
      <!-- 确认 -->
      <n-button @click="confirm" strong secondary type="primary">确认</n-button>
    </n-space>
  </section>
</template>

<script lang="ts">
/**
 * 代理设置
 */
export default {
  name: "Proxy",
};
</script>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
import { reactive, onBeforeMount } from "vue";
import { useSettingsStore, SettingSpace } from "@/store/useSettings";
const store = useSettingsStore();
const message = useMessage();
const model = reactive<SettingSpace.Proxy>({
  origin: "http",
  useProxy: false,
  host: "",
  port: "",
});

onBeforeMount(() => {
  for (const [key, value] of Object.entries(store.proxy)) {
    Reflect.set(model, key, value);
  }
});

const origins = [
  { label: "HTTP", key: "http" },
  { label: "HTTPS", key: "https" },
];

const confirm = () => {
  cancel();
  store.setSettingsByData({ proxy: model });
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
  height: 390px
</style>
