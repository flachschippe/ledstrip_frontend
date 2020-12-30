<template>
  <div uk-accordion>
    <div>
      <div v-bind="animation" class="uk-accordion-title">
        {{ animation.name }}
      </div>
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
            <td v-if="parameter.type == 'integer'">
            <input
              v-bind:name="name"
              type="range"
              v-model="parameter.value"
              v-bind:min="parameter.minimum"
              v-bind:max="parameter.maximum"
            />
            </td>
            <td v-if="parameter.type == 'color'">
              <input type="color" v-model="parameter.value" />
            </td>
          </tr>
        </table>        
        <button class="uk-button" v-on:click="sendAnimation"><span uk-icon="play"/></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LedstripAnimation } from "@/models/Animation";
import { EventBus } from "@/event-bus.ts";
import { sendAnimation } from "@/requests";

@Component({
  methods: {
    sendAnimation: function () {
      sendAnimation(this.$props.animation).then((response) => {
        response.json().then((data) => {
          EventBus.$emit("animation-started", data.animation_id);
        });
      });
    },
  },
})
export default class Animation extends Vue {
  @Prop() private animation!: LedstripAnimation;
  beforeMount() {
    console.log(this);
  }
}
</script>

