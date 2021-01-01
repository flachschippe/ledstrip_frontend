<template>
  <div>
    <div v-for="animation in animations" :key="animation.id">
      <active-animation :animation="animation"/>
    </div>
  </div>
</template>

<script lang="ts">
import { LedstripAnimation } from '@/models/Animation'
import ActiveAnimation from '@/components/ActiveAnimation.vue';
import { defineComponent } from 'vue'
import {PropType} from "@vue/composition-api";

export default defineComponent({
  name: 'AnimationList',
  props: {
   animations: {
      type: Object as PropType<LedstripAnimation[]>
    }
  },
  components: {
    ActiveAnimation
  },
})
</script>

