<template>
    <div class="toast-head">
        <slot></slot>
        <slot name="actions"></slot>
    </div>
</template>

<script>
    export default {
        name: 'g-head'
    }
</script>
