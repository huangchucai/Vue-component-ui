<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]: true, 'g-loading': loading}" @click="$emit('click')">
        <icon :icon-name="iconName" v-if="iconName && !loading"></icon>
        <icon icon-name="loading" class="loading" v-if="loading"></icon>
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
              default: 'left',
              validator(value) {
                  return value === 'left' || value === 'right'
              }
            },
            iconName: '',
            loading: {
                value: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="stylus">
    @keyframes spin
        0% {transform: rotate(0deg)}
        100% {transform: rotate(360deg)}
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
        &.g-loading
            background: rgba(153,153,153,.8)
        .loading
            animation: 2s infinite spin linear
</style>
