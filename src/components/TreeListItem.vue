<template>
  <li>
    <span @click="toggleFolded()">
      <font-awesome-icon icon="minus" v-if="isOpen" />
      <font-awesome-icon icon="plus" v-else />
      <span class="text" v-html="text()" />
    </span>
    <TreeList :class="{ invisible: !isOpen }" :doc="doc.children" :level="level+1" />
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ListItem } from '@/lib/ListData';
import marked from 'marked';

@Component({
  name: 'TreeListItem',
})
export default class TreeListItem extends Vue {
  @Prop() private doc!: ListItem;
  @Prop() private level!: number;
  private folded: boolean = true;
  get isOpen(): boolean {
    return this.doc.children.length === 0 || this.folded;
  }
  private toggleFolded(): void {
    this.folded = !this.folded;
  }
  private text(): string | null {
    if (!this.doc.text) {
      return null;
    }
    const text = marked(this.doc.text);
    // Remove <p> and </p> tags from rendered text.
    return text.substr(3, text.length - 8);
  }
}
</script>

<style scoped lang="scss">
li span {
  cursor: pointer;
  user-select: none;
}
.invisible {
  display: none
}
.text {
  padding-left: 0.4em;
}
</style>
