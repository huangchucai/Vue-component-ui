<template>
    <div class="tab-item" @click="xxx" :class="activeClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'g-tabs-item',
        inject: ['eventBus'],
        data() {
            return {
                active: false
            };
        },
        computed: {
            activeClass() {
                return {
                    active: this.active
                };
            }
        },
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
            this.eventBus.$on('update:selected', (name) => {
                this.active = name === this.name;
            });
        },
        methods: {
            xxx() {
                this.eventBus.$emit('update:selected', this.name);
            }
        }
    };
</script>
<style scoped lang="stylus">
    .tab-item
        flex-shrink: 0
        padding: 0 1em;
        &.active
            background: red
</style>
