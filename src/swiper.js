/**
 * Swiper组件
 * 关系：activeIndex变化 => left变化 => translation动画
 * 手动滑动：实时修改left位置 => 判断方向（左滑还是右滑）=> 调用move方法改变activeIndex => 改变left
 * 自动播放：设置定时器 => 调用move方法改变activeIndex => 改变left
 */
import React, { Component } from 'react';
import { touchStart, touchMove, touchEnd, touchCancel } from './touch';
import SwiperPagination from './swiper-pagination';
import './swiper.css';

class Swiper extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
            total: 0,
            children: []
        }
    }

    componentDidMount() {
        this.compatibility();
        this.listenVisibilityChange();
        this.listenResize();
        this.initSwiper();
        this.checkAutoPlay();
        this.preventContextMenu();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let { observer } = nextProps;
        if (observer) {
            let children = nextProps.children;
            let total = children.length || 0;
            return {
                children: nextProps.children.concat(nextProps.children[0]),
                total: total + 1
            }
        }
        return null
    }

    /**
     * 初始化Swiper
     */
    initSwiper(_children) {
        let children = _children || this.props.children;
        if (!children) return;
        let total = children.length || 0;
        this.setState({
            children: children.concat(children[0]),
            total: total + 1
        })
        this.$dom = document.querySelector('.wdt-swiper-wrapper');
        this.containerWidth = document.querySelector('.wdt-swiper').offsetWidth;
    }

    /**
     * 检查是否自动播放
     */
    checkAutoPlay() {
        let { autoPlay } = this.props;
        if (autoPlay) {
            this.autoPlay();
        }
    }

    /**
     * 禁用显示contextmenu
     */
    preventContextMenu() {
        let container = document.querySelector('.wdt-swiper');
        container.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    }

    /**
     * visibilitychange浏览器兼容性
     */
    compatibility() {
        if (typeof document.hidden !== 'undefined') {
            this.hidden = 'hidden';
            this.visibilityChange = 'visibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
            this.hidden = 'msHidden';
            this.visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
            this.hidden = 'webkitHidden';
            this.visibilityChange = 'webkitvisibilitychange';
        }
    }


    /**
     * 注册监听事件当用户最小化窗口或切换到另一个选项卡时触发
     */
    listenVisibilityChange() {
        let { hidden, visibilityChange } = this;

        document.addEventListener(visibilityChange, () => {
            if (document[hidden]) {
                this.onPageHide();
            } else {
                this.onPageShow();
            }
        }, false);
    }

    /**
     * 监听页面大小变化
     */
    listenResize() {
        window.addEventListener('resize', _ => {
            let { speed } = this.props;
            this.setTransitionDuration(0);
            setTimeout(() => {
                this.initSwiper();
                this.setTransitionDuration(speed);
            }, 30)
        },false);
    }

    /**
     * 离开时，清除定时器，避免快速轮播多次
     */
    onPageHide() {
        let { autoPlay, total } = this.props;

        this.pageHideFlag = true;
        if (autoPlay && this.timer && total > 1) {
            this.clearTimer();
        }
    }

    /**
     * 进入时，设置轮播动画，如果是自动轮播，设置定时器
     */
    onPageShow() {
        let { autoPlay, speed, total } = this.props;

        this.pageHideFlag = false;
        if (total > 1) {
            this.setTransitionDuration(speed);
            autoPlay && this.autoPlay();
        }
    }

    /**
     * 自动播放
     */
    autoPlay() {
        let { delay } = this.props;
        this.timer = setInterval(() => {
            this.move(1);
        }, delay);
    }

    /**
     * 移动处理
     * @param {*} step       移动的数量，负数代表反方向
     */
    move(step) {
        let { activeIndex, total } = this.state;
        let { slideChange = function() {}, speed, autoPlay } = this.props;
        activeIndex += step;
        /*
         * 最后一张回到索引为1的位置（因为末尾追加了第一个slide）
         * 如果从末尾直接跳到开始，动画方向是反的
         */
        if (activeIndex === total) {
            this.setTransitionDuration(0);

            /*
             * 自动播放：
             *   会设置slide的left为0px，再动画到第2个slide，保证了动画的方向一致
             * 手动播放：
             *   一定不可以设置为0px，因为会滑动出一部分距离，设置0px会回归0px的位置
             * 手动播放动画方向一致的原因：
             *   在`touchMove`监听事件中，会执行`getCurrentLeft`方法，如果发现是最后一个slide，会把它作为第一个slide，所以动画方向一定是一致的
             */
            autoPlay && (this.$dom.style.left = '0px');

            setTimeout(() => {
                this.setTransitionDuration(speed);
                this.setState({ activeIndex: 1 });
                slideChange(1);
            }, 30)
            return;
        }

        this.setState({ activeIndex });
        // 最后一张因为是追加的，所以需要索引置为0
        if (activeIndex + 1 === total) {
            slideChange(0);
        } else {
            slideChange(activeIndex);
        }
    }

    /**
     * 设置过度效果的时间
     * @param {Number} duration 延迟时长
     */
    setTransitionDuration(duration) {
        this.$dom.style.transitionDuration = duration + 'ms';
    }

    /**
     * 点击切换页码
     * @param {*} index 索引
     */
    handleClickPagination(index) {
        let { autoPlay } = this.props;
        let { activeIndex, total} = this.state;
        if (this.timer && autoPlay) {
            clearInterval(this.timer);
            this.timer = null;
        }
        // 展示的为第一张，点击最后一张
        if ((activeIndex === 0 || activeIndex === total) && index === total - 1) {
            this.move(-1);
            autoPlay && this.autoPlay();
            return;
        }
        // 展示的最后一张，点击第一张
        if (activeIndex === total - 1 && index === 0) {
            this.move(1);
            autoPlay && this.autoPlay();
            return;
        }
        // 其他点击情况
        if (index < total) {
            this.move(index - activeIndex);
        } else {
            this.move(index);
        }
        autoPlay && this.autoPlay();
    }

    /**
     * 清除定时器
     */
    clearTimer() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        let { total, activeIndex, children } = this.state;
        let { pagination, speed } = this.props;
        let style = {
            width: `${total * this.containerWidth}px`,
            left: `${activeIndex * this.containerWidth * -1}px`,
            transition: `left ${speed}ms ease-in-out`
        }
        let parmas = {
            pagination: pagination,
            children: this.props.children,
            total: total,
            activeIndex: activeIndex,
            click: this.handleClickPagination
        }

        return (
            <div className="wdt-swiper">
                <div
                    className="wdt-swiper-wrapper"
                    style={style}
                >
                    {children.map((item, index) => {
                        return <div
                            key={`wdt-swiper-slide-${index}`}
                            className="wdt-swiper-slide"
                            style={{width: this.containerWidth}}
                            onTouchStart={touchStart.bind(this, index)}
                            onTouchMove={touchMove.bind(this, index)}
                            onTouchEnd={touchEnd.bind(this, index)}
                            onTouchCancel={touchCancel.bind(this, index)}
                        >{item}</div>
                    })}
                </div>
                <SwiperPagination {...parmas}></SwiperPagination>
            </div>
        )
    }
}

Swiper.defaultProps = {
    speed: 300,
    delay: 2000,
    distance: 50, // 触摸滑动距离小于distance，则不翻到下一张
    autoPlay: true,
    pagination: true,
    observer: false
}

export default Swiper;
