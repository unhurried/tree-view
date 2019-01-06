<template>
  <ul :class="{ root: level === 0 }">
    <TreeListItem v-for="item in items" :key="item._uid" :doc="item" :level="level"/>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TreeListItem from '@/components/TreeListItem.vue';

@Component({
  name: 'TreeList',
  components: {
    TreeListItem,
  },
})
export default class TreeList extends Vue {
  @Prop({ default: null }) private doc!: Element;
  @Prop({ default: 0 }) private level!: number;
  get items(): Element[] {
    if (this.doc === null) { return []; }
    this.doc.setAttribute('id', 'root');
    return Array.from(this.doc.querySelectorAll('ul#root > li'));
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
</style>
