import React from "react";
import styles from './index.less';
import AppCommon from '../../utils/AppCommon';

export default class Pduser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
        render(){
            return(
                <div className = {styles.card}>
                    <div className = {styles.listuser}>
                    <div background-image = {AppCommon.wrapperImgPath('http://image.winewishing.com/Fu5h1QXFXT8FP5X2g_5XKz4uEdp5?imageView/0/w/800')} className = {styles.pic}></div>
                        <p className = {styles.userli}>
                            <span>Jimmy . Lee</span>
                            <br></br>
                            <small>浙江省杭州市滨江区滨文路528号浙江机电职业技术学院1号</small>
                        </p>
                    </div>
                    <p className = {styles.tit1}>￥1</p>
                    <p className = {styles.tit2}>x2</p>
                    <p className = {styles.tit3}>￥2</p>
                    <p className = {styles.tit4}>待付款</p>
                    <div className = {styles.manage}></div>
                </div>              
            );
        }
    
}