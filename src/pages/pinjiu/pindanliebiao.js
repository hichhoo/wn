import React from "react";
import styles from './pindanliebiao.less';
import PinjiuApi from "../../https/apis/PinjiuApi";
import AppCommon from '../../utils/AppCommon';
import f from '../../assets/fruit.png';
import { Button, Menu } from 'antd';

export default class Pindanliebiao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listApp: [],
            pageInfo: [],
            pinjiuMenu: []
        }
    }


    componentDidMount() {
        // let createUserId = this.props.location.query;
        // console.log(this.props.location.query);
        // this.getData(createUserId);
    }

    ///////////////////

    // getData(createUserId) {
    //     PinjiuApi.faqizhe(createUserId,1003, 'doing', 'all', 1, 20).then(res => {
    //         if (res.isSuccess) {
    //             this.setState({ 
    //                 listApp:res.result.listApp,
    //                 pageInfo:res.result.pageInfo,
    //                 pinjiuMenu:res.result.pinjiuMenuAllDto,
    //              });
    //         } else {
    //             AppCommon.showRespError(res);
    //         }
    //     })
    // }



    render() {
        const { data } = this.state;
        return (
            <div className={styles.all}>
                <div className={styles.top}>
                    <a><span onClick={() => AppCommon.routerPush('/pinjiu')}>拼单管理&nbsp;>&nbsp;</span></a>
                    <a><span onClick={() => AppCommon.routerPush('/pinjiu/dindancanyu')}>我参与的&nbsp;>&nbsp;</span></a>
                    <a><span onClick={() => AppCommon.routerPush('/pinjiu/faqizheShow')}>订单按发起人排列</span></a>
                    &nbsp;>&nbsp;订单详情
                </div>
                <div className={styles.contain}>
                    <flex className={styles.body - 1}>
                        <img src={f} alt="图片无法显示" className={styles.img} />
                        <div className={styles.namef}>
                            <p className={styles.name}>我的名字是james bena vool</p>
                            <p className={styles.p1}>发起了下列拼单</p>
                        </div>
                        <div className={styles.clear}></div>
                    </flex>
                    <div className={styles.hengxian}></div>
                    <div className={styles.status}>
                        <span className={styles.span0}>统计</span>
                        <span className={styles.span2}>状态：</span>
                        <span className={styles.span1}>未完成交易</span>
                        <span className={styles.span2}>总量：</span>
                        <span className={styles.span1}>11</span>
                        <span className={styles.span2}>总价：</span>
                        <span className={styles.span1}>￥14545f</span>
                        <span className={styles.span2}>待付款：</span>
                        <span className={styles.span1}>￥111</span>
                        <Button className={styles.but1}>合并发货</Button>
                        <Button className={styles.but1}>查看历史记录</Button>
                    </div>
                    <div className={styles.hengxian}></div>
                    <div className={styles.menu}>
                        <Menu selectedKeys={[this.state.current]} mode="horizontal"
                            style={{ width: 1100, height: 50 }}>
                            <Menu.Item key="1" style={{ width: 145 }}>
                                <center className={styles.menufont}>全部</center>
                            </Menu.Item>
                            <Menu.Item key="2" style={{ width: 145 }}>
                                <center className={styles.menufont}>待付款</center><span className={styles.xiaodian}></span>
                            </Menu.Item>
                            <Menu.Item key="3" style={{ width: 145 }}>
                                <center className={styles.menufont}>待拼单</center><span className={styles.xiaodian}></span>
                            </Menu.Item>
                            <Menu.Item key="4" style={{ width: 145 }}>
                                <center className={styles.menufont}>待发货</center><span className={styles.xiaodian}></span>
                            </Menu.Item>
                            <Menu.Item key="5" style={{ width: 145 }}>
                                <center className={styles.menufont}>待收货</center><span className={styles.xiaodian}></span>
                            </Menu.Item>
                            <Menu.Item key="6" style={{ width: 145 }}>
                                <center className={styles.menufont}>待处理</center><span className={styles.xiaodian}></span>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <div className={styles.Card}>
                            <div className={styles.WineImg}>
                                <img className={styles.tlzicon} src={AppCommon.wrapperImgPath()} />
                            </div>
                            <div className={styles.txt}>
                                <div className={styles.winename}>
                                    
                                    <span className={styles.hui}>（发起人）</span>
                                </div>
                                <div className={styles.intru}>item.name</div>
                                <p className={styles.listtime}>发起时间：item.createTime</p>
                                <p className={styles.listtime}>截止时间：item.cutoffTime</p>
                                <p>
                                    数量：
                                <span className={styles.perpo}>{item.currentOrderAmount}/{item.allAmount}</span>
                                    '&nbsp;&nbsp;价格：'
                                <span className={styles.perpo}>{item.avgPrice}/{item.unit}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
