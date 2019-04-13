<template>
    <div class="toast">
        <slot></slot>
        <span class="line"></span>
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
            }
        },
        mounted() {
            if (this.autoClose) {
                setTimeout(() => {
                    this.close();
                }, this.autoCloseDelay * 1000);
            }
        },
        methods: {
            close() {
                this.$el.remove();
                this.$destroy();
            },
            closeButtonCallback() {
                this.close();
                if(this.closeButton.callback && typeof this.closeButton.callback === 'function') {
                    this.closeButton.callback();
                }
            }
        }
    };
</script>
<style lang="stylus" scoped>
    $font-size = 14px;
    $toast-height = 40px;
    $toast-bg = rgba(0, 0, 0, .75);

    .toast
        font-size $font-size
        height $toast-height
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
        .close-button
            padding-left 16px;
        .line
            height: 100%;
            border-left: 1px solid #666;
            margin-left 16px;

</style>
