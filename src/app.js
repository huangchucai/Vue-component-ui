import Vue from 'vue';
import Button from './component/button';
import Icon from './component/icon';
import ButtonGroup from './component/button-group';

console.log(ButtonGroup);
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
