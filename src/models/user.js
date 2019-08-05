export default {

  state: {
    userObj: {
      userInfo: {},
      userMore: {},
    },
  },

  effects: {
    * setState({payload}, action) {
      yield action.put({
        type: 'respState', payload,
      })
    },
  },

  reducers: {
    respState(state, {payload}) {
      return {
        ...state, ...payload,
      }
    },
  },

};

