<script setup lang="ts">
import { ref } from 'vue';
import Numbers from 'remoteNumbers/Numbers';
import Sign from 'remoteSign/Sign';
import Expression from '@components/Expression/Expression.vue';
import LanguageSwitcher from '@components/LanguageSwitcher/LanguageSwitcher.vue';
import { useI18n } from 'vue-i18n';
import messages from './Translations';

const { t } = useI18n({ messages });
const isSubmitGolden = ref(false)

</script>

<template>
  <main class="form">
    <h1>{{ t('title') }}</h1>
    <LanguageSwitcher/>
    <label>
      <input
        type="checkbox"
        id="isSubmitGolden"
        name="isSubmitGolden"
        v-model="isSubmitGolden"
        class="promocode-period-limit__check"
      />
      {{ t('submitColorViaProps') }}
    </label>
    <Numbers/>
    <Sign :is-golden="isSubmitGolden"/>
    <Expression/>
  </main>
</template>

<style scoped lang="scss">
@import url('./App.scss');
</style>
