<template>
    <div class="toast-head">
        <div class="line" ref="line"></div>
        <slot></slot>
        <div class="slot-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'g-head',
        inject: ['eventBus'],
        mounted() {
            this.eventBus.$on('update:selected', (name, vm) => {
                const {width, left} = vm.$el.getBoundingClientRect();
                this.$refs.line.style.left = `${left}px`;
                this.$refs.line.style.width = `${width}px`;
            });
        }
    };
</script>
<style scoped lang="stylus">
    $tab-height = 40px;
    .toast-head
        display: flex
        height: $tab-height
        justify-content: flex-start
        position: relative;
        > .slot-wrapper
            margin-left auto
        .line
            border-bottom: 1px solid green;
            position absolute
            bottom: 0
            transition: all .3s;

</style>
