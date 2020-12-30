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
            <input v-bind:name="name" type="range" v-model="parameter.value" />
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
import { EventBus } from '@/event-bus.ts';

@Component({
  methods: {
    sendAnimation: function () {
      fetch("http://ledstripe:8080/animation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Request-Headers": "*"
        },     
        body: JSON.stringify(this.$props.animation),
      }).then((response)=>
      {
        response.json().then((data)=>{
          console.log(data.animation_id)
          EventBus.$emit('animation-started', data.animation_id)
        })
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

