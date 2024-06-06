<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

// this component must not have local translations
// if they present language will only change in the LanguageSwitcher
// other components won't get updated
const { locale } = useI18n();

const setLanguage = () => {
    const htmlNode = document.querySelector('html');
    if(htmlNode) {
        //@ts-ignore
        htmlNode.setAttribute('lang', locale.value);
    }
};

onMounted(setLanguage);
watch(locale, setLanguage);
</script>

<template>
  <fieldset class="language-switcher" style="border:none">
    <label>
      <input
          type="radio"
          id="lang-en"
          name="lang-en"
          value="en"
          v-model="locale"
      />
      en
    </label>
  </fieldset>
</template>

<style scoped lang="scss">
</style>
