<template>
  <div class="uk-container">
    <div class="uk-grid">
      <div class="uk-width-1-2">
        <span class="uk-text-large">Available Animations</span>
        <select-animation
          :animations="availableAnimations"
        />
      </div>
      <div class="uk-width-1-2">
        <span class="uk-text-large">Active Animations</span>
        <animation-list :animations="activeAnimations" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AnimationList from "@/components/AnimationList.vue";
import SelectAnimation from "@/components/SelectAnimation.vue";
import * as Requests from "@/requests.ts"
import { defineComponent } from 'vue'
import {LedstripAnimation} from "@/models/Animation";
import {Handler} from 'mitt'

export default defineComponent({
  name: 'App',
  components: {
    AnimationList,
    SelectAnimation,
  },
  data() {
    return {
      availableAnimations: [] as LedstripAnimation[],
      activeAnimations: [] as LedstripAnimation[],
    };
  },
  created: function () {

    const func = (animationId: number) => {

      Requests.getActiveAnimations().then((animations) => {
        this.$data.availableAnimations = animations[0]
        this.$data.activeAnimations = animations[1]
      })
    };

    this.emitter.on('animation-started', func as Handler<number>)
    this.emitter.on("animation-removed", func as Handler<number>)
  },
  mounted() {
    Requests.getActiveAnimations().then((animations)=>{
      this.$data.availableAnimations = animations[0]
      this.$data.activeAnimations = animations[1]
    })

  },
})


</script>


