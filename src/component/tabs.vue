<template>
    <div class="toast">
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
                required: true
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
            }
        },
        provide() {
            return {
                eventBus: this.eventBus
            };
        },
        created() {
            this.$emit('update:selected', '这是g-tabs组件触发的事件')
        },
    };
</script>
