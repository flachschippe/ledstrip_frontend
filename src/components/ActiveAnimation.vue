<template>
  <div class="uk-card uk-card-default uk-card-body">
      <div class="uk-card-title" v-bind="animation">
        {{ animation.name }}
      </div>
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
              {{parameter.value}}
            </td>
            <td v-if="parameter.type == 'color'">
              <svg height="10" width="10">
                <rect width="10" height="10" stroke="black" stroke-width="1" v-bind:fill="parameter.value" />
              </svg> 
            </td>
          </tr>
        </table>
        <button class="uk-button" v-on:click="stopAnimation(animation.id)"><span uk-icon="trash"/></button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LedstripAnimation } from "../models/Animation";
import { EventBus } from "@/event-bus.ts";
import { stopAnimation } from "@/requests";

@Component({
  methods: {
    stopAnimation: function (id) {
      stopAnimation(id).then(() => {
        EventBus.$emit("animation-removed", id);
      });
    },
  },
})
export default class ActiveAnimation extends Vue {
  @Prop() private animation!: LedstripAnimation;
}
</script>

