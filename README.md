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
    npx parcel index.html
    ```

