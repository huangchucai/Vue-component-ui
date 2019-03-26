## Vue常用组件的封装

本项目主要使用Vue来封装一些常见的ui组件，从0开始一步步的总结开发的流程和步骤。

### 项目的开始
1. 引入parcel和Vue的单文件组件
2. 注意Vue官网对于parcel的引入的讲解
     ```javascript
    // package.json 中添加 https://cn.vuejs.org/v2/guide/installation.html
    {
      // ...
      "alias": {
        "vue" : "./node_modules/vue/dist/vue.common.js"
      }
    }
    ```
3. 启动
    ```javascript
    ./node_modules/.bin/parcel index.html
    npx parcel --no-cache 
    ```

### css总结
1. 块级元素中的内联元素无法对齐的话，就加上`vertical-align`

### vue总结
1. `slot`插槽上添加class无效，可以在外面套一层div
2. 属性的检查器`validator`
3. vue中的template中使用JS的时候默认绑定this（内部用with实现）
4. vue的组件注册的2种方式-> 全局注册(Vue.component)，局部注册({components: })
5. vm.$el 只有在构造函数调用`$mount`的时候才会出现，渲染了dom

### js总结

### npm 总结

1. 可以使用`npm-check`来检查依赖的更新
2. `npm link` 可以连接我们本地的包进行测试，而不用发布切换

### 自动化测试和集成测试
1. mocha:  `describe`(一组描述) 和 `it`（单个描述） 挂在window下面的全局函数
2. chai: `expect`
3. karma: 调用浏览器，自动化测试
4. sinon: 提供fake间谍函数，模拟函数被callback
5. travis ci: 集成测试
6. sinon-chai: 同时引入`sinon`和`chai`  并且会在expect上添加`called`和`calledWith`
