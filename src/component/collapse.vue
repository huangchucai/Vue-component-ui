<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'collapse',
        props: {
            single: {
                type: Boolean,
                default: false
            },
            selected: {
                type: Array,
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
        mounted() {
            this.eventBus.$emit('update:selected', this.single ? [this.selected[0]] : this.selected);
            this.eventBus && this.eventBus.$on('update:removeSelected', (name) => {
                const selectedCopy = JSON.parse(JSON.stringify(this.selected));
                const index = selectedCopy.indexOf(name);
                selectedCopy.splice(index, 1);
                this.eventBus && this.eventBus.$emit('update:selected', selectedCopy);
                this.$emit('update:selected', selectedCopy);
            });
            this.eventBus && this.eventBus.$on('update:addSelected', (name) => {
                let selectedCopy = JSON.parse(JSON.stringify(this.selected));
                if (this.single) {
                    selectedCopy = [name];
                } else {
                    selectedCopy.push(name);
                }
                this.eventBus && this.eventBus.$emit('update:selected', selectedCopy);
                this.$emit('update:selected', selectedCopy);
            });
        }

    };
</script>

<style scoped lang="stylus">
    $grey = #ddd;
    $border-radius = 4px;
    .collapse {
        border: 1px solid $grey;
        border-radius: $border-radius;
    }

</style>
