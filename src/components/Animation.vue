<template>
  <div class="uk-accordion" data-uk-accordion>
    <div>
      <h3 class="uk-accordion-title">
        <span>{{ animation.name }}</span>
        <button class="uk-button uk-button-small" v-on:click="sendAnimation"><span uk-icon="play"/></button>
      </h3>
      <div class="uk-accordion-content">
        <table class="uk-table uk-table-striped">
          <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
          </thead>
          <tr
              v-for="(parameter, name) in animation.parameters"
              v-bind:value="parameter"
              v-bind:key="name">
            <td>
              <label v-bind:for="name">{{ name }}:</label>
            </td>
            <td v-if="parameter.type === 'integer'">
              <input
                  v-bind:name="name"
                  type="range"
                  v-model="parameter.value"
                  v-bind:min="parameter.minimum"
                  v-bind:max="parameter.maximum"
              />
            </td>
            <td v-if="parameter.type === 'color'">
              <input type="color" v-model="parameter.value"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {sendAnimation} from "@/requests";
import {defineComponent} from 'vue'
import {LedstripAnimation} from "@/models/Animation";

export default defineComponent({
  name: 'Animation',
  props: {
    animation: LedstripAnimation
  },
  methods: {
    sendAnimation: function () {
      if (this.$props.animation !== undefined) {
        sendAnimation(this.$props.animation).then((response) => {
          response.json().then((data) => {
            this.emitter.emit("animation-started", data.animation_id);
          });
        });
      }
    },
  },
})

</script>

