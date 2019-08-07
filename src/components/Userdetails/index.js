import React from 'react';
import styles from './index.less';
import { returnStatement, thisExpression } from '@babel/types';
import AppCommon from '../../utils/AppCommon';
import PinjiuApi from '../../https/apis/PinjiuApi';
import { futimes } from 'fs';


export default class Userdetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Obj: [],
        };
    }

    
    render(){
        const {item = {}} = this.props;
        return(
            <div className = {styles.card} onClick={()=>{
                AppCommon.routerPush('/pinjiu/pindanliebiao/?id='+item.id)
            }}>
                <div className = {styles.img}>
                    <img className = {styles.userimg} src={AppCommon.wrapperImgPath(item.image)}/>
                </div>
                    <div className = {styles.name}>{item.nickname}</div>
                   <p className = {styles.pp1}>未完结单数：111{item.joinCount}</p>
                   <p className = {styles.pp}>总金额（元）：111{item.totalMonty}</p>
                   <p className = {styles.pp}>已付款（元）：111{item.payMoney}</p>
                   <p className = {styles.pp}>待付款（元）：1{item.waitPay}</p>
            </div>              
            );
        }
    
}