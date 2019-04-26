/**
 * Swiper触摸事件
 */
const Touch = {

    /**
     * 开始触摸
     * @param {Number} index 索引
     * @param {Object} event 事件对象
     */
    touchStart(index, event) {
        let e = event || window.event;
        let { autoPlay } = this.props;
        let { total } = this.state;
        if (total <= 1) {
            return;
        }

        if (autoPlay && this.timer) {
            this.clearTimer();
        }
        this.setTransitionDuration(0);
        Touch.startX = e.changedTouches[0].clientX;
    },

    /**
     * 触摸移动
     * @param {Number} index 索引
     * @param {Object} event 事件对象
     */
    touchMove(index, event) {
        let { total } = this.state;
        if (total <= 1) {
            return;
        }

        let e = event || window.event;
        let distance = Touch.getMoveDistance(e);
        let left = Touch.getCurrentLeft.bind(this, index, distance)();
        this.$dom.style.left = left; // 实时改变滑动位置
    },

    /**
     * 触摸结束
     * @param {Number} index 索引
     * @param {Object} event 事件对象
     */
    touchEnd(index, event) {
        let { total } = this.state;
        let { speed, distance, autoPlay } = this.props;
        if (total <= 1) {
            return;
        }

        let e = event || window.event;
        let moveDistance = Touch.getMoveDistance(e);

        if (moveDistance === 0) {
            this.setTransitionDuration(speed);
            autoPlay && this.autoPlay();
            return;
        }
        // 滑动距离小于设定值
        if (Math.abs(moveDistance) < distance) {
            this.setTransitionDuration(speed);
            Touch.stay.bind(this, index, e)();
            autoPlay && this.autoPlay();
        } else {
            Touch.finally.bind(this, index, e)();
        }
    },

    /**
     * 取消触摸 触发条件自行谷歌
     * @param {Number} index 索引
     * @param {Object} event 事件对象
     */
    touchCancel(index, event) {
        let { total } = this.state;
        let { autoPlay } = this.props;
        let e = event || window.event;

        if (total <= 1) {
            return;
        }

        if (this.pageHideFlag) {
            Touch.stay.bind(this, index, e)();
            autoPlay && this.autoPlay();
        } else {
            Touch.finally.bind(this, index, e)();
        }
    },

    /**
     * 获取移动的距离
     * @param {Object} e
     */
    getMoveDistance(e) {
        let endX = e.changedTouches[0].clientX;
        let distance = endX - this.startX;
        return distance;
    },

    /**
     * 获取当前元素的left值
     * @param {Number} index 索引
     * @param {Number} distance 移动的距离
     */
    getCurrentLeft(index, distance) {
        let { total } = this.state;
        let left = this.containerWidth * index;

        // 第一个slider向右滑动，则把它当做最后一个slider来设置left
        if (index === 0 && distance > 0) {
            left = this.containerWidth * (total - 1);
            this.setState({
                activeIndex: total - 1
            })
        }
         // 最后一个slider向左滑动，则把它当做第一个slider来设置left
        if (index === total - 1 && distance < 0) {
            this.setState({
                activeIndex: 0
            })
            return `${distance}px`;
        }
        return `${(left - distance) * -1}px`;
    },

    /**
     * 保持不动
     * @param {Number} index 索引
     * @param {Object} e     事件对象
     */
    stay(index, e) {
        this.$dom.style.left = this.containerWidth * index * -1 + 'px';
    },

    /**
     * 触摸结束后执行此方法，主要是用来判断方向
     * @param {Number} index 索引
     * @param {Object} e     事件对象
     */
    finally(index, e) {
        let { speed, autoPlay } = this.props;
        let moveDistance = Touch.getMoveDistance(e);
        let step = moveDistance < 0 ? 1 : -1;
        this.setTransitionDuration(speed);
        this.move(step, true);
        autoPlay && this.autoPlay();
    }
}

module.exports = Touch;
