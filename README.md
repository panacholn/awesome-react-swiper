## Swiper

> 基于 `React` 实现的移动端 `Swiper` 组件

### 演示
 ![image](https://github.com/Johnson-hd/awesome-react-swiper/raw/master/public/show.gif)

### 版本说明
安装时请选择自己需要的版本安装
- 1.x-stable：`react15` 的版本
- 2.x-stable：`react16` 的版本
- 3.x：还未开启，未来新特性，基于更新版的 `react`

### 本地开发
```bash
yarn
npm run start
```

### 使用
```bash
import Swiper from 'awesome-react-swiper';
import 'awesome-react-swiper/lib/index.css';

let params = {
    observer: true,
    slideChange: (index) => {
        console.log(index);
    }
}
<Swiper {...params}>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</Swiper>
```

### 兼容性
- Android4+
- Ios8+

### Api
|参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
|speed | Number | `0.3` | 动画完成时间，即 `transition-duration` |
|distance | Number | `50` | 触摸滑动距离小于 `distance`，则不翻到下一张 |
|autoPlay | Boolean | `true` | 自动播放 |
|pagination | Boolean | `true` | 分页 |
|observer | Boolean | `false` | 监视器 |

### Swiper Events
|事件 | 说明 | 参数 |
|---|---|---|
|initSwiper | `初始化Swiper`，数据动态变化时，可以调用该方法重新 `初始化Swiper` | - |


### 未完成的
- 一个页面有多个 `Swiper` 的情况
