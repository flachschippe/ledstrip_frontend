<template>
<div>
    <div v-for="animation in animations" :key="animation.name">
      <animation :animation="animation" v-on:animation-started='animationStarted($event)'/>
    </div>
</div>
</template>

<script lang="ts">
import { LedstripAnimation } from '../models/Animation'
import Animation from '../components/Animation.vue';
import {defineComponent} from "vue";
import {PropType} from "@vue/composition-api";

export default defineComponent({
  name: 'SelectAnimation',
  props: {
    animations: {
      type: Object as PropType<LedstripAnimation[]>
    }
  },
  components: {
    Animation
  },
  methods:
  {
    animationStarted: function(animationId: number) {
      console.log(animationId)
    }
  },    
})
</script>

