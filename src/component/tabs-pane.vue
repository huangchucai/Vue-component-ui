<template>
    <div class="tab-pane" :class="activeClass" v-if="active">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'g-tabs-pane',
        inject: ['eventBus'],
        props: {
            name: {
                type: Boolean | Number
            }
        },
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
        created() {
            this.eventBus.$on('update:selected', (name) => {
                this.active = name === this.name;
            });
        }
    };
</script>
<style scoped lang="stylus">
    .tab-pane
        &.active
            background: red
</style>
