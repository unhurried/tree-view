<template>
  <div id="app">
    <TreeList :doc="doc"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import marked from 'marked';

@Component
export default class App extends Vue {
  private doc: Element | null = null;
  public beforeCreate() {
    axios.get('./tree.md').then((res) => {
      const html = marked(res.data);
      const parsedHtml = new DOMParser().parseFromString(html, 'text/html');
      this.doc = parsedHtml.querySelector('html body ul');
    });
  }
}
</script>

<style lang="scss">
div#app {
  margin: 1em;
}
</style>
