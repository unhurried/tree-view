import { mount } from '@vue/test-utils';
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus, faExternalLinkAlt);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

import TreeList from '@/components/TreeList.vue';
Vue.component('TreeList', TreeList);

import { ListItem } from '@/lib/ListData'
let parent = new ListItem();
parent.text = "parent";
let child = new ListItem();
child.text = "child";
parent.children = [ child ];
let doc = [ parent ];

describe('TreeList.vue', () => {
  it('should render doc object into a list', () => {
    const wrapper = mount(TreeList, {
      propsData: { doc },
    });
    console.log(wrapper.html());

    expect(wrapper.findAll('ul > li > span').at(0).text()).toBe('parent');
    expect(wrapper.findAll('ul > li > ul > li> span').at(0).text()).toBe('child');
  });
});
