import Vue from 'vue';
import TabItem from '../src/component/tabs-item';

const expect = chai.expect;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('tab-item组件测试', () => {
    it('存在', () => {
        expect(TabItem).to.be.exist;
    });
    it('测试name属性', () => {
        const Constructor = Vue.extend(TabItem);
        const vm = new Constructor({
            propsData: {
                name: 'sports'
            }
        }).$mount();
        expect(vm.$el.getAttribute('data-name')).to.be.equal('sports');
    });
    it('测试disabled属性', () => {
        const Constructor = Vue.extend(TabItem);
        const vm = new Constructor({
            propsData: {
                disabled : false
            }
        }).$mount();
        expect(vm.$el.classList.contains('disabled')).to.be.false
        const callback = sinon.fake();
        vm.$on('click', callback);
        vm.$el.click();
        expect(callback).to.have.been.called;
    });
});
