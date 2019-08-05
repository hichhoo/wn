import React, {Component} from 'react'
import Flex from "@/components/Flex";
import styles from "@/pages/discovery/faqipindan.less"
import AppCommon from "@/utils/AppCommon";
import {Input,Select,DatePicker,InputNumber, Upload, Icon, message,Button} from "antd";
import a from '@/assets/dan.png';
import PinjiuApi from "@/https/apis/PinjiuApi";
import Klog from"@/utils/KLog"

export default class faqipindan extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      list:{},
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    PinjiuApi.faqipindan().then(res => {
      if(res.isSuccess) {
        this.setState({list:res.result});
        console.log(this.state)
      } else {
        AppCommon.showRespError(res);
      }
    })
  }



  render() {
    const {TextArea} = Input;
    const { Option } = Select;
    const uploadButton = (
      <div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {list} = this.state;
    return (
      <Flex className={styles.contain} direction={"column"}>
        <Flex className={styles.topside} direction={"row"}>
          <a><span onClick={() => AppCommon.routerPush('/discovery')}>拼单</span></a>
          <span> >发起拼单 </span>
        </Flex>

        <Flex className={styles.table} direction={"column"}>
          <Flex className={styles.titlestyle} justify={"center"}>
            <span className={styles.title}>发起拼单</span>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"}>
            <label>名称
              <span className={styles.redstar}>*</span>
            </label>
            <Input
              placeholder=""
              style={{width: 600, height: 40}}/>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"}>
            <label>备注:</label>
            <TextArea
              placeholder="限两百字"
              rows={4}
              style={{width: 600, height: 100}}/>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"} justify={"space-around"}>
            <Flex className={styles.a} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>数量
                <span className={styles.redstar}>*</span>
              </label>
              <Input
                placeholder=""
                style={{width: 200, height: 40}}/>
            </Flex>

            <Flex className={styles.a} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>交易方式
                <span className={styles.redstar}>*</span>
                <img className={styles.icontype} src={a} title="该订单为担保交易，货款将由微醺平台担保，&#10;当您确认收货之后，货款再转给发起者"/>
              </label>
              <Select
                onSelect={(number,option)=>{
                  console.log(number,option)
                  return 0}

                }
                showSearch
                defaultValue={"jack"}
                style={{ width: 150,height :40}}
                placeholder="担保交易"
              >
                <Option value="jack">担保交易</Option>
                <Option value="lucy">非担保交易</Option>
              </Select>
            </Flex>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"} justify={"space-around"}>
            <Flex className={styles.a} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>最小成功数量
                <span className={styles.redstar}>*</span>
              </label>
              <Input
                placeholder=""
                style={{width: 180, height: 40}}/>
            </Flex>

            <Flex className={styles.a} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>限购
              </label>
              <Input
                placeholder="不填则表示用户购买没限制"
                style={{width: 250, height: 40}}/>
            </Flex>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"} justify={"space-around"}>
            <Flex className={styles.a} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>单价
                <span className={styles.redstar}>*</span>
              </label>
              <Input
                placeholder=""
                style={{width: 250, height: 40}}/>
            </Flex>

            <Flex className={styles.a} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>单位
              </label>
              <Input
                placeholder="瓶"
                style={{width: 250, height: 40}}/>
            </Flex>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"} justify={"space-around"}>
            <Flex className={styles.a} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>发货时间
                <span className={styles.redstar}>*</span>
              </label>
              <InputNumber
                defaultValue={2}
                min={2}
                max={90}
                formatter={value => `${value}天`}
                parser={value => value.replace('天', '')}
              />

            </Flex>

            <Flex className={styles.a} direction={"row"} alignItems={"center"}>
              <label className={styles.label1}>截止时间
                <span className={styles.redstar}>*</span>
              </label>
              <DatePicker showTime placeholder="选择时间"/>
            </Flex>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"}>
            <label>选择群
              <span className={styles.redstar}>*</span>
            </label>
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="选择群"
              optionFilterProp="children"
            >
              <Option value="a">内部测试</Option>
              <Option value="b">App问题反馈群</Option>
              <Option value="c">测试看看</Option>
              <Option value="d">微醺交流群①</Option>
            </Select>
          </Flex>


          <Flex className={styles.shuru} direction={"row"} alignItems={"center"}>
            <label>上传图片
              <span className={styles.redstar}>*</span>
            </label>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              {uploadButton}
            </Upload>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"}>
            <label>选择酒的类别
              <span className={styles.redstar}>*</span>
            </label>
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="请选择"
              optionFilterProp="children"
            >
              <Option value="a">red</Option>
              <Option value="b">white</Option>
              <Option value="c">other</Option>
            </Select>
          </Flex>

          <Flex className={styles.shuru} direction={"row"} alignItems={"center"} justify={"center"}>
            <Button
              color="grey"
              type="primary"
              size="large"
            >确认</Button>
          </Flex>


        </Flex>
      </Flex>
    );
  }

}
