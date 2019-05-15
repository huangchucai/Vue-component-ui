<template>
    <div class="popover" @click.stop="xxx">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <span class="triggerWrapper" ref="triggerWrapper">
            <slot></slot>
        </span>
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
                        document.body.appendChild(this.$refs.contentWrapper);
                        let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect();
                        this.$refs.contentWrapper.style.top = `${top + window.scrollY}px`;
                        this.$refs.contentWrapper.style.left = `${left + window.scrollX}px`;
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
        border 1px solid red;
        height 100px;
        box-shadow 0 0 3px #333333;
        border-radius 4px;
        transform translateY(-100%)
</style>
