<template>
    <div class="toast-pane">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'g-tabs-pane',
        inject: ['eventBus'],
        created() {
            this.eventBus.$on('update:selected', (data) => {
                console.log(data);
            });
        }
    };
</script>
