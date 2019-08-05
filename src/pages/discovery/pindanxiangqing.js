import React from "react";
import Flex from "@/components/Flex";
import styles from "@/pages/discovery/pindanxiangqing.less";
import AppCommon from "@/utils/AppCommon";
import {Button, Carousel,Tabs,Input} from 'antd';
import a from "@/assets/backtop.png"
import PinjiuApi from "@/https/apis/PinjiuApi";
import Common from "@/utils/Common"
/*
* 拼单详情页面
* */
export default class Pindanxiangqing extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      list: [],
      picture:[],
      questionList:[],
      question:""

    }
  }

  componentDidMount() {
    let a=this.props.location.query;
    this.getQuestionData(a.id)
    this.getData(a.id);
  }
  /*
  * 获取渲染页面的数据
  * */
  getData(id) {
    PinjiuApi.pindanxiangqing(id).then(res => {
      if(res.isSuccess) {
        this.setState({
          list:res.result.pinjiu,
          picture:res.result.pinjiu.otherImagesArray,
        });

      } else {
        AppCommon.showRespError(res);
      }
    })
  }

  /*
  * 获取问题列表
  * */
  getQuestionData(id) {
    PinjiuApi.getQuestionList(id).then(res => {
      if(res.isSuccess) {
        this.setState({
          questionList:res.result,
        });
      } else {
        AppCommon.showRespError(res);
      }
    })
  }

  /*
  * 增加问题
  * */
  addQuestion(question) {
    let a=this.props.location.query;
    PinjiuApi.addMessage(a.id,question).then(res => {
      if(res.isSuccess) {
        this.getQuestionData(a.id)
      } else {
        AppCommon.showRespError(res);
      }
    })
  }

  render() {
    const {TextArea} = Input;
    const { TabPane } = Tabs;
 const {list}=this.state;
 const {picture}=this.state;
 const {questionList}=this.state;
 const {question}=this.state;


    return (
      <Flex className={styles.contain} direction={"column"}>
        <Flex className={styles.topside} direction={"row"}>
          <a><span onClick={() => AppCommon.routerPush('/discovery')}>拼单</span></a>
          <span> >拼单详情 </span>
        </Flex>


        <Flex className={styles.show} direction={"row"}>
          <Flex className={styles.imgshow}>
            <Carousel
              className={styles.antCarousel}
              autoplay>
              <div>
                <img className={styles.tupian}
                     src={AppCommon.wrapperImgPath(list.image)}/>
              </div>
              {
                  picture.map(a =>{
                    return(
                      <div>
                        <img className={styles.tupian}
                             src={AppCommon.wrapperImgPath(a)}/>
                      </div>
                    );
                  })
              }

            </Carousel>
          </Flex>

          <Flex className={styles.wineshow} direction={"column"}>

            <Flex direction={"row"} justify={"space-between"}>
              <span className={styles.name}>{list.name}</span>
              <Flex style={{borderLeft: "1px solid black", padding: "auto"}} alignItems={"center"}>
                <span className={styles.kind}>红酒</span>
              </Flex>
            </Flex>

            <Flex className={styles.price} direction={"row"}>
              ￥ <span className={styles.price1}>{list.avgPrice}</span> /
              <span className={styles.price2}>瓶</span>
            </Flex>

            <Flex className={styles.tablegroup} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>发 起 人：</label>
              <span className={styles.span}>{list.userNickname}</span>
            </Flex>

            <Flex className={styles.tablegroup} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>数 量：</label>
              <span className={styles.span}>{list.currentOrderAmount + "/" + list.allAmount}</span>
            </Flex>

            <Flex className={styles.tablegroup} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>所 在 群：</label>
              <span className={styles.span}></span>
            </Flex>
            <Flex className={styles.tablegroup} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>交易方式：</label>
              <span className={styles.span}>担保交易</span>
            </Flex>
            <Flex className={styles.tablegroup} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>截止时间：</label>
              <span className={styles.span}>{list.cutoffTime}</span>
            </Flex>
            <Flex className={styles.tablegroup} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>发货时间：</label>
              <span className={styles.span}>{list.sendGoodsDays}天内</span>
            </Flex>
            <Flex className={styles.tablegroup} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>限购（
                <span style={{
                  color: "#858585",
                  fontWeight: "normal",
                  fontSize: 16,
                }
                }>瓶</span>
                /人）:
              </label>
              <span className={styles.span}>{list.userLimit}</span>
            </Flex>

            <Flex className={styles.tablegroup} direction={"row"} alignItems={"center"}>
             <PinButton   cutoffTime={list.cutoffTime}  id={list.id}/>
            </Flex>

          </Flex>
        </Flex>

        <Tabs defaultActiveKey="1">
          <TabPane tab="拼单详情" key="1">
            <Flex className={styles.rule} direction={"column"}>
              <span className={styles.rule_title}>拼单规则</span>
              <span className={styles.rules}>1，每次购买数量不能超过限购数</span>
              <span className={styles.rules}>2，拼单截止后不能再进行购买或取消</span>
              <span className={styles.rules}>3，参与者支付的货款先由平台代为保管，待参与者确认收货后立即支付给发起者</span>
              <span className={styles.rule_title}>拼单备注</span>
              <span className={styles.rules}>{list.remarks}</span>
            </Flex>
          </TabPane>
          <TabPane tab="拼单问答" key="2">
            <Flex className={styles.question} direction={"column"}>
            <Flex className={styles.rule} direction={"row"}>
              <TextArea
                id="test"
                onChange={()=>{
                  let oInput=document.getElementById("test");
                  console.log(oInput.value)
                  this.setState({question:oInput.value})
                }}
                placeholder="请输入你想问的问题"
                rows={4}
                style={{width: 1000, height: 100}}/>

              <Button
                onClick={()=>this.addQuestion(question)}
                type="primary" icon="question">
                我要提问
              </Button>
            </Flex>
              {questionList.map(item=>{
                return(
                  <Flex className={styles.questionlist} direction={"row"} alignItems={"center"}>
                    <img  className={styles.questionimg} src={"https://www.winewishing.com/weixunweb/imgs/wen.png"}/>
                    <p className={styles.questioncontain}>{item.question}</p>
                  </Flex>
                );
              })}
            </Flex>
          </TabPane>
        </Tabs>


      </Flex>
    );
  }

}


function PinButton(props) {
  var time = new Date(props.cutoffTime).getTime();
   const a = new Date().getTime()
  const id=props.id;

  if ((a>time)) {
    return (
      <div className={styles.jiezhibutton}>
        <Button
                type="primary"
                size="large"
        >拼单已截止</Button>
      </div>
    )
  }
   else {
    return <Button
      onClick={() => AppCommon.routerPush('/discovery/querenpindan/?id='+id)}
      type="primary"
      size="large"
    >参与拼单</Button>
  }
}
