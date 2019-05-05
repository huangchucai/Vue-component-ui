<template>
    <div class="toast-head">
        <slot></slot>
        <slot name="actions"></slot>
    </div>
</template>

<script>
    export default {
        name: 'g-head',
        inject: ['eventBus'],
        created() {
            // this.$emit('update:selected', '这是g-tabs组件触发的事件')
        }
    }
</script>
