import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import {setSearchField, requestRobots} from '../actions';

const mapStateToProps = state => {
  return {
    searchf: state.searchRobots.searchf,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSC: (event) => dispatch(setSearchField(event.target.value)),
    onRR: () => dispatch(requestRobots())
  };
};

class App extends Component{

  componentDidMount(){
    this.props.onRR();
  }

  render(){
    const {searchf, onSC, robots, isPending} = this.props;
    console.log(searchf);
    const fR = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchf.toLowerCase())
    })
    return isPending ?
      <h1>Loading</h1>
      : (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSC}/>
        <Scroll>
          <ErrorBoundry>
            <CardList robots={fR}/>
          </ErrorBoundry>
        </Scroll>
      </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
