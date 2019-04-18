## Swiper

> 基于 `React` 实现的移动端 `Swiper` 组件

### 演示
 ![image](https://github.com/Johnson-hd/awesome-react-swiper/raw/master/public/show.gif)

### 版本说明
本项目分为两个版本，源码相同，只是在发布时，我会更换 `react` 及 `react-dom` 相应的版本，再进行发布
- React15: [`awesome-react15-swiper`](`https://www.npmjs.com/package/awesome-react15-swiper`)
- React16: [`awesome-react16-swiper`](`https://www.npmjs.com/package/awesome-react16-swiper`)

### 本地开发
```bash
yarn
npm run start
```

### 使用
```bash
import Swiper from 'awesome-react15-swiper';
import 'awesome-react15-swiper/lib/index.css';

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

### 未完成的
- 一个页面有多个 `Swiper` 的情况
