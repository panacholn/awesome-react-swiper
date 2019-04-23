/**
 * swiper分页
 */
import React, { Component } from 'react';

class SwiperPagination extends Component {

    render() {
        let { pagination, children, activeIndex, total, click } = this.props;
        return (
            <div className="wdt-swiper-pagination">
                {pagination && children && children.map((item, index) => {
                    return (
                        <span
                            key={`wdt-swiper-pagination-${index}`}
                            className={
                                index === activeIndex || activeIndex + 1 === total && index === 0
                                ? 'wdt-swiper-pagination-bullet-active wdt-swiper-pagination-bullet' :
                                'wdt-swiper-pagination-bullet'}
                            onClick={click.bind(this, index)}
                        ></span>
                    )
                })}
            </div>
        )
    }
}

export default SwiperPagination;
