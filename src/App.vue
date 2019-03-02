<template>
  <div id="app">
    <ImportButton class="float-right" @fileLoaded="onFileLoaded" />
    <TreeList :doc="doc"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import marked from 'marked';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faExternalLinkAlt, faFileImport } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus, faExternalLinkAlt, faFileImport);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Recursive components need to be registered globally.
import TreeList from '@/components/TreeList.vue';
Vue.component('TreeList', TreeList);

import ImportButton from '@/components/ImportButton.vue';

@Component({
  components: {
    ImportButton,
  },
})
export default class App extends Vue {
  @Prop({ default: 'tree.md' }) private path!: string;
  private doc: Element | null = null;
  private created() {
    axios.get(this.path).then((res) => {
      this.updateDoc(res.data);
    });
  }
  private onFileLoaded(content: string): void {
    this.updateDoc(content);
  }
  private updateDoc(newDoc: string) {
    const html = marked(newDoc);
    const parsedHtml = new DOMParser().parseFromString(html, 'text/html');
    this.doc = parsedHtml.querySelector('html body ul');
  }
}
</script>

<style lang="scss">
div#app {
  margin: 1em;
}
</style>
