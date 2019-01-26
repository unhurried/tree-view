<template>
  <span>
    {{ text }}
    <a v-if="href" :href="href" target="_blank">
      <font-awesome-icon icon="external-link-alt" />
    </a>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'TreeListText' })
export default class TreeListText extends Vue {
  @Prop() private doc!: Node;
  get text(): string | null {
    return this.doc.textContent;
  }
  get href(): string | null {
    if (this.doc.nodeName !== 'A') { return null; }
    return this.doc.childNodes[0].nodeValue;
  }
}
</script>

<style scoped lang="scss">
</style>
