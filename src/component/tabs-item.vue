<template>
    <div class="toast-item" @click="xxx">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'g-tabs-item',
        inject: ['eventBus'],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: Boolean | Number
            }
        },
        created() {
            this.eventBus.$on('update:selected', (data) => {
                console.log(data);
            })
        },
        methods: {
            xxx() {
                this.eventBus.$emit('update:selected', this.name);
            }
        }
    };
</script>
