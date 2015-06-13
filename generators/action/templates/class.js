import {flux} from '../shared';


class <%= className %> {
  constructor() {
    this.generateActions([]);
  }
}


export default flux.createActions(<%= className %>);
