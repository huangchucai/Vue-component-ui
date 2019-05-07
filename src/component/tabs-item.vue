<template>
    <div class="tab-item" @click="checkItem" :class="activeClass">
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
            checkItem() {
                this.eventBus.$emit('update:selected', this.name, this);
            }
        }
    };
</script>
<style scoped lang="stylus">
    $blue = blue
    .tab-item
        flex-shrink: 0
        padding: 0 1em
        display: flex
        align-items: center
        height: 100%
        cursor: pointer
        &.active
            background: red
            color: $blue
</style>
