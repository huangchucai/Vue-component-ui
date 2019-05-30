<template>
    <div class="popover" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible"
             :class="{[`position-${popoverPosition}`]: true}">
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
                visible: false,
                popoverPosition: ''
            };
        },
        props: {
            position: {
                type: String,
                default: 'top',
                validator(val) {
                    return ['top', 'bottom', 'left', 'right'].indexOf(val) > -1;
                }
            },
            trigger: {
                type: String,
                default: 'click',
                validator(val) {
                    return ['click', 'hover'].indexOf(val) >= 0;
                }
            }
        },
        mounted() {
            if (this.trigger === 'click') {
                this.$refs.popover.addEventListener('click', this.checkPopover);
            } else {
                this.$refs.popover.addEventListener('mouseenter', this.open);
                this.$refs.popover.addEventListener('mouseleave', this.close);
            }
        },
        destroyed() {
            if (this.trigger === 'click' && this.$refs.popover) {
                this.$refs.popover.removeEventListener('click', this.checkPopover);
            } else {
                this.$refs.popover && this.$refs.popover.removeEventListener('mouseenter', this.open);
                this.$refs.popover && this.$refs.popover.removeEventListener('mouseleave', this.close);
            }
        },
        computed: {
            openEvent() {
                if (this.trigger === 'click') {
                    return 'click';
                } else {
                    return 'mouseenter';
                }
            },
            closeEvent() {
                if (this.trigger === 'click') {
                    return 'click';
                } else {
                    return 'mouseleave';
                }
            }
        },
        methods: {
            positionContent() {
                document.body.appendChild(this.$refs.contentWrapper);

                const {triggerWrapper, contentWrapper} = this.$refs;
                const {top, left, height, width} = triggerWrapper.getBoundingClientRect();
                const {height: wrapperHeight} = contentWrapper.getBoundingClientRect();
                this.computedPosition(wrapperHeight, top);
                const positionTable = {
                    top: {
                        top: top + window.scrollY,
                        left: left + window.scrollX
                    },
                    bottom: {
                        top: top + height + window.scrollY,
                        left: left + window.scrollX
                    },
                    left: {
                        top: top + (height - wrapperHeight) / 2 + window.scrollY,
                        left: left + window.scrollX
                    },
                    right: {
                        top: top + (height - wrapperHeight) / 2 + window.scrollY,
                        left: left + width + window.scrollX
                    }
                };
                contentWrapper.style.top = `${positionTable[this.popoverPosition].top}px`;
                contentWrapper.style.left = `${positionTable[this.popoverPosition].left}px`;
            },
            computedPosition(wrapperHeight, top) {
                if (wrapperHeight + 10 > top && this.position === 'top') {
                    this.popoverPosition = 'bottom';
                } else {
                    this.popoverPosition = this.position;
                }
            },
            eventHandler(e) {
                if (this.$refs.popover.contains(e.target) || this.$refs.contentWrapper.contains(e.target)) {
                    return;
                }
                this.close();
            },
            // todo: 这里功能明确，点开和关闭分开
            close() {
                this.visible = false;
                document.removeEventListener('click', this.eventHandler);
            },
            open() {
                this.visible = true;
                this.$nextTick(() => {
                    this.positionContent();
                    document.addEventListener('click', this.eventHandler);
                });
            },
            checkPopover(e) {
                if (this.$refs.triggerWrapper && this.$refs.triggerWrapper.contains(e.target)) {
                    if (this.visible === true) {
                        this.close();
                    } else {
                        this.open();
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
            &::before, &::after
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
            &::before, &::after
                top: 50%;
                transform translateY(-50%)
            &::before
                right: 100%;
                border-right-color #000
            &::after
                border-right-color #fff
                right: calc(100% - 1px);
</style>
