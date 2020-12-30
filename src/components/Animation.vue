<template>
  <div uk-accordion>
    <div>
      <a v-bind="animation" class="uk-accordion-title">
        {{ animation.name }}
      </a>
      <div class="uk-accordion-content">
        <div
          v-for="(parameter, name) in animation.parameters"
          v-bind:value="parameter"
          v-bind:key="name"
        >
          <div v-if="parameter.type == 'integer'">
            <label v-bind:for="name">{{ name }}:</label>
            <input
              v-bind:name="name"
              type="range"
              v-model="parameter.value"
              v-bind:min="parameter.minimum"
              v-bind:max="parameter.maximum"
            />
            <p>
              {{ parameter.value }}
            </p>
          </div>
          <div v-if="parameter.type == 'color'">
            <label for="lname">{{ name }}:</label>
            <input type="color" v-model="parameter.value" />
          </div>
        </div>
        <button v-on:click="sendAnimation">Start</button>
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

