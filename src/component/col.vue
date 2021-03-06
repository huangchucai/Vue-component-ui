<template>
    <div class="col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>
<script>
    const validator = (value) => {
        let keys = Object.keys(value);
        let valid = true;
        keys.forEach(key => {
            if (!['span', 'offset'].includes(key)) {
                valid = false;
            }
        });
        return valid;
    };
    export default {
        name: 'g-col',
        props: {
            span: {
                type: [Number, String]
            },
            offset: {
                type: [Number, String]
            },
            ipad: {
                type: Object,
                validator,
            },
            narrowPc: {
                type: Object,
                validator,
            },
            pc: {
                type: Object,
                validator,
            },
            widePc: {
                type: Object,
                validator,
            }

        },
        data() {
            return {
                gutter: 0
            };
        },
        computed: {
            colStyle() {
                const {gutter} = this;
                return {
                    paddingLeft: gutter / 2 + 'px',
                    paddingRight: gutter / 2 + 'px'
                };
            },
            colClass() {
                const {span, offset, ipad, narrowPc, pc, widePc} = this;
                return [
                    span && `col-${span}`,
                    offset && `offset-${offset}`,
                    ...(ipad ? [`col-ipad-${ipad.span}`] : []),
                    ...(narrowPc ? [`col-narrow-pc-${narrowPc.span}`] : []),
                    ...(pc ? [`col-pc-${pc.span}`] : []),
                    ...(widePc ? [`col-wide-pc-${widePc.span}`] : [])
                ];
            }
        }
    };
</script>

<style lang="stylus" scoped>
    $grid-columns = 24;
    .col
        width: 50%;
        $class-prefix = col-
        for columns in 1 .. $grid-columns
            &.{$class-prefix}{columns}
                width: (columns / $grid-columns) * 100%;
        for columns in 1 .. $grid-columns
            &.offset-{columns}
                margin-left: (columns / $grid-columns) * 100%;
        @media (min-width: 576px)
            $class-prefix = col-ipad-;
            for columns in 1 .. $grid-columns
                &.{$class-prefix}{columns}
                    width: (columns / $grid-columns) * 100%;
            $class-prefix = offset-ipad-
            for columns in 1 .. $grid-columns
                &.{$class-prefix}{columns}
                    margin-left: (columns / $grid-columns) * 100%;
        @media (min-width: 768px)
            $class-prefix = col-narrow-pc-;
            for columns in 1 .. $grid-columns
                &.{$class-prefix}{columns}
                    width: (columns / $grid-columns) * 100%;
            $class-prefix = offset-narrow-pc-
            for columns in 1 .. $grid-columns
                &.{$class-prefix}{columns}
                    margin-left: (columns / $grid-columns) * 100%;
        @media (min-width: 992px)
            $class-prefix = col-pc-;
            for columns in 1 .. $grid-columns
                &.{$class-prefix}{columns}
                    width: (columns / $grid-columns) * 100%;
            $class-prefix = offset-pc-
            for columns in 1 .. $grid-columns
                &.{$class-prefix}{columns}
                    margin-left: (columns / $grid-columns) * 100%;
        @media (min-width: 1200px)
            $class-prefix = col-wide-pc-;
            for columns in 1 .. $grid-columns
                &.{$class-prefix}{columns}
                    width: (columns / $grid-columns) * 100%;
            $class-prefix = offset-wide-pc-
            for columns in 1 .. $grid-columns
                &.{$class-prefix}{columns}
                    margin-left: (columns / $grid-columns) * 100%;
</style>
