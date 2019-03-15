<template>
  <div>
    <label id="import-button">
      <font-awesome-icon icon="file-import" /> Import
      <input type="file" @change="onFileChange" class="d-none" />
    </label>
    <label id="export-button" @click="onExportClick">
      <font-awesome-icon icon="file-export" /> Export
    </label>
    <a id="exportLink" class="d-none" download="tree.md" :href="exportHref" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ListItem } from '@/lib/ListData';
import MarkdownParser from '@/lib/MarkdownParser.ts';

@Component({
  name: 'ImportExportButton',
})
export default class ImportExportButton extends Vue {
  @Prop() private doc!: ListItem[];
  private exportHref: string | null = null;
  private onFileChange(e: Event): void {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const fr = new FileReader();
      fr.onload = () => {
        this.$emit('fileLoaded', fr.result);
      };
      fr.readAsText(files[0]);
    }
  }
  private onExportClick(): void {
    const data = new MarkdownParser().convert(this.doc);
    const blob = new Blob([data], {type: 'text/plain'});
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, 'tree.md');
    } else {
      this.exportHref = window.URL.createObjectURL(blob);
      this.$nextTick(() => {
        const a = document.getElementById('exportLink');
        if (a) {
          a.click();
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
label {
  display: block;
  margin-bottom: 0.4em;
}
#import-button {
  margin-right: 0.5em;
  cursor: pointer;
  user-select: none;
}
</style>
