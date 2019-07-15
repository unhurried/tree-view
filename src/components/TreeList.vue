<template>
  <draggable tag="ul" class="dragArea fa-ul" :list="doc" :group="{ name: 'g1' }">
    <TreeListItem v-for="item in doc" :key="item._uid" :doc="item"
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
</style>
