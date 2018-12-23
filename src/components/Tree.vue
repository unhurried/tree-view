<template>
  <ul :class="{ root: level === 0 }">
    <li v-for="item in doc" :key="item._uid">
      <span @click="toggleVisible(item)">
        <font-awesome-icon icon="plus" v-if="item.children && !item.visible" />
        <font-awesome-icon icon="minus" v-else />
        {{ item.name }}
        <a v-if="item.href" :href="item.href" target="_blank">
          <font-awesome-icon icon="external-link-alt" />
        </a>
      </span>
      <tree v-if="item.visible && item.children" :doc="item.children" :parent-level="level" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Tree'
})
export default class Tree extends Vue {
  @Prop() private doc!: object;
  @Prop() private parentLevel!: number;
  private level!: number;
  private visible: boolean = true;
  private created() {
    if (this.parentLevel === undefined) {
      this.level = 0;
    } else {
      this.level = this.parentLevel + 1;
    }
  }
  private toggleVisible(tree: Tree): void {
    tree.visible = !tree.visible;
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
}
ul li {
  cursor: pointer;
}
ul.root {
  margin: 0;
  padding: 0;
}
</style>
