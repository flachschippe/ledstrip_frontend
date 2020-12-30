<template>
  <div>
    <div v-for="animation in animations" :key="animation.id">
      <active-animation :animation="animation"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { LedstripAnimation } from '@/models/Animation'
import ActiveAnimation from '@/components/ActiveAnimation.vue';

@Component({
  components: {
    ActiveAnimation
  },
})
export default class AnimationList extends Vue {
  @Prop() private animations!: LedstripAnimation[];
}
</script>

