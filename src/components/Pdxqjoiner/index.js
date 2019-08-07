import React from 'react';
import styles from './index.less';
import { returnStatement, thisExpression } from '@babel/types';
import AppCommon from '../../utils/AppCommon';
import PinjiuApi from '../../https/apis/PinjiuApi';
import { futimes } from 'fs';


export default class Pdxqjoiner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }


    render() {
        const { item = {} } = this.props;
        return (
            <div className={styles.card}>
                <div className={styles.image}>
                    <img className={styles.img} src={AppCommon.wrapperImgPath(item.image)} />
                </div>
                <div className={styles.name}>{item.nickName}</div>
                <div className={styles.loca}>{item.province}{item.city}{item.area}{item.address}</div>

                <p className={styles.pp1}>￥</p>
                <p className={styles.pp2}>x{item.amount}</p>
                <p className={styles.pp3}>￥{item.allPrice}</p>
                <StatusShow deliveryStatus={item.deliveryStatus} />
            </div>
        );
    }
}

function StatusShow(props) {
    console.log(props);
    var deliveryStatus = props.deliveryStatus;
    if (deliveryStatus == "success") {
        return <p className={styles.pp4}>交易成功</p>;
    } else if (deliveryStatus == "waitPay") {
        return <p className={styles.pp4}>待付款</p>;
    }else if(deliveryStatus == "send"){
        return <p className={styles.pp4}>待发货</p>
    }
     else {
        return <p className={styles.pp4}>Unknown</p>
    }
}