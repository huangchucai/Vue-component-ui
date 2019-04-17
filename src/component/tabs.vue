<template>
    <div class="toast">
        <slot></slot>
    </div>
</template>

<script>
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
        created() {
            // this.$emit('update:selected', 'xxx')
        }
    };
</script>
