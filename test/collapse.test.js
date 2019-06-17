import Vue from 'vue';
import Collapse from '../src/component/collapse';
import CollapseItem from '../src/component/collapse-item';

Vue.config.devtools = false;
Vue.config.productionTip = false;

describe('collapse 测试', () => {
    before(() => {
        Vue.component('g-collapse', Collapse);
        Vue.component('g-collapse-item', CollapseItem);
    });
    it('存在', () => {
        expect(Collapse).to.be.ok;
        expect(CollapseItem).to.be.ok;
    });
    it('测试single属性', (done) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <g-collapse :selected.sync="selectedTab" single>
                <g-collapse-item name="1" title="标题一"><span id="content-1">内容1</span></g-collapse-item>
                <g-collapse-item name="2" title="标题二"><span id="content-2">内容2</span></g-collapse-item>
                <g-collapse-item name="3" title="标题三"><span id="content-3">内容3</span></g-collapse-item>
            </g-collapse>
        `;
        document.body.appendChild(div);
        const vm = new Vue({
            el: div,
            data() {
                return {
                    selectedTab: ['1', '2']
                };
            }
        });
        // 这里设置为100 是因为会影响popover.test.js的测试用例
        setTimeout(() => {
            expect(vm.$el.querySelector('#content-1')).to.exist;
            vm.$el.querySelector('[data-name="2"]').click();
            vm.$nextTick(() => {
                expect(vm.$el.querySelector('#content-2')).to.exist;
                done();
            });
        }, 100);
    });
    it('测试selected属性', (done) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <g-collapse :selected.sync="selectedTab">
                <g-collapse-item name="1" title="标题一"><span id="content-1">内容1</span></g-collapse-item>
                <g-collapse-item name="2" title="标题二"><span id="content-2">内容2</span></g-collapse-item>
                <g-collapse-item name="3" title="标题三"><span id="content-3">内容3</span></g-collapse-item>
            </g-collapse>
        `;
        document.body.appendChild(div);
        const vm = new Vue({
            el: div,
            data: {
                selectedTab: ['1', '2']
            }
        });
        setTimeout(() => {
            expect(vm.$el.querySelector('#content-1')).to.exist;
            expect(vm.$el.querySelector('#content-2')).to.exist;
            done();
        });
    });
    it('触发 update:selected事件', (done) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <g-collapse :selected.sync="selectedTab" @update:selected="onSelect">
                <g-collapse-item name="1" title="标题一"><span id="content-1">内容1</span></g-collapse-item>
                <g-collapse-item name="2" title="标题二"><span id="content-2">内容2</span></g-collapse-item>
                <g-collapse-item name="3" title="标题三"><span id="content-3">内容3</span></g-collapse-item>
            </g-collapse>
        `;
        document.body.appendChild(div);
        const callback = sinon.fake.returns('click callback');
        const vm = new Vue({
            el: div,
            data: {
                selectedTab: ['1']
            },
            methods: {
                onSelect: callback
            }
        });
        vm.$el.querySelector('[data-name="2"]').click();
        setTimeout(() => {
            expect(vm.selectedTab).to.deep.equal(['1', '2']);
            expect(callback.callCount).to.eq(1);
            done();
        });
    });
});
