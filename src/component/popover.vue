<template>
    <div class="popover" @click="checkPopover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible"
             :class="{[`position-${position}`]: true}">
            <slot name="content"></slot>
        </div>
        <span class="trigger-wrapper" ref="triggerWrapper">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'popover',
        data() {
            return {
                visible: false
            };
        },
        props: {
            position: {
                type: String,
                default: 'top',
                validator(val) {
                    return ['top', 'bottom', 'left', 'right'].indexOf(val) > -1;
                }
            }
        },
        methods: {
            positionContent() {
                document.body.appendChild(this.$refs.contentWrapper);
                const {triggerWrapper, contentWrapper} = this.$refs;
                let {top, left, height, width} = triggerWrapper.getBoundingClientRect();
                if (this.position === 'top') {
                    contentWrapper.style.top = `${top + window.scrollY}px`;
                    contentWrapper.style.left = `${left + window.scrollX}px`;
                } else if (this.position === 'bottom') {
                    contentWrapper.style.top = `${top + height + window.scrollY}px`;
                    contentWrapper.style.left = `${left + window.scrollX}px`;
                } else if (this.position === 'left') {
                    const {height: wrapperHeight} = contentWrapper.getBoundingClientRect();
                    contentWrapper.style.top = `${top + (height - wrapperHeight) / 2 + window.scrollY}px`;
                    contentWrapper.style.left = `${left + window.scrollX}px`;
                } else if (this.position === 'right') {
                    const {height: wrapperHeight} = contentWrapper.getBoundingClientRect();
                    contentWrapper.style.top = `${top + (height - wrapperHeight) / 2 + window.scrollY}px`;
                    contentWrapper.style.left = `${left + width+ window.scrollX}px`;
                }

            },
            listenDocument() {
                let eventHandler = (e) => {
                    if (this.$refs.contentWrapper.contains(e.target)) {
                        return;
                    }
                    this.visible = false;
                    document.removeEventListener('click', eventHandler);
                };
                document.addEventListener('click', eventHandler);
            },
            checkPopover(e) {
                if (this.$refs.triggerWrapper && this.$refs.triggerWrapper.contains(e.target)) {
                    this.visible = !this.visible;
                    if (this.visible === true) {
                        this.$nextTick(() => {
                            this.positionContent();
                            this.listenDocument();
                        });
                    }
                }
            }
        }
    };
</script>

<style scoped lang="stylus">
    .popover
        display inline-block;
        vertical-align: top;
        position relative;
        .trigger-wrapper
            display inline-block

    .content-wrapper
        position: absolute;
        border 1px solid black
        padding .5em 1em
        border-radius 4px;
        background: #fff;
        filter: drop-shadow(0px 0px 3px black);
        max-width 20em
        word-break break-all
        &::before, &::after
            position absolute
            content " "
            width: 0
            height: 0
            border 10px solid transparent
        &.position-top
            transform translateY(-100%)
            margin-top -10px
            &::before
                border-top-color #000
                top: 100%;
            &::after
                border-top-color #fff
                top: calc(100% - 1px);
        &.position-bottom
            margin-top 10px
            &::before
                border-bottom-color #000
                bottom: 100%;
            &::after
                border-bottom-color #fff
                bottom: calc(100% - 1px);
        &.position-left
            transform translateX(-100%)
            margin-left -10px;
            &::before,&::after
                top: 50%;
                transform translateY(-50%)
            &::before
                border-left-color #000
                left: 100%;
            &::after
                border-left-color #fff
                left: calc(100% - 1px);
        &.position-right
            margin-left 10px;
            &::before,&::after
                top: 50%;
                transform translateY(-50%)
            &::before
                right: 100%;
                border-right-color #000
            &::after
                border-right-color #fff
                right: calc(100% - 1px);
</style>
