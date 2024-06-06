<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n';
import messages from './Translations';
import Communicator from '@modules/Communicator';

const { t } = useI18n({ messages })
const operandsSubject = Communicator.getSubject('operands')

interface Props {
  isGolden?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isGolden: false
});

const sign = ref('');
const form = ref(null);

watchEffect(() => {
  if(sign.value) {
    const signChangedEvent = new CustomEvent('signChanged', {
      bubbles: true,
      detail: {
        sign: sign.value
      }
    })
    //@ts-ignore
    form.value?.dispatchEvent(signChangedEvent)
  }
});

const resetOperands = () => {
  operandsSubject.next({ leftNumber: 0, rightNumber: 0 })
}

const setRandomOperands = () => {
  operandsSubject.next({ leftNumber: Math.random()*10, rightNumber: Math.random()*10 })
}
</script>

<template>
  <section class="form" ref="form">
    <label class="form__input-area" for="sign">
      {{ t("sign") }}
      <input
        name="sign"
        class="form__input"
        id="sign"
        v-model="sign"
      />
    </label>
    <button
      class="form__submit"
      :class="{ 'form__submit_golden': props.isGolden }"
      @click="resetOperands"
    >
        {{ t("submit") }}
    </button>
    <button
      class="form__submit"
      @click="setRandomOperands"
    >
        {{ t("setRandom") }}
    </button>
  </section>
</template>

<style scoped lang="scss">
@import './Sign.scss';
</style>
