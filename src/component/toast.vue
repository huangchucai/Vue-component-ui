<template>
    <div class="toast" ref="toast">
        <div class="message">
            <slot v-if="!enableHtml"></slot>
            <div v-html="$slots.default" v-else></div>
        </div>
        <span class="line" ref="line"></span>
        <span class="close-button" @click="closeButtonCallback">{{closeButton.text}}</span>
    </div>
</template>

<script>
    export default {
        name: 'g-toast',
        props: {
            autoClose: {
                type: Boolean,
                default: true
            },
            autoCloseDelay: {
                type: Number,
                default: 200
            },
            closeButton: {
                type: Object,
                default() {
                    return {
                        text: '关闭',
                        callback: undefined
                    };
                }
            },
            enableHtml: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.execAutoClose();
            this.updateStyle();
        },
        methods: {
            execAutoClose() {
                if (this.autoClose) {
                    setTimeout(() => {
                        this.close();
                    }, this.autoCloseDelay * 1000);
                }
            },
            updateStyle() {
                // 由于plugin中vm.$mount() 在放入页面前执行，所以在当前执行栈获取不到对应的值
                this.$nextTick(() => {
                    // console.log(getComputedStyle(this.$refs.toast).height);
                    // console.log(this.$refs.toast.getBoundingClientRect().height);
                    this.$refs.line.style.height = getComputedStyle(this.$refs.toast).height;
                });
            },
            close() {
                this.$el.remove();
                this.$destroy();
            },
            closeButtonCallback() {
                this.close();
                if (this.closeButton.callback && typeof this.closeButton.callback === 'function') {
                    this.closeButton.callback();
                }
            }
        }
    };
</script>
<style lang="stylus" scoped>
    $font-size = 14px;
    $toast-min-height = 40px;
    $toast-bg = rgba(0, 0, 0, .75);

    .toast
        font-size $font-size
        min-height $toast-min-height
        line-height: 1.5
        position: fixed
        top: 0
        left: 50%
        transform: translateX(-50%)
        display: flex
        align-items center
        background: $toast-bg
        border-radius: 4px;
        box-shadow 0 0 3px 0 rgba(0, 0, 0, .50);
        padding 0 16px;
        color: #fff
        .message
            padding 6px 0;
        .close-button
            padding-left 16px;
            flex-shrink 0
        .line
            height: 100%;
            border-left: 1px solid #666;
            margin-left 16px;

</style>
