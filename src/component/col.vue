<template>
    <div class="col" :class="[span && `col-${span}`, offset && `offset-${offset}`]"
         :style="{paddingLeft: gutter/2 + 'px', paddingRight: gutter/2 + 'px'}">
        <div style="border: 1px solid green;height: 100px">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'g-col',
        props: {
            span: {
                type: [Number, String]
            },
            offset: {
                type: [Number, String]
            },
        },
        data() {
            return {
                gutter: 0
            };
        },
        created() {
        },
        mounted() {
        }
    };
</script>

<style lang="stylus" scoped>
    $grid-columns = 24;
    $class-prefix = col-
    .col
        width: 50%;
        for columns in 1 .. $grid-columns
            &.{$class-prefix}{columns}
                width: (columns / $grid-columns) * 100%;
        for columns in 1 .. $grid-columns
            &.offset-{columns}
                margin-left: (columns / $grid-columns) * 100%;
</style>
