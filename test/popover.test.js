import Vue from 'vue';
import Popover from '../src/component/popover';

const expect = chai.expect;

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Popover', () => {
    it('存在', () => {
        expect(Popover).to.be.ok;
    });

    describe('测试属性', () => {
        it('测试position属性', (done) => {
            Vue.component('g-popover', Popover);
            const div = document.createElement('div');
            document.body.appendChild(div);
            div.innerHTML = `
            <g-popover position="left" ref="a">
              <template slot="content">
              弹出内容
              </template>
              <button>点我</button>
            </g-popover>`;
            const vm = new Vue({
                el: div
            });
            vm.$el.querySelector('button').click();
            setTimeout(() => {
                const {contentWrapper} = vm.$refs.a.$refs;
                expect(contentWrapper.classList.contains('position-left')).to.be.true;
                done();
            });
        });
        it('可以设置trigger', (done) => {
            Vue.component('g-popover', Popover);
            const div = document.createElement('div');
            document.body.appendChild(div);
            div.innerHTML = `
            <g-popover trigger="hover" ref="a">
              <template slot="content">
              弹出内容
              </template>
              <button>点我</button>
            </g-popover>`;
            const vm = new Vue({
                el: div
            });
            let event = new Event('mouseenter');
            vm.$el.querySelector('.popover').dispatchEvent(event);
            vm.$nextTick(() => {
                const {contentWrapper} = vm.$refs.a.$refs;
                expect(contentWrapper).to.exist;
                done();
            });

        });
    });

});
