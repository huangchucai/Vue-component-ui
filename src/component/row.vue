<template>
    <div class="row" :style="{marginLeft: -gutter/2 + 'px', marginRight: -gutter/2+'px'}">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'g-row',
        props: {
            gutter: {
                type: [Number, String]
            }
        },
        created() {
            // console.log(this.$children);
        },
        mounted() {
            this.$children.forEach(vm => {
                vm.gutter = this.gutter
            })
        }
    };
</script>
<style lang="stylus" scoped>
    .row
        display: flex
</style>
