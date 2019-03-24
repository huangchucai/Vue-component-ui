const expect = chai.expect;
import Vue from 'vue';
import Button from '../src/component/button';

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Button', () => {
    it('存在.', () => {
        expect(Button).to.be.ok;
    });
    it('可以设置icon.', () => {
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                iconName: 'settings'
            }
        }).$mount();
        const useElement = vm.$el.querySelector('use');
        expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings');
        vm.$destroy();
    });
    it('可以设置loading.', () => {
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                iconName: 'settings',
                loading: true
            }
        }).$mount();
        const useElements = vm.$el.querySelectorAll('use');
        expect(useElements.length).to.equal(1);
        expect(useElements[0].getAttribute('xlink:href')).to.equal('#i-loading');
        vm.$destroy();
    });
    it('icon 默认的 order 是 1', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                iconName: 'settings',
            }
        }).$mount(div);
        const icon = vm.$el.querySelector('svg');
        expect(getComputedStyle(icon).order).to.eq('1');
        vm.$el.remove();
        vm.$destroy();
    });
    it('设置 iconPosition 可以改变 order', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                iconName: 'settings',
                iconPosition: 'right'
            }
        }).$mount(div);
        const svg = vm.$el.querySelector('svg');
        expect(getComputedStyle(svg).order).to.eq('2');
        vm.$el.remove();
        vm.$destroy();
    });
    it('点击 button 触发 click 事件', () => {
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                iconName: 'settings',
            }
        }).$mount();

        const callback = sinon.fake();
        vm.$on('click', callback);
        vm.$el.click();
        expect(callback).to.have.been.called;

    });
});

/*
// 单元测试
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
//svg-Button
{
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            iconName: 'setting'
        }
    });
    button.$mount();
    const useElement = button.$el.querySelector('use');
    expect(useElement.getAttribute('xlink:href')).to.eq('#i-setting');
    // 清除组件
    button.$destroy();
}
//loading-Button
{
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            iconName: 'setting',
            loading: true
        }
    });
    button.$mount();
    const useElement = button.$el.querySelector('use');
    expect(useElement.getAttribute('xlink:href')).to.eq('#i-loading');
    // 清除组件
    button.$destroy();
}
// position-button
{
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            iconName: 'setting',
            iconPosition: 'right'
        }
    });
    button.$mount(div);
    const svgElement = button.$el.querySelector('svg');
    const {order} = window.getComputedStyle(svgElement);
    expect(order).to.eq('2');
    // 移除节点
    button.$el.remove();
    // 回收组件
    button.$destroy();
}
// 模拟点击事件
{
    // arrange
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            iconName: 'setting',
        }
    });
    button.$mount();
    const spy = chai.spy(() => { });
    // act
    button.$on('click', spy);
    button.$el.click();
    //assert
    expect(spy).to.have.been.called();
    // 移除节点
    button.$el.remove();
    // 回收组件
    button.$destroy();
}
*/

