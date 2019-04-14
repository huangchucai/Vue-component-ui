<template>
    <div class="toast" ref="toast" :class="[toastPosition]">
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
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'middle', 'bottom'].indexOf(value) >= 0;
                }
            },
            enableHtml: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            toastPosition() {
                return [`position-${this.position}`];
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
                // 点击关闭的时候，清空currentToast
                this.$emit('currentToastClose');
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
    $animation-delay = 1s;
    @keyframes fade-in {
        0% {
            opacity: 0
        }
        100% {
            opacity 1
        }
    }

    @keyframes slide-down {
        0% {
            opacity: 0;
            transform translate(-50%, -100%)
        }
        100% {
            opacity 1;
            transform translate(-50%, 0)
        }
    }

    @keyframes slide-up {
        0% {
            opacity: 0;
            transform translate(-50%, 100%)
        }
        100% {
            opacity 1;
            transform translate(-50%, 0)
        }
    }

    .toast
        font-size $font-size
        min-height $toast-min-height
        line-height: 1.5
        position: fixed
        left: 50%
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
        &.position-top
            top: 0
            transform: translateX(-50%)
            animation slide-down $animation-delay
            border-top-left-radius 0;
            border-top-right-radius 0;
        &.position-middle
            top 50%
            transform: translate(-50%, -50%);
            animation fade-in $animation-delay
        &.position-bottom
            bottom 0;
            transform: translateX(-50%);
            animation slide-up $animation-delay
            border-bottom-left-radius 0;
            border-bottom-right-radius 0;
</style>
