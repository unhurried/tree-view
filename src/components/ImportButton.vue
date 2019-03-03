<template>
  <div>
    <label id="import-button">
      <font-awesome-icon icon="file-import" /> Import
      <input type="file" @change="onFileChange" class="d-none" />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'ImportButton',
})
export default class ImportButton extends Vue {
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
}
</script>

<style scoped lang="scss">
#import-button {
  margin-right: 0.5em;
  cursor: pointer;
  user-select: none;
}
</style>
