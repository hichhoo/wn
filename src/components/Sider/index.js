import React from 'react';
import styles from './index.less';
import {Menu, Icon} from 'antd';
import AppCommon from "@/utils/AppCommon";

const {SubMenu} = Menu;

export default class Sider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2'];

  state = {
    openKeys: ['sub1'],
  };


  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{width: 199}}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="solution"/>
              <span className={styles.Span}>我发起的</span>
            </span>
          }
        >
          <Menu.Item key="1" className={styles.item} onClick={() => AppCommon.routerPush('/pinjiu/')}>按拼单显示</Menu.Item>
          <Menu.Item key="2" className={styles.item} onClick={() => AppCommon.routerPush('/pinjiu/dindanShow')}>按订单显示</Menu.Item>
          <Menu.Item key="3" className={styles.item} onClick={() => AppCommon.routerPush('/pinjiu/canyuzheShow')}>按参与者显示</Menu.Item>

        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="solution"/>
              <span className={styles.Span}>我参与的</span>
            </span>
          }
        >
          <Menu.Item key="4" className={styles.item} onClick={() => AppCommon.routerPush('/pinjiu/dindancanyu')}>按订单显示</Menu.Item>
          <Menu.Item key="5" className={styles.item} onClick={() => AppCommon.routerPush('/pinjiu/faqizheShow')}>按发起者显示</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }

}

