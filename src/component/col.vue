<template>
    <div class="col" :class="[`col-${span}`]">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: "g-col",
        props: {
            span: {
                type: [Number, String]
            }
        }
    }
</script>

<style lang="stylus" scoped>
    $grid-columns = 24;
    $class-prefix = col-
    .col
        height 100px;
        background: gray;
        width: 50%;
        border: 1px solid red;
        for columns in 1 .. $grid-columns
            &.{$class-prefix}{columns}
                width: (columns / $grid-columns) * 100%;
</style>
