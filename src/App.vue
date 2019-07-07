<template>
  <div id="app">
    <ImportExportButton class="float-right" :doc="doc" @fileLoaded="onFileLoaded" />
    <TreeList :doc="doc"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus, faPlusCircle, faMinusCircle);
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowCircleLeft, faArrowCircleRight);
import { faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons';
library.add(faFileImport, faFileExport);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Recursive components need to be registered globally.
import TreeList from '@/components/TreeList.vue';
Vue.component('TreeList', TreeList);

import ImportExportButton from '@/components/ImportExportButton.vue';
import axios from 'axios';
import MarkdownParser from '@/lib/MarkdownParser.ts';
import { ListItem } from '@/lib/ListData';

@Component({
  components: {
    ImportExportButton,
  },
})
export default class App extends Vue {
  @Prop({ default: 'tree.md' }) private path!: string;
  private doc: ListItem[] | null = null;
  private created() {
    axios.get(this.path).then((res) => {
      this.updateDoc(res.data);
    });
  }
  private onFileLoaded(content: string): void {
    this.updateDoc(content);
  }
  private updateDoc(newDoc: string) {
    this.doc = new MarkdownParser().parse(newDoc);
  }
}
</script>

<style lang="scss">
div#app {
  margin: 1em;
}
</style>
