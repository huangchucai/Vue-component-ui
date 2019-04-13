import Toast from './component/toast';

export default {
    install(Vue, options) {
        Vue.prototype.$toast = function (message, props) {
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    closeButton: props
                }
            });
            vm.$slots.default = message;
            vm.$mount();
            document.body.appendChild(vm.$el);
        };
    }
};
