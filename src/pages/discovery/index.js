import React from "react";
import Flex from "@/components/Flex";
import styles from "@/pages/discovery/index.less"
import e from "@/assets/faqi.png"
import a from '@/assets/dan.png';
import b from '@/assets/biaoqian.png';
import {Input} from "antd";
import CountDown from "@/components/CountDown.js";
import AppCommon from "@/utils/AppCommon";
import PinjiuApi from "@/https/apis/PinjiuApi";
import Pindanxiangqing  from"@/pages/discovery/pindanxiangqing"


export default class index extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.getList();

  }

  /////////////////////////
  getList() {
    PinjiuApi.index(1,20,"").then(res => {
      if(res.isSuccess) {
        this.setState({list:res.result});
        console.log(this.state.list)
      } else {
        AppCommon.showRespError(res);
      }
    })
  }

  search(search) {
    PinjiuApi.index(1,20,search).then(res => {
      if(res.isSuccess) {
        this.setState({list:res.result});
      } else {
        AppCommon.showRespError(res);
      }
    })
  }



  ///////////////////////// 页面渲染

  render() {
    const {list} = this.state;
    const {Search} = Input;

    return (
        <Flex className={styles.contain} direction={"column"} itemGrow={1}>
          <Flex className={styles.search} alignItems={"center"} justify={"center"}>
            <Search
              placeholder="输入你要找的酒～"
              onSearch={value => this.search(value)}
              style={{width: 800, height: 50}}
              enterButton={true}
            />
          </Flex>
          <Flex className={styles.list_of_spells}
                direction={"row"} itemGrow={1} wrap={"wrap"} >
            <Flex
              onClick={() => AppCommon.routerPush('/discovery/faqipindan')}
              className={styles.initiate_a_single}>
              <img className={styles.jiutu} src={e}/>
            </Flex>
            {list.map(item => {
              return (
                <Flex
                  onClick={() =>{
                    AppCommon.routerPush('/discovery/pindanxiangqing/?id='+item.id )
                  }}
                  className={styles.list} direction={"column"}>
                  <Flex className={styles.top} direction={"column"}>
                    <img className={styles.jiutu} src={AppCommon.wrapperImgPath(item.image)}/>
                    <Toplogo type={item.type}/>
                    <img src={a} className={styles.danbao} title="该订单为担保交易，货款将由微醺平台担保，&#10;当您确认收货之后，货款再转给发起者"/>
                  </Flex>

                  <Flex className={styles.bottom} direction={"column"}>

                    <p className={styles.name}>{item.userNickname}
                      <img src={b} width="50px"/>
                    </p>

                    <p className={styles.title}>{item.name}</p>

                    <Flex direction={"row"} justify={"space-around"} alignItems={"center"}>
                      <span className={styles.shuliang}>数量:</span>
                      <Progressbar currentamount={item.currentOrderAmount} allAmount={item.allAmount}/>
                      <span className={styles.percent}>{item.currentOrderAmount}/{item.allAmount}</span>
                      <span className={styles.perprice}>
                  <span className={styles.number}>{item.avgPrice}</span>
                  /瓶
                </span>

                    </Flex>

                    <Flex className={styles.pd_status} alignItems={"center"} justify={"space-between"}>

                      {
                        ((new Date(item.cutoffTime).getTime()-new Date().getTime())>0)?<span className={styles.pdsta}>未截单</span>:  <span className={styles.pdsta}>已截单</span>

                      }

                      <span className={styles.pd_endt}>截止时间：
                       <CountDown cutoffTime={item.cutoffTime}/>
                    </span>
                    </Flex>

                  </Flex>

                </Flex>);
              i++;
            })}

          </Flex>

        </Flex>
    );






  }
}
/*
* 进度条渲染
* */
function Progressbar(props) {
  return (
    <svg className={styles.svg}>
      <rect magin="auto" width="70" height="7" stroke="#9E1D51" strokeWidth="2px" fill="white"
            rx="5" ry="5"></rect>
      <rect magin="auto" width={props.currentamount / props.allAmount * 70} height="7" fill=" #9e1d51"
            rx="5" ry="5"></rect>
    </svg>
  );

}

/*
*
* */
function Toplogo(props) {
  var type = props.type;
  console.log(props.type);
  if (type == "white") {
    return <span className={styles.topwhite}>white</span>
  } else if (type == "red") {
    return <span className={styles.topred}>red</span>;
  } else {
    return <span className={styles.topother}>other</span>
  }
}
