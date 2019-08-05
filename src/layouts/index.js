import React from "react";
import {connect} from 'dva';
import Flex from "@/components/Flex";
import styles from './index.less';
import Common from "@/utils/Common";
import UserInfoApi from "@/https/apis/UserInfoApi";
import AppCommon from "@/utils/AppCommon";
import {Dropdown, Menu} from "antd";

@connect(({user}) => ({
  user: user
}))
export default class BasicLayout extends React.Component {

  componentDidMount() {
    //TODO 测试使用
    sessionStorage.setItem('appToken', 'webs10035d26f57eCA6989AA5598AC6C701A9A437038134D');
    this.getUserInfo();
  }

  ///////////////////////// 逻辑方法

  /**
   * 获取用户信息
   */
  getUserInfo() {
    const {dispatch} = this.props;
    let appToken = sessionStorage.getItem('appToken');
    if (!Common.isEmpty(appToken)) {
      UserInfoApi.ownInfo().then(res => {
        if (res.isSuccess) {
          dispatch({type: 'user/setState', payload: {userObj: res.result}})
        } else {
          AppCommon.showRespError(res);
        }
      })
    }
  }


  /////////////////////////// 页面渲染

  render() {
    const {userInfo} = this.props.user.userObj;

    const menus = <Menu>
      <Menu.Item>账号设置</Menu.Item>
      <Menu.Item>退出登录</Menu.Item>
    </Menu>;

    return <Flex direction={"column"} className={styles.layout}>
      <Flex className={styles.header}>
        <Flex itemGrow={1} alignItems={"center"}>
          <img
            className={styles.logo} src={require('../assets/logo.png')} alt={''}
            onClick={() => AppCommon.routerPush('/')}
          />
        </Flex>

        {Common.isEmpty(userInfo.account) ?
          <Flex>
            <Flex alignItems={"center"} className={styles.label}>登录</Flex>
            <Flex alignItems={"center"} className={styles.label}>注册</Flex>
            <Flex alignItems={"center"} className={styles.label}>商家入驻</Flex>
          </Flex> :
          <Flex>
            <Flex
              alignItems={"center"} className={styles.label}
              onClick={() => AppCommon.routerPush('/publish')}
            >发布新帖</Flex>
            <Flex
              alignItems={"center"} className={styles.label}
              onClick={() => AppCommon.routerPush('/discovery')}
            >发现</Flex>
            <Flex
              alignItems={"center"} className={styles.label}
              onClick={() => AppCommon.routerPush('/wine')}
            >酒柜</Flex>
            <Flex
              alignItems={"center"} className={styles.label}
              onClick={() => AppCommon.routerPush('/pinjiu')}
            >拼单管理</Flex>
            <Flex alignItems={"center"} className={styles.avatar}>
              <Dropdown overlay={menus} placement={"bottomCenter"}>
                <img src={AppCommon.wrapperImgPath(userInfo.image)} alt={''}/>
              </Dropdown>
            </Flex>
          </Flex>
        }

      </Flex>

      <Flex className={styles.content} itemGrow={1} direction={"column"} >
        {this.props.children}
      </Flex>

      <Flex className={styles.footer} justify={"center"}>
        Copyright © 2016 winewishing.com All Rights Reserverd 浙ICP备 15021428号-1
      </Flex>
    </Flex>
  }

}
