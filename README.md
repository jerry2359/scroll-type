## 这是一个用webpack构建的测试模块模板。可以使用es6编写，最终支持es5和es6的两种引入方式

``` bash
# install
npm i -D test-a-module
```

```js
import {TestModule, HandleData} from 'test-a-module'

const tm = new TestModule({ name: 'testExample' })
tm.say()

const hd = new HandleData()
hd.save({ name: '张三', age: 26 })
console.log(hd.get('name'))
```