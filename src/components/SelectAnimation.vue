<template>
  <div class="uk-accordion" data-uk-accordion>
    <div v-for="animation in animations" :key="animation.name">

      <div class="uk-accordion-title">
        <h3>{{ animation.name }}</h3>
        <button class="uk-button uk-button-small" @click.stop="sendAnimation(animation)"><span uk-icon="play"/></button>
      </div>

      <editable-parameter-list :parameters="animation.parameters" v-on:animation-started='animationStarted($event)'
                               class="uk-accordion-content"/>
    </div>
  </div>
</template>

<script lang="ts">
import {LedstripAnimation} from '@/models/Animation'
import EditableParameterList from '@/components/EditableParameterList.vue';
import {defineComponent} from "vue";
import {PropType} from "@vue/composition-api";
import {Handler} from "mitt";
import {sendAnimation} from "@/requests";

export default defineComponent({
  name: 'SelectAnimation',
  props: {
    animations: {
      type: Object as PropType<LedstripAnimation[]>
    }
  },
  components: {
    EditableParameterList
  },
  created: function () {

    const func = (animationId: number) => {
      console.log(this.animations)
    };

    this.emitter.on('animation-started', func as Handler<number>)
    this.emitter.on("animation-removed", func as Handler<number>)
  },
  methods:
      {
        animationStarted: function (animationId: number) {
          console.log(animationId)
        },
        sendAnimation: function (animation: LedstripAnimation) {
          sendAnimation(animation).then((response) => {
            response.json().then((data) => {
              this.emitter.emit("animation-started", data.animation_id);
            });
          });
        }
      },
})
</script>

