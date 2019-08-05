import React from 'react';
import styles from './index.less';
import Flex from "@/components/Flex";


export default class index extends React.Component {

  /////////////////////// 父类方法下面

  constructor(props, context) {
    super(props, context);
  }

  ////////////////////// 这个页面的逻辑方法


  ///////////////////// 页面渲染放下面

  render() {
    return <Flex direction={"column"}>
      <div className={styles.beijing}>
        <img src={require('@/assets/beijing.png')}/>
      </div>

    </Flex>;
  }

}

