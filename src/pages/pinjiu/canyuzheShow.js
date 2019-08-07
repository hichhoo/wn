import React from "react";
import Sider from '../../components/Sider/index';
import styles from './canyuzheShow.less';
import a from '../../assets/MenuLogo.png';
import Userdetails from '../../components//Userdetails/index';
import { Switch, Icon, Menu, Input, Table } from 'antd';
import PinjiuApi from "@/https/apis/PinjiuApi";
import { throwStatement } from "@babel/types";
import AppCommon from "@/utils/AppCommon";

export default class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: {
        list: [],
      },
    };
  }

  componentDidMount() {
    this.getDatalist();
  }

  ////////////////////////////////逻辑方法  
  /////////////////////////按参与者显示 -- 全部订单

  getDatalist() {
    PinjiuApi.canyuzhe('doing', 1, 2500, '').then(res => {
      if (res.isSuccess) {
        this.setState({ dataList: res.result });
      } else {
        AppCommon.showRespError(res);
      }
    })
  }
  //////////////////按“订单数量”显示
  ///////////////////按”总金额“显示
  ///////////////////按”已经收款“显示
  ////////////////////按照”待收款“显示

  renderList() {
    const { dataList } = this.state;
    return <div>
      {dataList.list.map(item => {
        return <Userdetails item={item} />;
      })}
    </div>
  }

  ///////////////页面渲染

  render() {
    const { Search } = Input;
    const { dataList } = this.state;
    return (
      <div className={styles.All}>
        <div className={styles.LeftMenu}>
          <div className={styles.SiderLogo}>
            <img src={a} alt="图标无法显示" className={styles.menulogo} />
          </div>
          <Sider></Sider>
        </div>
        <div className={styles.RightMenu}>
          <div className={styles.RightHead}>
            <div className={styles.Ver}>
              <Menu selectedKeys={[this.state.current]} mode="horizontal"
                style={{ width: 875, height: 50 }}>
                <Menu.Item key="1" style={{ width: 145 }}>
                  <center className={styles.menufont}>全部</center>
                </Menu.Item>
                <Menu.Item key="2" style={{ width: 145 }}>
                  <center className={styles.menufont}>订单数量</center><span className={styles.xiaodian}></span>
                </Menu.Item>
                <Menu.Item key="3" style={{ width: 145 }}>
                  <center className={styles.menufont}>总金额</center><span className={styles.xiaodian}></span>
                </Menu.Item>
                <Menu.Item key="4" style={{ width: 145 }}>
                  <center className={styles.menufont}>已收款</center><span className={styles.xiaodian}></span>
                </Menu.Item>
                <Menu.Item key="5" style={{ width: 145 }}>
                  <center className={styles.menufont}>待收款</center><span className={styles.xiaodian}></span>
                </Menu.Item>
              </Menu>
            </div>
            <div className={styles.HeadSearch}>
              <Search
                placeholder="搜索您的订单"
                onSearch={value => this.search(value)}
                style={{ width: 600 }}
              />
            </div>
          </div>
          <div className={styles.list}>
            {this.renderList()}
            <span className={styles.lastspan}>没有更多了</span>
          </div>
        </div>
      </div>
    );
  }

}

