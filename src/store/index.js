import Home from "./home";
import Answers from "./answers";
class Stores {
  constructor() {
    this.home = new Home();
    this.answers = new Answers();
  }
}

export default new Stores();