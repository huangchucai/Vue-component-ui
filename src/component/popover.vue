<template>
    <div class="popover" @click="checkPopover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
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
        methods: {
            positionContent() {
                document.body.appendChild(this.$refs.contentWrapper);
                let {top, left} = this.$refs.triggerWrapper.getBoundingClientRect();
                this.$refs.contentWrapper.style.top = `${top + window.scrollY}px`;
                this.$refs.contentWrapper.style.left = `${left + window.scrollX}px`;
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
        transform translateY(-100%)
        background: #fff;
        filter: drop-shadow(0px 0px 3px black);
        max-width 20em
        margin-top -10px
        word-break break-all
        &::before
            position absolute
            content " "
            top: 100%;
            width: 0
            height: 0
            border 10px solid transparent
            border-top-color #000
        &::after
            position absolute
            content " "
            top: calc(100% - 1px);
            width: 0
            height: 0
            border 10px solid transparent
            border-top-color #fff
</style>
