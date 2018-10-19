import { observable, action, configure, reaction } from "mobx";
// import ax from '../api';
configure({ enforceActions : 'always' });
class Home {
  @observable value = 'lalal';
  @observable list = ['Dell','Lee','Mobx'];

  @action.bound resize(val) {
    this.value = val;
  }

  @action.bound addItem(){
    this.list.push(this.value);
    this.value = '';
  }

  @action.bound deleteItem(item){
    this.list.remove(item);
  }

  @action.bound initList(){
    
  }
  
  constructor(){
    reaction(() => this.value, data => { console.log(data) })
  }
  
}



export default Home;