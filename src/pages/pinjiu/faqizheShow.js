import React from "react";
import Sider2 from '../../components/Sider2/index';
import styles from './faqizheShow.less';
import a from '../../assets/MenuLogo.png';
import { Switch, Icon, Menu, Input } from 'antd';
import Userdetails from '../../components/Userdetails/index';
import AppCommon from "@/utils/AppCommon";
import PinjiuApi from "@/https/apis/PinjiuApi";


export default class index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openKeys: ['sub2'],
      dataList:{
        list:[],
      },
    };
  }
 
  componentDidMount(){
    this.getDatalist();
  }


  getDatalist() {
    PinjiuApi.joinUserlist('doing', 1, 2500,'').then(res => {
      if(res.isSuccess) {
        this.setState({dataList: res.result});
      }else{
        AppCommon.showRespError(res);
      }
    })
  }

//////////////////按“订单数量”显示
///////////////////按”总金额“显示
///////////////////按”已收款“显示
////////////////////按照”待收款“显示

renderList() {
  const {dataList} = this.state;
  return <div>
    {dataList.list.map(item => {
      return <Userdetails item={item}/>;
    })}
  </div>
}
///////////////////页面渲染


  render() {
    const {Search} = Input;
    const {dataList} = this.state;
    return(
    <div className = {styles.All}>
      <div className = {styles.LeftMenu}>
        <div className = {styles.SiderLogo}>
          <img src = {a} alt = "图标无法显示" className = {styles.menulogo}/>
        </div>
        <Sider2></Sider2>
      </div>
      <div className = {styles.RightMenu}>
        <div className = {styles.RightHead}>
          <div className = {styles.Ver}>
          <Menu selectedKeys={[this.state.current]} mode="horizontal"
            style={{width: 875,height: 50}}>
           <Menu.Item key="1" style={{width: 145}}>
            <center className = {styles.menufont}>全部</center>
           </Menu.Item>
           <Menu.Item key="2" style={{width: 145}}>
           <center className = {styles.menufont}>待付款</center><span className = {styles.xiaodian}></span>
           </Menu.Item>
           <Menu.Item key="3" style={{width: 145}}>
           <center className = {styles.menufont}>待拼单</center><span className = {styles.xiaodian}></span>
           </Menu.Item>
           <Menu.Item key="4" style={{width: 145}}>
           <center className = {styles.menufont}>待发货</center><span className = {styles.xiaodian}></span>
           </Menu.Item>
           <Menu.Item key="5" style={{width: 145}}>
           <center className = {styles.menufont}>待收货</center><span className = {styles.xiaodian}></span>
           </Menu.Item>
           <Menu.Item key="6" style={{width: 145}}>
           <center className = {styles.menufont}>待处理</center><span className = {styles.xiaodian}></span>
           </Menu.Item>
           </Menu>
          </div>
            <div className = {styles.HeadSearch}>
              <Search
                placeholder="搜索您的订单"
                onSearch={value => this.search(value)}
                style={{ width: 600}}/>
            </div>
        </div>
        <div className = {styles.list}>
          {this.renderList()}
          <span className={styles.lastspan}>没有更多了</span>
        </div>                      
      </div>
    </div>
    );
  }

}

