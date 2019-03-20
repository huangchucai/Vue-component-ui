<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'button-group'
    };
</script>
<style lang="stylus">
    .g-button-group
        display: inline-flex;
        vertical-align: middle;
        > .g-button
            margin-left: -1px;
            border-radius: 0px
            &:first-child
                border-top-left-radius: var(--border-radius);
                border-bottom-left-radius: var(--border-radius);
            &:last-child
                border-top-right-radius var(--border-radius);
                border-bottom-right-radius var(--border-radius);
            &:hover
                position relative; z-index 1;
</style>
