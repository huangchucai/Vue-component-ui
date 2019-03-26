const expect = chai.expect;
import Vue from 'vue';
import Input from '../src/component/input';

Vue.config.devtools = false;
Vue.config.productionTip = false;
// 单元测试
describe('input组件', () => {
    it('存在', () => {
        expect(Input).to.be.ok;
    });
    describe('测试接受属性', () => {
        it('可以设置value', () => {
            const Constructor = Vue.extend(Input);
            const vm = new Constructor({
                propsData: {
                    value: 'yx'
                }
            }).$mount();
            const input = vm.$el.querySelector('input');
            expect(input.value).to.eq('yx');
        });

        it('可以设置disabled', () => {
            const Constructor = Vue.extend(Input);
            const vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount();
            const input = vm.$el.querySelector('input');
            expect(input.disabled).to.eq(true);
        });
        it('可以设置readonly', () => {
            const Constructor = Vue.extend(Input);
            const vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount();
            const input = vm.$el.querySelector('input');
            expect(input.readOnly).to.eq(true);
        });
        it('可以设置error', () => {
            const Constructor = Vue.extend(Input);
            const vm = new Constructor({
                propsData: {
                    error: '这是一个测试error的案例'
                }
            }).$mount();
            const errorMessageElement = vm.$el.querySelector('.error-message');
            const iconElement = vm.$el.querySelector('use');
            expect(errorMessageElement.innerText).to.eq('这是一个测试error的案例');
            expect(iconElement.getAttribute('xlink:href')).to.eq('#i-error');
        });
    });
    describe('测试事件', () => {

        it('测试所以事件', () => {
            const events = ['focus', 'blur', 'change'];
            events.forEach(eventName => {
                const Constructor = Vue.extend(Input);
                const vm = new Constructor().$mount();
                const callback = sinon.fake();
                vm.$on(eventName, callback);
                // 需要触发input的事件
                const event = new Event(eventName); // MOCK事件
                const inputElement = vm.$el.querySelector('input');
                inputElement.dispatchEvent(event); // 被事件调用
                expect(callback).to.have.been.called;
                expect(callback).to.have.been.calledWith(event);
            });
        });
        it('测试双向绑定', () => {
            const Constructor = Vue.extend(Input);
            const vm = new Constructor().$mount();
            const callback = sinon.fake();
            vm.$on('input', callback);
            // 需要触发input的事件
            const event = new Event('input'); // MOCK事件
            const inputElement = vm.$el.querySelector('input');
            // 需要获取input的target参数
            Object.defineProperty(event, 'target', {
                value: {
                    value: 'v-model'
                }
            });
            inputElement.dispatchEvent(event); // 被事件调用
            expect(callback).to.have.been.called;
            expect(callback).to.have.been.calledWith('v-model');
        });

    });
});
