<template>
  <div class="uk-container">
    <div class="uk-grid">
      <div class="uk-width-1-2">
        <select-animation
          :animations="availableAnimations"
          v-on:animation-started="animationStarted($event)"
        />
      </div>
      <div class="uk-width-1-2">
        <animation-list :animations="activeAnimations" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Animation from "@/components/Animation.vue";
import AnimationList from "@/components/AnimationList.vue";
import SelectAnimation from "@/components/SelectAnimation.vue";
import { EventBus } from "@/event-bus.ts";
import * as Requests from "@/requests.ts"


@Component({
  components: {
    Animation,
    AnimationList,
    SelectAnimation,
  },
  data() {
    return {
      availableAnimations: [],
      activeAnimations: [],
    };
  },
  methods: {
    animationStarted: function (animationId) {
      console.log(animationId);
    },
  },
  created() {
    EventBus.$on(["animation-started", "animation-removed"], (animationId: number) => {

    Requests.getActiveAnimations().then((animations)=>{
      this.$data.availableAnimations = animations[0]
      this.$data.activeAnimations = animations[1]
    })
    });
  },
  mounted() {
    Requests.getActiveAnimations().then((animations)=>{
      this.$data.availableAnimations = animations[0]
      this.$data.activeAnimations = animations[1]
    })

  },
})
export default class App extends Vue {}


</script>


