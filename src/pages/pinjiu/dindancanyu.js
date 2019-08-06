import React from "react";
import Sider2 from '../../components/Sider2/index';
import styles from './dindancanyu.less';
import a from '../../assets/MenuLogo.png'
import { Switch, Icon, Menu, Input } from 'antd';
import Details from '../../components/Details/index';
import PinjiuApi from "@/https/apis/PinjiuApi";
import AppCommon from "@/utils/AppCommon";


export default class index extends React.Component {
 constructor(props){
   super(props);
   this.state = {
    openKeys: ['sub2'],
     dataList: [],
     dinDan: [],
   };
 }

 componentDidMount(){
   this.getData();
   this.getDindan();
 }

//////////////////////////全部订单
 getData(){
   PinjiuApi.joinList('all',15 , 1, '').then(res => {
     if (res.isSuccess) {
       this.setState({dataList: res.result});
      }else{
       AppCommon.showRespError(res);
     }
   })
 }
/////////////////////获取card数量
 getDindan(){
   PinjiuApi.joinCount().then(res =>{
     if(res.isSuccess) {
       this.setState({dinDan: res.result});
     }else{
      AppCommon.showRespError(res);
    }
   })
 }
///////////////////搜索
 search(search){
  PinjiuApi.userList2('all',15,1,search).then(res =>{
    if(res.isSuccess){
      this.setState({list:res.result});
      }else{
      AppCommon.showRespError(res);
      }
    })
  }

//////////////////////////待拼单
 getReady(){
  PinjiuApi.joinList('ready',15 , 1, '').then(res => {
    if (res.isSuccess) {
      this.setState({dataList: res.result});
     } else {
      AppCommon.showRespError(res);
    }
  })
} 

//////////////////////////待付款
 getWaitpay(){
  PinjiuApi.joinList('waitPay',15 , 1, '').then(res => {
    if (res.isSuccess) {
      this.setState({dataList: res.result});
     } else {
      AppCommon.showRespError(res);
    }
  })
}

//////////////////////////待发货
 getwaitSend(){
  PinjiuApi.joinList('waitSend',15 , 1, '').then(res => {
    if (res.isSuccess) {
      this.setState({dataList: res.result});
     } else {
      AppCommon.showRespError(res);
    }
  })
}

//////////////////////////待收货
 getSending(){
  PinjiuApi.joinList('sending',15 , 1, '').then(res => {
    if (res.isSuccess) {
      this.setState({dataList: res.result});
     } else {
      AppCommon.showRespError(res);
    }
  })
}

//////////////////////////待处理
 getRefund(){
  PinjiuApi.joinList('refund',15 , 1, '').then(res => {
    if (res.isSuccess) {
      this.setState({dataList: res.result});
     } else {
      AppCommon.showRespError(res);
    }
  })
}
//////////////////////用户信息details  渲染
  renderList() {
    const {dataList} = this.state;
    return <div>
      {dataList.map(item => {
      return <Details item={item}/>;
      })}
     </div>
}

  render() {
    const {dataList} = this.state;
    const {dinDan} = this.state;
    const {Search} = Input;
    return(
      <div className = {styles.All}>
       <div className = {styles.LeftMenu}>
        <div className = {styles.SiderLogo}>
          <img src = {a} alt = "图标无法显示" className = {styles.menulogo}/>
        </div>
         <Sider2></Sider2>
      </div>
        <div className = {styles.RightMenu}>
          <div>
            <div className = {styles.RightHead}>
              <div className = {styles.Ver}>
              <Menu selectedKeys={[this.state.current]} mode="horizontal"
              style={{width: 875,height: 50}}>
              <Menu.Item key="1" style={{width: 145}} onClick={()=>this.getData()}>
              <center className = {styles.menufont}>全部</center>
              </Menu.Item>
              <Menu.Item key="2" style={{width: 145}} onClick={()=>this.getReady()}>
              <center className = {styles.menufont}>待拼单</center><span className = {styles.xiaodian}>{dinDan.ready}</span>
              </Menu.Item>
              <Menu.Item key="3" style={{width: 145}} onClick={()=>this.getWaitpay()}>
              <center className = {styles.menufont}>待付款</center><span className = {styles.xiaodian}>{dinDan.waitPay}</span>
              </Menu.Item>
              <Menu.Item key="4" style={{width: 145}} onClick={()=>this.getwaitSend()}>
              <center className = {styles.menufont}>待发货</center><span className = {styles.xiaodian}>{dinDan.waitSend}</span>
              </Menu.Item>
              <Menu.Item key="5" style={{width: 145}} onClick={()=>this.getSending()}>
              <center className = {styles.menufont}>待收货</center><span className = {styles.xiaodian}>{dinDan.sending}</span>
              </Menu.Item>
              <Menu.Item key="6" style={{width: 145}} onClick={()=>this.getRefund()}>
              <center className = {styles.menufont}>待处理</center><span className = {styles.xiaodian}>{dinDan.refund}</span>
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
            <span className = {styles.lastspan}>没有更多了</span>
            </div>          
          </div>           
        </div>
      </div>
    );
  }

}
