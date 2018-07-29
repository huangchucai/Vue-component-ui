<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]: true}">
        <svg class="icon" v-if="iconName">
            <use :xlink:href="`#i-${iconName}`"></use>
        </svg>
        <div class="icon-content">
            <slot></slot>
        </div>
    </button>
</template>
<script>
    export default {
        props: {
            iconPosition: {
              value: 'String',
              default: 'left'
            },
            iconName: ''
        }
    }
</script>
<style lang="stylus">
    .icon
        width: 1em;
        height: 1em;
    .g-button
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background: var(--button-bg);
        display: inline-flex
        justify-content: center
        align-items: center
        vertical-align: middle
        &:hover
            border-color: var(--border-color-hover);
        &:active
            border-color: var(--button-active-bg);
        &:focus
            outline: none;
        &.icon-left
            .icon-content
                order 2
            .icon
                order 1
                margin-right: .2em
        &.icon-right
            .icon-content
                order 1
            .icon
                order 2
                margin-left: .2em
                margin-right: 0
</style>
