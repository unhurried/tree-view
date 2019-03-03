<template>
  <span>
    {{ doc.text }}
    <a v-if="doc.href" :href="doc.href" target="_blank">
      <font-awesome-icon icon="external-link-alt" />
    </a>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ListItem, ListText } from '@/lib/ListData';

@Component({ name: 'TreeListText' })
export default class TreeListText extends Vue {
  @Prop() private doc!: ListText;
}
</script>

<style scoped lang="scss">
</style>
