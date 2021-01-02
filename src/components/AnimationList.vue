<template>
  <div>
    <div v-for="animation in animations" :key="animation.id">
      <active-animation class="uk-text-large" :animation="animation"/>
      <button class="uk-button uk-button-small" v-on:click="stopAnimation(animation.id)"><span uk-icon="trash"/></button>
    </div>
  </div>
</template>

<script lang="ts">
import { LedstripAnimation } from '@/models/Animation'
import { defineComponent, computed } from 'vue'
import {stopAnimation} from "@/requests";
import ActiveAnimation from "@/components/ActiveAnimation.vue";

export default defineComponent({
  name: 'AnimationList',
  components: {ActiveAnimation},
  props: {
   animations: {type: Array}
  },
  methods: {
    stopAnimation: function (id: number) {
      stopAnimation(id).then(() => {
        this.emitter.emit("animation-removed", id);
      });
    },
  }
})
</script>

