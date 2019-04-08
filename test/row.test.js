import Vue from 'vue';
import Row from '../src/component/row';
import Col from '../src/component/col';

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Row', () => {
    it('存在', () => {
        expect(Row).to.be.ok;
    });
    it('接受gutter', (done) => {
        Vue.component('g-col', Col);
        Vue.component('g-row', Row);
        const div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = `
            <g-row gutter="20">
                <g-col></g-col> 
                <g-col></g-col> 
            </g-row>
        `;
        const vm = new Vue({
            el: div
        });

        setTimeout(() => {
            const col = vm.$el.querySelector('.col');
            const row = vm.$el.querySelector('.row');
            expect(getComputedStyle(col).paddingRight).to.eq('10px');
            expect(getComputedStyle(row).marginLeft).to.eq('-10px');
            div.remove();
            vm.$destroy();
            done();
        }, 1000);
    });
    it('接受align', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Row);
        const vm = new Constructor({
            propsData: {
                align: 'right'
            }
        }).$mount(div);
        div.remove();
        vm.$destroy();
        expect(getComputedStyle(vm.$el).justifyContent).to.eq('flex-end');
    });
});
