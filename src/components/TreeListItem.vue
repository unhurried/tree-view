<template>
  <li class="tree-list-item">
    <span @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <span @click="toggleFolded()" class="fa-li">
        <font-awesome-icon icon="minus" v-if="isOpen" />
        <font-awesome-icon icon="plus" v-else />
      </span>
      <span v-if="editMode" id="tree-list-input" contenteditable="true" v-text="textForInput" @input="onInput"
        @blur="onBlur" @keydown.exact.enter.prevent="blur" @keydown.exact.esc.prevent="blur"
        @keydown.ctrl.left="toLeft" @keydown.ctrl.right="toRight" />
      <span v-else contenteditable="false" v-html="html" @mouseup.exact="onFocus" />
      <span class="menu" v-if="editMode || displayMenu">
        <font-awesome-icon class="icon" icon="arrow-circle-left" @click="toLeft" />
        <font-awesome-icon class="icon" icon="arrow-circle-right" @click="toRight" />
      </span>
      <span class="menu" v-if="editMode || displayMenu">
        <font-awesome-icon class="icon" icon="plus-circle" @click="addItem" />
        <font-awesome-icon class="icon" icon="minus-circle" @click="removeItem"/>
      </span>
    </span>
    <TreeList :class="{ invisible: !isOpen }" :doc="doc.children" />
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
  private folded: boolean = true;
  private editMode: boolean = false;
  private displayMenu: boolean = false;

  // Assign a dedicated property for the input so that the input element won't be re-redendered,
  // which results in resetting the focus point in the editting text.
  private textForInput!: string | null;
  // Use updated hook instead of mounted hook to cope with the update of data in Vue components.
  private updated(): void {
    this.textForInput = this.doc.text;
  }

  get isOpen(): boolean {
    return this.doc.children.length === 0 || this.folded;
  }
  get html(): string | null {
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

  private blur(): void {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
  }
  private onFocus(): void {
    this.editMode = true;
    this.$nextTick(() => {
      const input = document.getElementById('tree-list-input');
      if (input) {
        input.focus();
      }
    });
  }
  private onBlur(): void {
    this.editMode = false;
    const input = document.getElementById('tree-list-input');
    if (input) {
      this.textForInput = input.innerText;
    }
  }
  private onInput(): void {
    const input = document.getElementById('tree-list-input');
    if (input) {
      this.doc.text = input.innerText;
    }
    /*
    if (e.target) {
      this.doc.text = (e.target as HTMLElement).innerText;
    }
    */
  }

  private onMouseEnter(): void {
    this.displayMenu = true;
  }
  private onMouseLeave(): void {
    this.displayMenu = false;
  }

  private addItem(): void {
    this.$emit('add', this.doc);
  }
  private removeItem(): void {
    this.$emit('remove', this.doc);
  }
  private toLeft(): void {
    this.blur();
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent) {
      // Find the parent TreeListItem.
      const parent = this.$parent.$parent.$parent;
      parent.$emit('left', this.doc,  parent.$props.doc);
    }
  }
  private toRight(): void {
    this.blur();
    this.$emit('right', this.doc);
  }
}
</script>

<style scoped lang="scss">
li span {
  cursor: pointer;
  user-select: none;
}
li span:focus {
  outline: none;
  text-decoration: underline;
}
.invisible {
  display: none
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
