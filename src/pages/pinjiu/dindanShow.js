import React from "react";
import Sider from '../../components/Sider/index';
import styles from './dindanShow.less';
import a from '../../assets/MenuLogo.png'
import Details from '../../components/Details/index'
import Flex from "@/components/Flex";
import PinjiuApi from "@/https/apis/PinjiuApi";
import AppCommon from "@/utils/AppCommon";
import { Menu, Icon,Input } from  'antd';

export default class index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataList: [],
      dindan: [],
      };
    }
 

  componentDidMount() {
    this.getDataList();
    this.getDataListInit2();
  }



///////////////////////////////////// 逻辑方法
//////获取不同订单状态数量
getDataListInit2() {
  PinjiuApi.userListInit2().then(res => {
    if (res.isSuccess) {
      this.setState({dindan: res.result});
      } else {
        AppCommon.showRespError(res);
      }
  })
}
  
///////////////////获取全部订单信息
getDataList() {
  PinjiuApi.userList2('all', 15, 1, '').then(res => {
      if (res.isSuccess) {
        this.setState({dataList: res.result});
      } else {
        AppCommon.showRespError(res);
      }
    })
  }

///////////获取待付款订单信息
getWaitpay() {
  PinjiuApi.userList2('waitPay',15,1,'').then(res => {
    if(res.isSuccess){
      this.setState({dataList:res.result});
    }else{
      AppCommon.showRespError(res);
    }
  })
}
///////////获取待付款订单信息
getReady() {
  PinjiuApi.userList2('ready',15,1,'').then(res => {
   if(res.isSuccess){
     this.setState({dataList:res.result});
   }else{
     AppCommon.showRespError(res);
   }
 })
}
///////////获取待发货订单信息
getwaitSend() {
  PinjiuApi.userList2('waitSend',15,1,'').then(res => {
   if(res.isSuccess){
     this.setState({dataList:res.result});
   }else{
     AppCommon.showRespError(res);
   }
 })
}
 
///////////获取待收货订单信息
getSending() {
  PinjiuApi.userList2('sending',15,1,'').then(res => {
   if(res.isSuccess){
     this.setState({dataList:res.result});
   }else{
     AppCommon.showRespError(res);
   }
 })
}
 
////////////获取待处理订单信息
getRefund() {
  PinjiuApi.userList2('refund',15,1,'').then(res => {
   if(res.isSuccess){
     this.setState({dataList:res.result});
   }else{
     AppCommon.showRespError(res);
   }
 })
}

search(search){
  PinjiuApi.userList2('all',15,1,search).then(res =>{
    if(res.isSuccess){
      this.setState({list:res.result});
      }else{
      AppCommon.showRespError(res);
      }
    })
  }


  /////////////////////////////// 页面渲染


  renderList() {
    const {dataList} = this.state;
    return <div>
      {dataList.map(item => {
        return <Details item={item}/>;
      })}
    </div>
  }

  render() {
  const {Search} = Input;
  const {SubMenu} = Menu;
  const {dataList} = this.state;
  const {dindan} = this.state;
    return (
      <div className={styles.All}>
       <div className={styles.LeftMenu}>
        <div className={styles.SiderLogo}>
          <img src={a} alt="图标无法显示" className={styles.menulogo}/>
        </div>
          <Sider></Sider>
      </div>
      <div className={styles.RightMenu}>
        <div>
          <div className={styles.RightHead}>
            <div className={styles.Ver}>
            <Menu selectedKeys={[this.state.current]} mode="horizontal"
            style={{width: 875,height: 50}}>
           <Menu.Item key="1" style={{width: 145}} onClick={()=>this.getDataList()}>
            <center className = {styles.menufont}>全部</center>
           </Menu.Item>
           <Menu.Item key="2" style={{width: 145}} onClick={()=>this.getWaitpay()}>
           <center className = {styles.menufont}>待付款</center><span className = {styles.xiaodian}>{dindan.waitPay}</span>
           </Menu.Item>
           <Menu.Item key="3" style={{width: 145}} onClick={()=>this.getReady()}>
           <center className = {styles.menufont}>待拼单</center><span className = {styles.xiaodian}>{dindan.ready}</span>
           </Menu.Item>
           <Menu.Item key="4" style={{width: 145}} onClick={()=>this.getwaitSend()}>
           <center className = {styles.menufont}>待发货</center><span className = {styles.xiaodian}>{dindan.waitSend}</span>
           </Menu.Item>
           <Menu.Item key="5" style={{width: 145}} onClick={()=>this.getSending()}>
           <center className = {styles.menufont}>待收货</center><span className = {styles.xiaodian}>{dindan.sending}</span>
           </Menu.Item>
           <Menu.Item key="6" style={{width: 145}} onClick={()=>this.getRefund()}>
           <center className = {styles.menufont}>待处理</center><span className = {styles.xiaodian}>{dindan.refund}</span>
           </Menu.Item>
           </Menu>
            </div>
            <div className={styles.HeadSearch}>
            <Search
              placeholder="搜索您的订单"
              onSearch={value => this.search(value)}
              style={{ width: 600}}
            />
          </div>
          </div>
          <div className = {styles.list}>
          {this.renderList()}
          <span className={styles.lastspan}>没有更多了</span>
          </div>
          </div>
        </div>
        </div>
    );
  }


}

