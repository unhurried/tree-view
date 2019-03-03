<template>
  <ul :class="{ root: level === 0 }">
    <draggable :list="doc">
      <TreeListItem v-for="item in doc" :key="item._uid" :doc="item" :level="level"/>
    </draggable>  
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import TreeListItem from '@/components/TreeListItem.vue';
import { ListItem, ListText } from '@/lib/ListData';

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
