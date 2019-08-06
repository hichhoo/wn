import React from "react";
import styles from './dindanxiangqing.less';
import d from '../../assets/danno.png';
import PinjiuApi from "../../https/apis/PinjiuApi";
import AppCommon from '../../utils/AppCommon';

export default class Orderdetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadPayinfo:[],
        }
    }


    componentDidMount(){
        let a = this.props.location.query;
        this.getData(a.id);
    }

///////////////////

    getData(id){
        PinjiuApi.dindanxiangqing(id).then(res => {
            if (res.isSuccess) {
                this.setState({ loadPayinfo:res.result });
            }else{
                AppCommon.showRespError(res);
            }
        })
    }



    render(){
        const {  loadPayinfo } = this.state;
        return(
            <div className = {styles.all}>
                <div className = {styles.top}>
                <a><span onClick={() => AppCommon.routerPush('/pinjiu')}>拼单管理</span></a>
                &nbsp;>&nbsp;
                <a><span onClick={() => AppCommon.routerPush('/pinjiu')}>我发起的</span></a>
                &nbsp;>&nbsp;订单详情fsfss
                </div>
                <div className = {styles.contain}>
                    <div className = {styles.user}>
                        <div className = {styles.userimg}>
                            <img className = {styles.img} src={AppCommon.wrapperImgPath( loadPayinfo.joinUserImage)}/>
                        </div>
                        <p>
                            <span className = {styles.span}>昵称：{loadPayinfo.joinNickname}(参与者) </span>
                        </p>
                        <p>
                            <span className = {styles.span}>收货人：{loadPayinfo.joinUserName}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className = {styles.span}>{loadPayinfo.mobile}</span>
                        </p>
                        <p>
                            <span className = {styles.span}>收货地址：{loadPayinfo.province}{loadPayinfo.city}{loadPayinfo.area}{loadPayinfo.address}</span>
                        </p>
                        <div className = {styles.clearfix}></div>
                    </div>
                    <div className = {styles.pdin}>
                        <img className = {styles.inpic} src={AppCommon.wrapperImgPath(loadPayinfo.wineImage)} />
                        <div className = {styles.intxt}>
                            <p className = {styles.tip}>{loadPayinfo.wineName}</p>
                            <p>
                                <span className = {styles.span}>发起人：{loadPayinfo.createUserName}</span>
                            </p>
                            <p>
                                <span className = {styles.span}>数&nbsp;&nbsp;&nbsp;&nbsp;量：{loadPayinfo.buyCount}</span>
                            </p>
                            <p className = {styles.span}>
                                交易方式
                                <span className = {styles.span}>
                                    非担保交易
                                    <img src = {d} className = {styles.icontype} title = "该订单为非担保交易，付款将直接打款给发起者。售后服务如退款、退货等请直接与发起者联系！整个过程与微醺 平台无关！"/>
                                </span>
                            </p>
                            <p>
                                <span className = {styles.span}>总&nbsp;&nbsp;&nbsp;&nbsp;价：{loadPayinfo.buyAllPrice} 元</span>   
                            </p>
                        </div>
                        <div className = {styles.clearfix}></div>
                    </div>
                    <div className = {styles.orderin}>
                        <ul className = {styles.ull}>
                            <li className = {styles.lii}>
                                <p>
                                    <span className = {styles.span}>创建时间：</span>
                                    <span className = {styles.span}>{loadPayinfo.orderTime}</span>
                                </p>
                                <p>
                                    <span className = {styles.span}>商务订单号：</span>
                                    <span className = {styles.span}>{loadPayinfo.orderNo}</span>
                                </p>
                                <p className = {styles.payoff}>
                                    <span className = {styles.span}>支付方式：</span>
                                    <span className = {styles.span}>微信</span>
                                </p>
                                <p className = {styles.payoff}>
                                    <span className = {styles.span}>支付时间：</span>
                                    <span className = {styles.span}>{loadPayinfo.payTime}</span>
                                </p>
                            </li>
                        </ul>
                        <div className = {styles.clearfix}></div>
                    </div>
                    {/* <div className = {styles.logist}>
                           <div className = {styles.log}>
                                <strong>物流详情</strong>
                                <p>
                                    <strong>物流公司：</strong>
                                    <span className = {styles.company}>顺丰</span>
                                </p>
                                <p>
                                    <strong>&nbsp;&nbsp;&nbsp;目的地：</strong>
                                    <span className = {styles.dest}>浙江衢州市常山县天天街道宝吉村21栋316室杨家炜收</span>
                                </p>
                                <ul className = {styles.logistlist}></ul>
                            </div>
                    </div>
                    <div className = {styles.refund}>
                        <h3 className = {styles.h3}>退款详情</h3>
                        <span className = {styles.refund-status}></span>
                        <ul className = {styles.res}>
                            <li>
                                <strong>拼单名称：</strong>
                                  <span className = {styles.refundname}>82年拉菲经典款</span>
                            </li>
                            <li>
                                <strong>退款原因：</strong>
                                  <span className = {styles.refundwhy}>外包装破损</span>
                            </li>
                            <li>
                                <strong>操作时间：</strong>
                                <span className = {styles.refundtime}>2019-07-12</span>
                            </li>
                            <li>
					            <strong>发起者处理结果：</strong>
					            <span class="refund-status-bystart">-</span>
				            </li>
                            <li>
                                <strong>发起者处理结果：</strong>
                                <span className = {styles.refundfailresson}>审核中</span>
                            </li>
                            <li>
                                <strong>发起者操作时间：</strong>
                                <span className = {styles.refundoptime}>2019-05-12</span>
                            </li>
                        </ul>
                    </div> */}
                    <DindanStatus status={loadPayinfo.status} deleteReason = {loadPayinfo.deleteReason} />
                 </div>
            </div>
        );
    }
}

function DindanStatus(props) {
    var status = props.status;
    var deleteReason = props.deleteReason;
    console.log(props.status);
    if (status == "del"){
        return <div className = {styles.orderstatus}>
                <div className = {styles.orderd}>
                <p>
                <span className={styles.span}>订单状态：</span>
                <span className = {styles.span2}>交易关闭（理由：{deleteReason}）</span>
                </p>
                <div className = {styles.orderbtns}>
                <button className = {styles.deleteorder}>删除订单</button>
                </div>
                <div className = {styles.clearfix}></div>
                </div>
                </div>
    }else{
        return  <div className = {styles.orderstatus}>
        <div className = {styles.orderd}>
        <p>
        <span className={styles.span}>22订单状态：</span>
        <span className = {styles.span2}>交易关闭（理由：{deleteReason}）</span>
        </p>
        <div className = {styles.orderbtns}>
        <button className = {styles.deleteorder}>删除订单</button>
        </div>
        <div className = {styles.clearfix}></div>
        </div>
        </div>
    }
}