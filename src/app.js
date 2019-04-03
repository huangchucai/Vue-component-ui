import Vue from 'vue';
import Button from './component/button';
import Icon from './component/icon';
import ButtonGroup from './component/button-group';
import Input from './component/input';
import Col from './component/col';
import Row from './component/row';

Vue.component('g-button', Button);
Vue.component('icon', Icon);
Vue.component('g-button-group', ButtonGroup);
Vue.component('g-input', Input);
Vue.component('g-col', Col);
Vue.component('g-row', Row);

new Vue({
    el: '#app',
    data() {
        return {
            loadingFirst: false,
            loadingTwo: false,
            loadingThree: true,
            message: '李四'
        };
    },
    mounted() {
        const event = new Event('input');
        const inputEvent = this.$el.querySelectorAll('input')[1];
        inputEvent.dispatchEvent(event);
    },
    methods: {
        changeInput(e) {
            console.log(e);
        },
    }
});
