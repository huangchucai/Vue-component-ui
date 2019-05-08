import Vue from 'vue';
import Tabs from '../src/component/tabs';
import TabsBody from '../src/component/tabs-body';
import TabsHead from '../src/component/tabs-head';
import TabsItem from '../src/component/tabs-item';
import TabsPane from '../src/component/tabs-pane';

const expect = chai.expect;
import Tab from '../src/component/tabs';

Vue.component('g-tabs', Tabs);
Vue.component('g-tabs-head', TabsHead);
Vue.component('g-tabs-body', TabsBody);
Vue.component('g-tabs-item', TabsItem);
Vue.component('g-tabs-pane', TabsPane);
Vue.config.devtools = false;
Vue.config.productionTip = false;

describe('tabs组件', () => {
    it('存在', () => {
        expect(Tab).to.be.ok;
    });
    describe('测试属性', () => {
        it('测试selected属性', (done) => {
            const div = document.createElement('div');
            document.body.appendChild(div);
            div.innerHTML = `
                <g-tabs selected="sports">
                    <g-tabs-head>
                        <g-tabs-item name="woman">
                            美女
                        </g-tabs-item>
                    <g-tabs-item name="finance" disabled>财经</g-tabs-item>
                    <g-tabs-item name="sports">体育</g-tabs-item>
                    </g-tabs-head>
                <g-tabs-body>
                     <g-tabs-pane name="woman">美女相关资讯</g-tabs-pane>
                     <g-tabs-pane name="finance">财经相关资讯</g-tabs-pane>
                     <g-tabs-pane name="sports">体育相关资讯</g-tabs-pane>
                </g-tabs-body>
                </g-tabs>
            `;
            const vm = new Vue({
                el: div,
            });
            // 在mounted的时候传递，属于异步
            vm.$nextTick(() => {
                const element = vm.$el.querySelector('.tab-item[data-name="sports"]');
                expect(element.classList.contains('active')).to.be.true;
                done();
            });
        });
    });
});
