<template>
  <li>
    <span @click="toggleFolded()">
      <font-awesome-icon icon="minus" v-if="isOpen" />
      <font-awesome-icon icon="plus" v-else />
      <TreeListText v-for="item in doc.texts" :doc="item" :key="item._uid" />
    </span>
    <TreeList :class="{ invisible: !isOpen }" :doc="doc.children" :level="level+1" />
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TreeListText from '@/components/TreeListText.vue';
import { ListItem, ListText } from '@/lib/ListData';

@Component({
  name: 'TreeListItem',
  components: {
    TreeListText,
  },
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
</style>
