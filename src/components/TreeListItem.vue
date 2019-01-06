<template>
  <li>
    <span @click="toggleFolded()">
      <font-awesome-icon icon="minus" v-if="showChildren" />
      <font-awesome-icon icon="plus" v-else />
      {{ text }}
      <a v-if="href" :href="href" target="_blank">
        <font-awesome-icon icon="external-link-alt" />
      </a>
    </span>
    <TreeList v-if="showChildren" :doc="childList" :level="level+1"/>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'TreeElement' })
export default class TreeElement extends Vue {
  @Prop() private doc!: Element;
  @Prop() private level!: number;
  private folded: boolean = true;
  get text(): string | null {
    return this.doc.childNodes[0].textContent;
  }
  get href(): string | null {
    const node = this.doc.querySelector(':scope > a');
    if (node === null) { return null; }
    return node.getAttribute('href');
  }
  get childList(): Element | null {
    return this.doc.querySelector('ul');
  }
  get showChildren(): boolean {
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
}
</style>
