<template>
    <div class="row" :style="rowStyle" :class="rowClass">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'g-row',
        props: {
            gutter: {
                type: [Number, String]
            },
            align: {
                type: String,
                default: 'left',
                validator(value) {
                    return ['left', 'right', 'center'].includes(value);
                }
            }
        },
        computed: {
            rowStyle() {
                const {gutter} = this;
                return {marginLeft: -gutter / 2 + 'px', marginRight: -gutter / 2 + 'px'};
            },
            rowClass() {
                const {align} = this;
                return [`align-${align}`];
            }
        },
        mounted() {
            this.$children.forEach(vm => {
                vm.gutter = this.gutter;
            });
        }
    };
</script>
<style lang="stylus" scoped>
    .row
        display: flex
        flex-wrap: wrap
        &.align-left
            justify-content flex-start
        &.align-right
            justify-content flex-end
        &.align-center
            justify-content: center
</style>
