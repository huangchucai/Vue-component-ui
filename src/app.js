import Vue from 'vue';
import Button from './component/button';
import Icon from './component/icon';
import ButtonGroup from './component/button-group';
import Input from './component/input';
import Col from './component/col';
import Row from './component/row';
import Footer from './component/footer';
import Header from './component/header';
import Layout from './component/layout';
import Sider from './component/sider';
import Content from './component/content';
import Toast from './component/toast';
import MyPlugin from './myPlugin';
import Tabs from './component/tabs';
import TabsBody from './component/tabs-body';
import TabsHead from './component/tabs-head';
import TabsItem from './component/tabs-item';
import TabsPane from './component/tabs-pane';

Vue.component('g-button', Button);
Vue.component('g-icon', Icon);
Vue.component('g-button-group', ButtonGroup);
Vue.component('g-input', Input);
Vue.component('g-col', Col);
Vue.component('g-row', Row);
Vue.component('g-layout', Layout);
Vue.component('g-header', Header);
Vue.component('g-content', Content);
Vue.component('g-sider', Sider);
Vue.component('g-footer', Footer);
Vue.component('g-toast', Toast);
Vue.component('g-tabs', Tabs);
Vue.component('g-tabs-head', TabsHead);
Vue.component('g-tabs-body', TabsBody);
Vue.component('g-tabs-item', TabsItem);
Vue.component('g-tabs-pane', TabsPane);

Vue.use(MyPlugin);

new Vue({
    el: '#app',
    data() {
        return {
            loadingFirst: false,
            loadingTwo: false,
            loadingThree: true,
            message: '李四',
            selectedTab: 'sports'
        };
    },
    methods: {
    }
});
