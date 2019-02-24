<template>
  <li>
    <span @click="toggleFolded()">
      <font-awesome-icon icon="minus" v-if="isOpen" />
      <font-awesome-icon icon="plus" v-else />
      <TreeListText v-for="textNode in TextNodes" :doc="textNode" :key="textNode._uid" />
    </span>
    <TreeList :class="{ invisible: !isOpen }" :doc="childList" :level="level+1" />
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TreeListText from '@/components/TreeListText.vue';

@Component({
  name: 'TreeListItem',
  components: {
    TreeListText,
  },
})
export default class TreeListItem extends Vue {
  @Prop() private doc!: Element;
  @Prop() private level!: number;
  private folded: boolean = true;
  get TextNodes(): Node[] {
    const list: Node[] = [];
    Array.prototype.map.call(this.doc.childNodes, (node: Node) => {
      if (node.nodeName !== 'UL') {
        list.push(node);
      }
      return {};
    });
    return list;
  }
  get childList(): Element | null {
    return this.doc.querySelector('ul');
  }
  get isOpen(): boolean {
    return this.childList === null || this.folded;
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
