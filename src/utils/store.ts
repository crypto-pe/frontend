import { Account, Organization } from "./api.gen";

interface State {
  address?: string;
  jwtToken?: string;
  account?: Account;
  organizations?: Array<Organization>;
  selectedOrganization?: string;
}

class Store {
  state: State;

  constructor(initialState) {
    this.state = initialState;
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

const store = new Store({});
export default store;
