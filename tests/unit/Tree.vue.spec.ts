import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Tree from '@/components/Tree.vue';

describe('Tree.vue', () => {
  it('should render doc object into a list', () => {
    const props = {
      doc: [
        {
          name: 'one',
          visible: true,
          children: [
            {
              name: 'one-one',
              visible: true,
            },
          ],
        },
        {
          name: 'two',
          visible: false,
          children: [
            {
              name: 'two-one',
              visible: true,
            },
          ],
        },
      ],
    };
    const wrapper = shallowMount(Tree, {
      propsData: props,
    });

    expect(wrapper.findAll('ul > li').at(0).text()).to.equal('one');
    expect(wrapper.findAll('ul > li').at(0).find(Tree).attributes().parentlevel).to.equal('0');
    expect(wrapper.findAll('ul > li > span > font-awesome-icon').at(0).attributes().icon).to.equal('minus');
    expect(wrapper.findAll('ul > li').at(1).text()).to.equal('two');
    expect(wrapper.findAll('ul > li').at(1).find(Tree).exists()).to.equal(false);
    expect(wrapper.findAll('ul > li > span > font-awesome-icon').at(1).attributes().icon).to.equal('plus');
  });

  it('should change the visible state when clicked', () => {
    const props = {
      doc: [
        {
          name: 'one',
          visible: true,
          children: [
            {
              name: 'one-one',
              visible: true,
            },
          ],
        },
      ],
    };
    const wrapper = shallowMount(Tree, {
      propsData: props,
    });

    expect(wrapper.vm.$props.doc[0].visible).to.equal(true);
    wrapper.findAll('ul > li > span').at(0).trigger('click');
    expect(wrapper.vm.$props.doc[0].visible).to.equal(false);
  });
});
