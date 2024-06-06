<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import messages from './Translations';

const { t } = useI18n({ messages });
const leftNumber = ref()
const rightNumber = ref()
const sign = ref('+')
const result = computed(() => eval(`${leftNumber.value} ${sign.value} ${rightNumber.value}`))

const onArgsChanged = (e) => {
    //@ts-ignore
    leftNumber.value = e?.detail.leftNumber
    //@ts-ignore
    rightNumber.value = e?.detail.rightNumber
}
const onSignChanged = (e) => {
    //@ts-ignore
    sign.value = e?.detail.sign
}

window.addEventListener('argumentsChanged', onArgsChanged)
window.addEventListener('signChanged', onSignChanged)

onBeforeUnmount(() => {
    window.removeEventListener('argumentsChanged', onArgsChanged);
    window.removeEventListener('signChanged', onSignChanged);

})
</script>

<template>
  <section class="expression">
    <p>{{ t('text') }}</p>
    <code>
        {{ `${leftNumber} ${sign} ${rightNumber} = ${result}` }}
    </code>
  </section>
</template>

<style scoped lang="scss">
@import url('./Expression.scss');
</style>
