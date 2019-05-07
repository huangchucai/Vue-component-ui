<template>
    <div class="tab">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'g-tabs',
        props: {
            selected: {
                type: String,
                required: true,
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0;
                }
            }
        },
        data() {
            return {
                eventBus: new Vue()
            };
        },
        provide() {
            return {
                eventBus: this.eventBus
            };
        },
        created() {
            this.eventBus.$on('update:selected', (name) => {
                this.$emit('update:selected', name);
            });
        },
        mounted() {
            this.$children.forEach(vm => {
                if (vm.$options.name === 'g-head') {
                    vm.$children.forEach(childVm => {
                        if (childVm.$options.name === 'g-tabs-item' && childVm.name === this.selected) {
                            this.eventBus.$emit('update:selected', this.selected, childVm);
                        }
                    });
                }
            });
        },
    };
</script>
