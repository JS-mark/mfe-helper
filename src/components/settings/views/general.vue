<template>
  <n-form
    ref="formRef"
    class="form"
    :model="model"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="语言" path="language">
      <n-select
        v-model:value="model.language"
        placeholder="选择语言"
        :options="languages"
        value-field="key"
      />
    </n-form-item>

    <n-form-item label="主题" path="theme">
      <n-select
        v-model:value="model.theme"
        placeholder="选择主题色"
        :options="themes"
        value-field="key"
      />
    </n-form-item>

    <n-form-item label="写入模式" path="writeMode">
      <section class="column">
        <n-radio-group v-model:value="model.writeMode" name="writeMode">
          <n-space>
            <n-radio value="1">追加</n-radio>
            <n-radio value="2">覆盖</n-radio>
          </n-space>
        </n-radio-group>
        <span class="tip">{{ writeModeTip }}</span>
      </section>
    </n-form-item>

    <n-form-item label="选择模式" path="selectedMode">
      <section class="column">
        <n-radio-group v-model:value="model.selectedMode" name="selectedMode">
          <n-space>
            <n-radio value="1">单选</n-radio>
            <n-radio value="2">多选</n-radio>
          </n-space>
        </n-radio-group>
        <span class="tip">
          只对顶层项目生效，每个文件夹可设置自己的选择模式。
        </span>
      </section>
    </n-form-item>

    <n-form-item label="显示托盘标题" path="palletTitle">
      <n-switch v-model:value="model.palletTitle" />
    </n-form-item>

    <n-form-item label="启动时隐藏" path="hideAtStartup">
      <n-switch v-model:value="model.hideAtStartup" />
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
 * 通用设置
 */
export default {
  name: "General",
};
</script>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
import { reactive, computed, onBeforeMount } from "vue";
import { useSettingsStore, SettingSpace } from "@/store/useSettings";
const store = useSettingsStore();
const message = useMessage();
const model = reactive<SettingSpace.General>({
  theme: "auto",
  language: "ch-zh",
  writeMode: "1", // 追加 1，覆盖 2
  selectedMode: "2", // 单选 1，多选 2
  palletTitle: false, // 托盘标题
  hideAtStartup: false, // 托盘标题
});

onBeforeMount(() => {
  for (const [key, value] of Object.entries(store.general)) {
    Reflect.set(model, key, value);
  }
});

const themes = [
  { label: "夜间", key: "black" },
  { label: "明亮", key: "light" },
  { label: "跟随系统", key: "auto" },
];
const languages = [{ label: "中文", key: "ch-zh" }];

const writeModeTip = computed(() => {
  return model.writeMode === "1"
    ? "新记录将追加到现有系统 Hosts 的文件末尾"
    : "新记录将覆盖现有系统 Hosts 的文件内容";
});

const confirm = () => {
  cancel();
  store.setSettingsByData({ general: model });
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
