import Vue from 'vue';
import Col from '../src/component/col';

Vue.config.productionTip = false;
Vue.config.devtools = false;
describe('col', () => {
    it('存在', () => {
        expect(Col).to.be.ok;
    });
    it('可以设置span', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                span: 20
            }
        }).$mount(div);
        expect(vm.$el.classList.contains('col-20')).to.eq(true);
        div.remove();
    });
    it('可以设置offset', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                offset: 20
            }
        }).$mount(div);
        expect(vm.$el.classList.contains('offset-20')).to.eq(true);
        div.remove();
    });
    it('可以设置ipad', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                ipad: {
                    span: 20,
                },
            }
        }).$mount(div);
        expect(vm.$el.classList.contains('col-ipad-20')).to.eq(true);
        div.remove();
    });
    it('可以设置narrowPc', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                narrowPc: {
                    span: 20,
                },
            }
        }).$mount(div);
        expect(vm.$el.classList.contains('col-narrow-pc-20')).to.eq(true);
        div.remove();
    });
    it('可以设置pc', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                pc: {
                    span: 20,
                },
            }
        }).$mount(div);
        expect(vm.$el.classList.contains('col-pc-20')).to.eq(true);
        div.remove();
    });
    it('可以设置widePC', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                widePc: {
                    span: 20,
                },
            }
        }).$mount(div);
        expect(vm.$el.classList.contains('col-wide-pc-20')).to.eq(true);
        div.remove();
    });
});
