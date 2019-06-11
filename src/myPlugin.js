import Toast from './component/toast';

let currentToast;
console.log('test');
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function (message, props) {
            // toast存在的时候，销毁toast
            if (currentToast) {
                currentToast.close();
            }
            currentToast = createToast(Vue, message, props, () => {
                currentToast = null;
            });
        };
    }
};

function createToast(Vue, message, propsData, closeCallback) {
    const Constructor = Vue.extend(Toast);
    const vm = new Constructor({
        propsData
    });
    vm.$slots.default = message;
    vm.$on('currentToastClose', closeCallback);
    vm.$mount();
    document.body.appendChild(vm.$el);
    return vm;
}
