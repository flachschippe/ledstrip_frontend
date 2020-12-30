<template>
  <ul>
    <li v-for="animation in animations" :key="animation.name">
      <animation :animation="animation" v-on:animation-started='animationStarted($event)'/>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { LedstripAnimation } from '../models/Animation'
import Animation from '../components/Animation.vue';

@Component({
  components: {
    Animation
  },
  methods:
  {
    animationStarted: function(animationId) {
      console.log(animationId)
    }
  },    
})
export default class AnimationList extends Vue {
  @Prop() private animations!: LedstripAnimation[];
  beforeMount(){
    console.log(this.animations)
  }
}
</script>

