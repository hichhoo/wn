import React from "react";
import styles from './pindanxiangqing.less';
import Flex from "@/components/Flex";
import {tsImportEqualsDeclaration} from "@babel/types";
import AppCommon from '../../utils/AppCommon';
import c from '../../assets/anothing.png';
import { Switch, Icon, Menu, Tabs, Carousel, Input, Button } from 'antd';
import PinjiuApi from "../../https/apis/PinjiuApi";
import Pdxqjoiner from "../../components/Pdxqjoiner/index";

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      wine:[],
      message:[],
      purchaseInformation:[],
      questionList:[],
      question:""
      }
    }

 
  componentDidMount() {
    let a=this.props.location.query;
    this.getData(a.id);
    this.getQuestionData(a.id)
  }


////////////////////////////////获酒、拼单信息 
  getData(id) {
   PinjiuApi.pdxqDetails(id).then(res => {
    if(res.isSuccess) {
      this.setState({
        list:res.result.pinjiuMenuDtos,
        wine:res.result.pinjiu,
        message:res.result.pinjiuMessage,
        purchaseInformation:res.result.purchaseInformation,
      });
    }else{
      AppCommon.showRespError(res);
    }
  })
  }


////////////////////////////excel下载按钮
 downLoadxls(){
    window.location.href = "https://www.winewishing.com/12878cb9-528e-4dc5-99ee-4df02073e80a"
 }

//////////////////获取问题列表
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



/////////////////////////增加问题
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

/////////////////////////渲染
  renderList() {
    const {list} = this.state;
    return <div>
      {list.map(item => {
        return <Pdxqjoiner item={item}/>;
      })}
    </div>
}


  render() {
    const { TabPane } = Tabs;
    const {questionList}=this.state;
    const {question}=this.state;
    const {TextArea} = Input;
    const { list } = this.state;
    const { wine } = this.state;
    const { message } = this.state;
    const { purchaseInformation } = this.state;
    return (
      <div className={styles.all}>
        <div className={styles.topside}>
          <a><span className={styles.a1} onClick={() => AppCommon.routerPush('/pinjiu')}>拼单管理</span></a>
          &nbsp;>&nbsp;
          <a><span className={styles.a2} onClick={() => AppCommon.routerPush('/pinjiu')}>我发起的</span></a>
          &nbsp;>&nbsp;拼单详情
        </div>
        <div className={styles.contain}>
          <div className={styles.onside}>
            <div className={styles.wimg}>
              <img className = {styles.wwimg} src={AppCommon.wrapperImgPath(wine.image)}/>
            </div>
            <div className={styles.txt}>
              <p className={styles.name}>{wine.name}</p>
              <p className={styles.mess} id="name">
                ￥
                <span className={styles.price} id="price">{wine.avgPrice}</span>
                &nbsp;/&nbsp;
                <span className={styles.unit}>{wine.unit}</span>
              </p>
              <button type="button" name="button" id="pxdelete" className={styles.but01}>取消拼单</button>
              <button type="button" name="button" id="qundelete" className={styles.but02}>拼单讨论组已解散</button>
              <button type="button" name="button" id="pxdel" className={styles.but03}>立即截单</button>
              <button type="button" name="button" id="print" className={styles.but04} onClick={() =>this.downLoadxls()}>导出excel电子表格</button>
            </div>
            <div className={styles.clearfix}></div>
          </div>
        </div>
        <div className = {styles.tabs}>
        <Tabs classmame = {styles.tab} defaultActiveKey="1" onChange={callback} size = {"default"} styles={{width:1050,height:100}}>
          <TabPane tab="拼单详情" key="1" className = {styles.tab} styles={{width: 100,height: 100}}>
            <p className = {styles.pp}>{purchaseInformation}</p>
            <div className = {styles.usercard}>
            <div className = {styles.span0}><span className = {styles.span1}>参与用户</span>
            <span className = {styles.span2}>单价</span>
            <span className = {styles.span3}>数量</span>
            <span className = {styles.span3}>总价</span>
            <span className = {styles.span4}>状态</span>
            </div>
              {this.renderList()}
            <span className = {styles.notatall}>没有更多了</span>
          </div>
          </TabPane>
          <TabPane tab="拼单问答" key="2">
            <Flex className={styles.question} direction={"column"}>
            <Flex className={styles.rule} direction={"row"}>
                <TextArea
                  id="test" onChange={()=>{ let oInput=document.getElementById("test");
                  console.log(oInput.value)
                  this.setState({question:oInput.value})
                  }}
                  placeholder="请输入你想问的问题"
                  rows={4}
                  style={{width: 600, height: 100}}/>
              <Button className = {styles.questionbutton}
                onClick={()=>this.addQuestion(question)}
                type="primary">
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
        </div>
      </div>
    );
  }
}


function callback(key) {
    console.log(key);
  }

