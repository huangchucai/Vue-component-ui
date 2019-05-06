<template>
    <div class="toast-head">
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
        created() {
            // this.$emit('update:selected', '这是g-tabs组件触发的事件')
        }
    };
</script>
<style scoped lang="stylus">
    $tab-height = 40px;
    .toast-head
        display: flex
        height: $tab-height
        justify-content: flex-start
        align-items: center
        border: 1px solid red
        > .slot-wrapper
            margin-left auto
</style>
