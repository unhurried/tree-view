<template>
  <draggable tag="ul" class="dragArea" :list="doc" :group="{ name: 'g1' }" :class="{ root: level === 0 }">
    <TreeListItem v-for="item in doc" :key="item._uid" :doc="item" :level="level"
     @up="onUp" @down="onDown" @add="onAdd" @remove="onRemove" />
  </draggable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import TreeListItem from '@/components/TreeListItem.vue';
import { ListItem } from '@/lib/ListData';

@Component({
  name: 'TreeList',
  components: {
    draggable,
    TreeListItem,
  },
})
export default class TreeList extends Vue {
  @Prop({ default: null }) private doc!: ListItem[];
  @Prop({ default: 0 }) private level!: number;

  private onUp(child: ListItem, parent: ListItem): void {
    const parentIndex = this.doc.indexOf(parent);
    const childIndex = this.doc[parentIndex].children.indexOf(child);

    this.doc[parentIndex].children.splice(childIndex, 1);
    this.doc.splice(parentIndex + 1, 0, child);
  }
  private onDown(item: ListItem): void {
    const index = this.doc.indexOf(item);
    if (index >= 1) {
      this.doc.splice(index, 1);
      this.doc[index - 1].children.push(item);
    }
  }
  private onAdd(item: ListItem): void {
    const index = this.doc.indexOf(item);
    const newItem = new ListItem();
    newItem.text = 'new item';
    this.doc.splice(index + 1, 0, newItem);
  }
  private onRemove(item: ListItem): void {
    const index = this.doc.indexOf(item);
    if (index !== undefined) {
      this.doc.splice(index, 1);
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
}
ul.root {
  margin: 0;
  padding: 0;
}
.dragArea {
  padding-bottom: 0.1em;
}
</style>
