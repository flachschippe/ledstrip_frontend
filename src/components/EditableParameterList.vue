<template>
    <div>
        <table class="uk-table uk-table-striped">
          <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
          </thead>
          <tr
              v-for="parameter in parameters"
              v-bind:value="parameter"
              v-bind:key="parameter.name">
            <td>
              <label v-bind:for="parameter.name">{{ parameter.name }}:</label>
            </td>
            <td v-if="parameter.type === 'integer'">
              <input
                  v-bind:name="parameter.name"
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
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Parameter} from "@/models/Parameter";
import {PropType} from "@vue/composition-api";

export default defineComponent({
  name: 'EditableParameterList',
  props: {
    parameters: Object as PropType<Parameter[]>
  },
})

</script>

