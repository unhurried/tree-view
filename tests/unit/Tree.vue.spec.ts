import { mount } from '@vue/test-utils';
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus, faExternalLinkAlt);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

import TreeList from '@/components/TreeList.vue';
Vue.component('TreeList', TreeList);

const html = `
  <ul>
    <li>one
      <ul>
        <li>one-one</li>
      </ul>
    </li>
    <li>two</li>
  </ul>
`;
const div = document.createElement('div');
div.innerHTML = html;
const doc = div.querySelector('div > ul');

describe('TreeList.vue', () => {
  it('should render doc object into a list', () => {
    const wrapper = mount(TreeList, {
      propsData: { doc },
    });

    expect(wrapper.findAll('ul.root > li > span').at(0).text()).toBe('one');
    expect(wrapper.findAll('ul.root > li > ul > li > span').at(0).text()).toBe('one-one');
    expect(wrapper.findAll('ul.root > li > span').at(1).text()).toBe('two');
  });

  it('should change the visible state when clicked', () => {
    const wrapper = mount(TreeList, {
      propsData: { doc },
    });

    expect(wrapper.findAll('ul.root > li > ul > li > span').length).toBe(1);
    expect(wrapper.findAll('ul.root > li > span > svg').at(0).attributes('data-icon')).toBe('minus');
    wrapper.findAll('ul.root > li > span').at(0).trigger('click');
    expect(wrapper.findAll('ul.root > li > ul > li > span').length).toBe(0);
    expect(wrapper.findAll('ul.root > li > span > svg').at(0).attributes('data-icon')).toBe('plus');
  });
});
