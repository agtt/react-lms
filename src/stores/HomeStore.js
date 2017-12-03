import { observable, action } from 'mobx';

import { getAllStudents } from '../api/studentApi';

class HomeStore {
  @observable maleCount = 0;
  @observable femaleCount = 0;

  @action getGenderCount() {
    // reset the counts
    this.maleCount = 0;
    this.femaleCount = 0;

    getAllStudents().then((response) => {
      // iterate through the student array to calculate gender counts
      response.data.forEach((student) => {
        student.gender === 'm' ? this.maleCount += 1 : this.femaleCount += 1;
      })
    });
  }
}

const store = new HomeStore();

export default store;