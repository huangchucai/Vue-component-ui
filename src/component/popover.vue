<template>
    <div class="popover" @click.stop="xxx">
        <div class="content-wrapper" v-if="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'popover',
        data() {
            return {
                visible: false
            };
        },
        methods: {
            xxx() {
                this.visible = !this.visible;
                if (this.visible === true) {
                    console.log('popover展示');
                    this.$nextTick(() => {
                        let eventHandler = () => {
                            this.visible = false;
                            console.log('document popover消失');
                            document.removeEventListener('click', eventHandler);
                        };
                        document.addEventListener('click', eventHandler);
                    });
                } else {
                    console.log('vm popover消失');
                }
            }
        }
    };
</script>

<style scoped lang="stylus">
    .popover
        display inline-block;
        vertical-align: top;
        position relative;
        .content-wrapper
            position: absolute;
            bottom: 100%;
            left: 0;
            border 1px solid red;
            box-shadow 0 0 3px #333333;
            border-radius 4px;
</style>
