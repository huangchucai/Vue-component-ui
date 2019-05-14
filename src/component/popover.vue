<template>
    <div class="popover" @click="xxx">
        <div class="content-wrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <slot></slot>
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
            xxx() {
                this.visible = !this.visible;
                console.log('xxx');
            }
        }
    };
</script>

<style scoped lang="stylus">
    .popover
        display inline-block;
        vertical-align: top;
        position relative;
        .content-wrapper
            position: absolute;
            bottom: 100%;
            left: 0;
            border 1px solid red;
            box-shadow 0 0 3px #333333;
            border-radius 4px;
</style>
