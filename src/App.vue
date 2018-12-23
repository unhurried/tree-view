<template>
  <div id="app">
    <Tree :doc="doc"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import yaml from 'js-yaml';
import Tree from '@/components/Tree.vue';

@Component({
  components: {
    Tree,
  },
})
export default class App extends Vue {
  private doc: object = {};
  public beforeCreate() {
    axios.get('./tree.yaml').then((res) => {
      this.doc = yaml.safeLoad(res.data);
    });
  }
}
</script>

<style lang="scss">
div#app {
  margin: 1em;
}
</style>
