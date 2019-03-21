import Vue from 'vue';
import Button from './component/button';
import Icon from './component/icon';
import ButtonGroup from './component/button-group';

Vue.component('g-button', Button);
Vue.component('icon', Icon);
Vue.component('g-button-group', ButtonGroup);
new Vue({
    el: '#app',
    data() {
        return {
            loadingFirst: false,
            loadingTwo: false,
            loadingThree: true,
        };
    }
});
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

