<template>
  <span class="uk-text-large" :uk-tooltip="parametersAsText">{{ animation.name }}</span>
</template>

<script lang="ts">
import {LedstripAnimation} from "@/models/Animation";
import {stopAnimation} from "@/requests";
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'ActiveAnimation',
  props: {
    animation: LedstripAnimation
  },
  methods: {

    stopAnimation: function (id: number) {
      stopAnimation(id).then(() => {
        this.emitter.emit("animation-removed", id);
      });
    },
  },
  computed: {
    parametersAsText(): string {
      let result = ""
      if (this.animation !== undefined) {
        this.animation.parameters.forEach((parameter) => {
          result += parameter.name + "=" + parameter.value+ "    "
        })
      }

      return result
    }
  }
})
</script>

