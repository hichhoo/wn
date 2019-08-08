import React from "react";
import styles from './dindanxiangqing.less';
import d from '../../assets/danno.png';
import PinjiuApi from "../../https/apis/PinjiuApi";
import AppCommon from '../../utils/AppCommon';
import e from '../../assets/danbaojiaoyi.png';


export default class Orderdetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadPayinfo:[],
            // wuliu:{},
        }
    }


    componentDidMount(){
        let a = this.props.location.query;
        this.getData(a.id);
        console.log(this.props.location.query);
        this.getwuliu(a.id);
    }

///////////////////

    getData(id){
        PinjiuApi.dindanxiangqing(id).then(res => {
            if (res.isSuccess) {
                this.setState({loadPayinfo:res.result });
            }else{
                AppCommon.showRespError(res);
            }
        })
    }
    // getwuliu(id){
    //     PinjiuApi.wuliu(id).then(res=> {
    //         if(res.isSuccess){
    //             this.setState({wuliu:res.result});
    //         }else{
    //             AppCommon.showRespError(res);
    //         }
    //     })
    // }



    render(){
        const {loadPayinfo} = this.state;
        // const {wuliu} = this.state;
        return(
            <div className = {styles.all}>
                <div className = {styles.top}>
                <a><span onClick={() => AppCommon.routerPush('/pinjiu')}>拼单管理</span></a>
                &nbsp;>&nbsp;
                <a><span onClick={() => AppCommon.routerPush('/pinjiu')}>我发起的</span></a>
                &nbsp;>&nbsp;订单详情
                </div>
                <div className = {styles.contain}>
                    <div className = {styles.user}>
                        <div className = {styles.userimg}>
                            <img className = {styles.img} src={AppCommon.wrapperImgPath(loadPayinfo.joinUserImage)}/>
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
                                交易方式:&nbsp;
                                {loadPayinfo.orderType=="0"?<span className={styles.span}>&nbsp;担保交易&nbsp;&nbsp;<img src={e} className={styles.icontype}/></span>:<span className = {styles.span}>&nbsp;非担保交易&nbsp;&nbsp;<img src = {d} className = {styles.icontype}/></span>}
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
                                    <BuyMethod buyMethod={loadPayinfo.buyMethod}/>
                                </p>
                                <p className = {styles.payoff}>
                                    <span className = {styles.span}>支付时间：</span>
                                    {loadPayinfo.payTime==null?<span>--</span>:<span className = {styles.span}>{loadPayinfo.payTime}</span>
}
                                    <span className = {styles.span}>{loadPayinfo.payTime}</span>
                                </p>
                            </li>
                        </ul>
                        <div className = {styles.clearfix}></div>
                    </div>
                    {/* <div className={styles.logist}>
                           <div className={styles.log}>
                                <h4>物流详情</h4>
                                <p>
                                    <strong>物流公司：</strong>
                                    <span className={styles.span}>顺丰</span>
                                </p>
                                <p>
                                    <strong>&nbsp;&nbsp;&nbsp;目的地：</strong>
                                    <span className={styles.span}>浙江衢州市常山县天天街道宝吉村21栋316室杨家炜收</span>
                                </p>
                                <ul className = {styles.logistlist}></ul>
                            </div>
                    </div> */}

                    <DindanStatus status={loadPayinfo.status} deleteReason = {loadPayinfo.deleteReason} />
                    <Tuikuanxiangqign/>

                 </div>
            </div>
        );
    }
}

function DindanStatus(props) {
    var status = props.status;
    var deleteReason = props.deleteReason;
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
    }else if(status == "waitPay"){
        return <div className = {styles.orderstatus}>
                <div className = {styles.orderd}>
                <p>
                <span className={styles.span}>订单状态：</span>
                <span className = {styles.span2}>待付款</span>
                </p>
                <div className = {styles.orderbtns}>
                <button className = {styles.deleteorder}>余额付款</button>
                <button className = {styles.deleteorder2}>取消付款</button>
                </div>
                <div className = {styles.clearfix}></div>
                </div>
                </div>
    }else if(status == "waitSend"){
        return <div className = {styles.orderstatus}>
        <div className = {styles.orderd}>
        <p>
        <span className={styles.span}>订单状态：</span>
        <span className = {styles.span2}>待发货</span>
        </p>
        <div className = {styles.clearfix}></div>
        </div>
        </div>
    }else if(status == "ready"){
        return <div className = {styles.orderstatus}>
        <div className = {styles.orderd}>
        <p>
        <span className={styles.span}>订单状态：</span>
        <span className = {styles.span2}>待拼单</span>
        </p>
        <div className = {styles.clearfix}></div>
        </div>
        </div>
    }else{
        return <div className = {styles.orderstatus}>
        <div className = {styles.orderd}>
        <p>
        <span className={styles.span}>订单状态：</span>
        <span className = {styles.span2}>待收货</span>
        </p>
        <div className = {styles.clearfix}></div>
        </div>
        </div>
    }
}

function BuyMethod(props){
    var buyMethod = props.buyMethod;
    switch(buyMethod){
        case 'balance':
            return <span>余额支付</span>
        default:
            return <span>--</span> 
    }
}
function Tuikuanxiangqign(props){
    var refundState = props.refundState;
    if (refundState == "1"){
        return(
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
   </div>
    )
}else{
    return <span></span>
}
}