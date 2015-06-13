import {flux} from '../shared';


class <%= className %> {
  constructor() {
    //1. this.bindActions();
    //2. this.bindListeners({});
  }
}


export default flux.createStore(<%= className %>, '<%= className %>');
