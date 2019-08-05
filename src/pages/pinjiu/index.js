import React from "react";
import Sider from '../../components/Sider/index';
import styles from './index.less';
import a from '../../assets/MenuLogo.png'
import PinjiuApi from "../../https/apis/PinjiuApi";
import AppCommon from "../../utils/AppCommon";
import { returnStatement, thisExpression } from '@babel/types';
import b from '../../assets/tlz.png'
import { Switch, Icon, Menu, Input } from 'antd';
import { extname } from 'path';
import Details from '../../components/Details/index';
import { extend } from 'umi-request';

export default class index extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        statObj: [],
    };


  }
  componentDidMount() {
    this.getListInit2();
  }


  ////////////////////////////// 逻辑方法



  /**
   * 订单统计
   */
  getListInit2() {
    PinjiuApi.userList('all',20,1,"").then(res => {
      if (res.isSuccess) {
        this.setState({ statObj: res.result });
        console.log(this.state.statObj)
      } else {
        AppCommon.showRespError(res);
      }
    })
  }
  search(search){
    PinjiuApi.userList(1,20,search).then(res =>{
      if(res.isSuccess){
        this.setState({list:res.result});
      }else{
        AppCommon.showRespError(res);
      }
    })
  }
////////////////////////页面渲染
  renderCardList() {
    const {statObj} = this.state;
    return <div>
      {statObj.map(item => {
        return <Details item={item}/>;
      })}
    </div>
  }
  


  render() {
    const {Search} = Input;
    const {SubMenu} = Menu;
    return (
    <div className={styles.All}>
      <div className={styles.LeftMenu}>
        <div className={styles.SiderLogo}>
          <img src={a} alt="图标无法显示" className={styles.menulogo} />
        </div>
          <div className = {styles.sider}>
          <Sider></Sider>
          </div>
      </div>
      <div className={styles.RightMenu}>
          <div className={styles.RightHead}>
            <div className={styles.Ver}> 
              <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"
                style={{ width: 875,height:50 }}>
                <Menu.Item key="alla" style={{ width: 145}} onClick={()=>this.getListInit2()}>
                 <center className = {styles.menufont}>全部</center>
                </Menu.Item>
                <SubMenu title={<span className="submenu-title-wrapper"></span>}></SubMenu>         
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
          <div className = {styles.lastlist}>
              {this.renderCardList()}
              <span className = {styles.lastspan}>没有更多了</span>
          </div>
      </div>
    </div>
    );
  }

}

