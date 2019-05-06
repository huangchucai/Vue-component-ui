<template>
    <div class="tab-body">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'g-tabs-body',
        inject:['eventBus'],
        created() {
        }
    }
</script>
