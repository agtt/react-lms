import axios from 'axios';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import StudentList from './StudentList';
import StudentsViewHeader from './StudentsViewHeader';
import Spinner from '../UI/Spinner';

@inject('StudentStore')
@observer
class StudentsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents = () => {
    const { StudentStore } = this.props;

    this.setState({ isLoading: true });

    axios.get('/api/students').then((response) => {
      StudentStore.loadStudents(response.data);

      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        <StudentsViewHeader />
        {isLoading ? <Spinner /> : <StudentList />}
      </div>
    );
  }
}

export default StudentsView;
