export default {

  /**
   * 打印日志
   */
  init: () => {
    if (NODE_ENV === 'development') {
      return console;
    } else {
      return {
        log: () => {
        }
      };
    }
  }

}
