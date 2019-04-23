import React, { Component } from 'react';
import Swiper from '../src/swiper';
// import Swiper from '../lib/index';
// import '../lib/index.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [
                {
                    className: 'one',
                    value: 1
                },
                {
                    className: 'two',
                    value: 2
                },
                {
                    className: 'three',
                    value: 3
                }
            ]
        }
    }

    componentDidMount() {
        let dataList = [...this.state.dataList];
        dataList.push({
            className: 'four',
            value: 4
        })
        setTimeout(_ => {
            this.setState({
                dataList: dataList
            })
        }, 1000);
    }

    get renderDataList() {
        return this.state.dataList.map((item, index) => {
            return <div className={item.className} key={index}>{item.value}</div>
        })
    }

    render () {
        let params = {
            observer: true,
            slideChange: index => {
                // console.log(index);
            }
        }
        return (
            <div className="App">
                <h1>Awesome-React-Swiper</h1>
                <Swiper {...params}>
                    {this.renderDataList}
                </Swiper>
                <h1>请在手机端查看</h1>
            </div>
        );
    }
}

export default App;
