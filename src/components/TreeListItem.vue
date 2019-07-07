<template>
  <li>
    <span @click="toggleFolded()">
      <font-awesome-icon icon="minus" v-if="isOpen" />
      <font-awesome-icon icon="plus" v-else />
    </span>
    <span class="text">
      <span v-if="!editMode" v-html="text" @dblclick="toggleMode" />
      <input v-else id="input" v-model="doc.text" @blur="toggleMode" @keyup.enter="onKeyEnter" >
    </span>
    <span class="menu" v-if="!editMode">
      <font-awesome-icon class="icon" icon="arrow-circle-left" @click="onLeftClick" />
      <font-awesome-icon class="icon" icon="arrow-circle-right" @click="onRightClick" />
    </span>
    <span class="menu" v-if="!editMode">
      <font-awesome-icon class="icon" icon="plus-circle" @click="onPlusClick" />
      <font-awesome-icon class="icon" icon="minus-circle" @click="onMinuxClick"/>
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
  private editMode: boolean = false;
  get isOpen(): boolean {
    return this.doc.children.length === 0 || this.folded;
  }
  get text(): string | null {
    if (!this.doc.text) {
      return null;
    }
    const text = marked(this.doc.text);
    // Remove <p> and </p> tags from rendered text.
    return text.substr(3, text.length - 8);
  }
  private toggleFolded(): void {
    this.folded = !this.folded;
  }
  private toggleMode(): void {
    this.editMode = !this.editMode;
    this.$nextTick(() => {
      const input = document.getElementById('input');
      if (input) {
        input.focus();
      }
    });
  }
  private onKeyEnter(): void {
      const input = document.getElementById('input');
      if (input) {
        input.blur();
      }
  }

  private onPlusClick(): void {
    this.$emit('add', this.doc);
  }
  private onMinuxClick(): void {
    this.$emit('remove', this.doc);
  }
  private onLeftClick(): void {
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
      // Find the parent TreeListItem.
      const parent = this.$parent.$parent.$parent;
      parent.$emit('up', this.doc,  parent.$props.doc);
    }
  }
  private onRightClick(): void {
    this.$emit('down', this.doc);
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
input {
  height: 1.25em;
  width: 10em;
  font-size: 0.9em;
}
.menu {
  margin-left: 0.4em;
}
.icon {
  margin-left: 0.25em;
  font-size: 0.8em;
  color: #696969;
}
</style>
