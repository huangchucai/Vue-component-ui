import Vue from 'vue';
import Toast from '../src/component/toast';

Vue.config.productionTip = false;
Vue.config.devtools = false;
describe('toast 组件', () => {
    it('存在', () => {
        expect(Toast).to.be.ok;
    });
    describe('测试属性', () => {
        it('测试autoClose属性', (done) => {
            const div = document.createElement('div');
            document.body.appendChild(div);
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    autoClose: 1
                }
            }).$mount();
            vm.$on('currentToastClose', () => {
                expect(document.body.contains(vm.$el)).to.eq(false);
                done();
            });
        });
        it('测试closeButton', () => {
            const callback = sinon.fake();
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text: '关闭了',
                        callback
                    }
                }
            }).$mount();
            const closeButton = vm.$el.querySelector('.close-button');
            expect(closeButton.textContent.trim()).to.eq('关闭了');
            closeButton.click();
            // expect(callback).to.not.have.been.called;
            expect(callback).to.have.been.called;
        });
        it('测试position', () => {
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    position: 'top'
                }
            }).$mount();
            expect(vm.$el.classList.contains('position-top')).to.eq(true);
        });
        it('测试enableHtml', () => {
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    enableHtml: true
                }
            });
            vm.$slots.default = '<strong id="strong-test">点击</strong>';
            vm.$mount();
            const strongElement = vm.$el.querySelector('#strong-test');
            expect(strongElement).to.be.exist;
        });
    });
});
