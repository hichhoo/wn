import React from "react";
import styles from "@/pages/discovery/querenpindan.less";
import Flex from "@/components/Flex";
import AppCommon from "@/utils/AppCommon";
import {InputNumber, Button,Table,Modal} from 'antd';
import PinjiuApi from "@/https/apis/PinjiuApi";

export default class index extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: [],
      address: [],
      addrList: [],
      visible:false,
    }
  }

  componentDidMount() {
    let a = this.props.location.query;
    console.log(a.id);
    this.loadDefaultaddress()
    this.getData(a.id);
    this.getAddressList();
  }
  showModal = (a) => {
    this.setState({
      visible: a > 0,
    });
  };

  loadDefaultaddress() {
    PinjiuApi.loadDefaultAddress().then(res => {
      if (res.isSuccess) {
        this.setState({
          address: res.result,
        });

      } else {
        AppCommon.showRespError(res);
      }
    })
  }


  getData(id) {
    PinjiuApi.pindanxiangqing(id).then(res => {
      if (res.isSuccess) {
        this.setState({
          list: res.result.pinjiu,
        });

      } else {
        AppCommon.showRespError(res);
      }
    })
  }

  getAddressList(){
    PinjiuApi.getAddressList().then(res => {
      if (res.isSuccess) {
        this.setState({
          addrList: res.result,
        });
      } else {
        AppCommon.showRespError(res);
      }
    })
  }

  renderTable() {
    const {addrList} =this.state;
    const cols = [
      {
        title: "收件人", dataIndex: "name",width:100
      },
      {
        title: "电话", dataIndex: "mobile",width:100
      },
      {
        title:"邮政编码",dataIndex:"postCode",width:100
      },
      {
        title:"地址",dataIndex:"province" ,
        render:(value,record)=>`${value}${record.city}${record.area}${record.address}`
      },
      {
        title:"操作",fixed: 'right', width: 80,
        render: (val, record,index) => {
          console.log(index);
          return <Flex wrap={"wrap"}>
            <Button
              htmlType={'button'} size={"small"} type={"primary"} ghost style={{marginLeft: 4}}
            >选择</Button>
          </Flex>
        }
      }

    ]

    return <Table
      dataSource={addrList} columns={cols} size={"middle"}
      rowKey={record => record.id}
      onRow={record => {
        console.log(record);
        return {
          onClick: event => {this.setState({
            address: record,
          })}, // 点击行
        };
      }}
    />

  }

  render() {
    const {list} = this.state;
    let {address} = this.state;
    let b = this.props.location.query;
    return (
      <Flex className={styles.contain} direction={"column"}>
        <Flex className={styles.topside} direction={"row"}>
          <a><span onClick={() => AppCommon.routerPush('/discovery/pindanxiangqing/?id=' + b.id)}>返回</span></a>
        </Flex>

        <h3>确认拼单</h3>

        <Flex className={styles.neirong} direction={"row"} alignItems={"center"}>
          <div className={styles.img}>
            <img className={styles.imgsize}
                 src={AppCommon.wrapperImgPath(list.image)}/>
          </div>
          <Flex direction={"column"}>
            <span className={styles.name}>{list.name}</span>
            <p className={styles.price}> ￥
              <span className={styles.price1}>{list.avgPrice}</span>
              /
              <span className={styles.price2}>瓶</span>
            </p>
          </Flex>
          <Flex className={styles.inputnub} justify={"flex-end"} alignItems={"center"}>
            <InputNumber
              min={0}
              max={100}
              defaultValue={0}
              formatter={value => `${value}瓶`}
              parser={value => value.replace('瓶', '')}
            />
          </Flex>
        </Flex>

        <Flex className={styles.address} direction={"row"}>
          <Flex direction={"column"}>
            <p>收件人:<span className={styles.addrspan}>{address.name}</span>联系电话:<span
              className={styles.addrspan}>{address.mobile}</span></p>
            <p>收件地址:<span
              className={styles.addrspan}>{address.province}{address.city}{address.area}{address.address}</span></p>
          </Flex>

          <Flex style={{width: 750}} justify={"flex-end"} alignItems={"center"}>
            <Button
              onClick= {()=>this.showModal(1)}
              type="primary">
              修改地址
            </Button>
            <Modal
             width={800}
              title="地址"
              visible={this.state.visible}
             /* onOk={this.handleOk}*/
              onCancel={()=>this.showModal(-1)}
             okText="使用新地址"
             cancelText="关闭"
            >
              {this.renderTable()}
            </Modal>
          </Flex>
        </Flex>
        <p className={styles.hui}>该单为<span className={styles.span1}>担保交易</span>，货款将由微醺平台担保，当您确认收货之后，货款再转给发起者。</p>
        <Flex className={styles.queren}>
          <Button
            type="primary"
            size="large"
          >确认</Button>
        </Flex>
      </Flex>
    );
  }

}
