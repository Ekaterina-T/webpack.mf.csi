<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import messages from './Translations';
import Communicator from '@modules/Communicator';

const { t } = useI18n({ messages })
const operandsSubject = Communicator.getSubject('operands')

const leftNumber = ref(0);
const rightNumber = ref(0);
const form = ref(null);

operandsSubject.subscribe({
  next: (payload) => {
    leftNumber.value = payload.leftNumber;
    rightNumber.value = payload.rightNumber;
  }
})

watchEffect(() => {
  if(leftNumber.value >= 0 && rightNumber.value >= 0) {
    const argumentsChangedEvent = new CustomEvent('argumentsChanged', {
      bubbles: true,
      detail: {
        leftNumber: Number(leftNumber.value),
        rightNumber: Number(rightNumber.value)
      }
    })
    //@ts-ignore
    form.value?.dispatchEvent(argumentsChangedEvent)
  }
});
</script>

<template>
  <section class="form" ref="form">
    <label class="form__input-area" for="leftNumber">
      {{ t('leftNumber') }}
      <input
        class="form__input"
        id="leftNumber"
        v-model="leftNumber"
      />
    </label>

    <label class="form__input-area" for="rightNumber">
      {{ t('rightNumber') }}
      <input
        class="form__input"
        id="rightNumber"
        v-model="rightNumber"
      />
    </label>
  </section>
</template>

<style scoped lang="scss">
@import './Numbers.scss';
</style>
