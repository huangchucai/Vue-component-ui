<template>
    <div class="layout" :class="siderLayout">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'g-layout',
        data() {
          return {
              siderLayout: {
                  hasSider: false
              }
          }
        },
        mounted() {
            this.$children.forEach(vm => {
                if (vm.$options.name === 'g-sider') {
                    this.siderLayout.hasSider = true
                }
            })
        },
    }
</script>
<style lang="stylus" scoped>
    .layout
        display: flex
        flex-direction column
        border 1px solid #abcdef
        flex-grow 1
        &.hasSider
            flex-direction row
</style>
