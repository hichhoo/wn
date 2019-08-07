import React from 'react';
import styles from './index.less';
import { returnStatement, thisExpression } from '@babel/types';
import AppCommon from '../../utils/AppCommon';
import { Switch, Icon } from 'antd';
import { extname } from 'path';
import PinjiuApi from "../../https/apis/PinjiuApi";
import { futimes } from 'fs';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  render() {
    const { item = {} } = this.props;
    return (
      <div className={styles.Card} onClick={() => {
        if (item.payable) {
          AppCommon.routerPush('/pinjiu/dindanxiangqing/?id=' + item.pinjiuMenuId)
        } else {
          AppCommon.routerPush('/pinjiu/pindanxiangqing/?id=' + item.id)
        }

      }} >
        <div className={styles.WineImg}>
          <img className={styles.tlzicon} src={AppCommon.wrapperImgPath(item.image)} />
        </div>
        <div className={styles.txt}>
          <div className={styles.winename}>
            {item.userNickname}
            <span className={styles.hui}>（发起人）</span>
          </div>
          <div className={styles.intru}>{item.name}</div>
          <p className={styles.listtime}>发起时间：{item.createTime}</p>
          <p className={styles.listtime}>截止时间：{item.cutoffTime}</p>
          <p>
            数量：
            <span className={styles.perpo}>{item.currentOrderAmount}/{item.allAmount}</span>
            '&nbsp;&nbsp;价格：'
            <span className={styles.perpo}>{item.avgPrice}/{item.unit}</span>
          </p>
        </div>
        <TransStatus pinjiuStatus={item.pinjiuStatus} />
      </div>
    );
  }

}

/**
 * 判断交易状态并输出到卡片“交易完成”or“待付款”
 * 
 */

function TransStatus(props) {
  var pinjiuStatus = props.pinjiuStatus;
  console.log(props.pinjiuStatus);
  if (pinjiuStatus == "success") {
    return <span>交易完成</span>;
  } else if (pinjiuStatus == "waitPay") {
    return <span>待付款（支持线下支付）</span>;
  } else if (pinjiuStatus == "ready") {
    return <span>待拼单</span>;
  } else if (pinjiuStatus == "sending") {
    return <span>待收货</span>;
  } else if (pinjiuStatus == "waitSend") {
    return <span>待发货</span>;
  } else if (pinjiuStatus == null) {
    return <span>待处理</span>;
  } else {
    return <span>交易关闭</span>;
  }
}

