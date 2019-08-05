import React, {Component} from 'react'

/*
* 倒计时组件
* */
export default class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    }
  }


  componentDidMount() {
    this.countFun(this.props.cutoffTime);
  }
  countFun =(time)=>
  {
    let end_time = new Date(time).getTime(),
      sys_second = (end_time - new Date().getTime());
    let adc = setInterval(() => {
      //防止倒计时出现负数
      if (sys_second > 1000) {
        sys_second -= 1000;
        let day = Math.floor((sys_second / 1000 / 3600) / 24);
        let hour = Math.floor((sys_second / 1000 / 3600) % 24);
        let minute = Math.floor((sys_second / 1000 / 60) % 60);
        let second = Math.floor(sys_second / 1000 % 60);
        this.setState({
          day:day,
          hour:hour < 10 ? "0" + hour : hour,
          minute:minute < 10 ? "0" + minute : minute,
          second:second < 10 ? "0" + second : second
        });
      } else {
        clearInterval(adc);
        //倒计时结束时触发父组件的方法
        //this.props.timeEnd();
      }
    }, 1000);
  }

  render() {
    return (
      <span>{this.state.day}天 {this.state.hour}:{this.state.minute}:{this.state.second}</span>
    );
  }
}
