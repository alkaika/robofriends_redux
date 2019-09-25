import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll';
import '../containers/App.css';
import ErrorBoundry from '../components/ErrorBoundry'
import { setsearchField, setrequestRobots } from '../actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setsearchField(event.target.value)),
		onRequestRobots: () => setrequestRobots(dispatch) //OR dispatch(setrequestRobots())
	}
}

class App extends Component {

componentDidMount() {
	this.props.onRequestRobots()
}

render() {
	const { searchField, onSearchChange, robots, isPending } = this.props;
	const filteredRobots = robots.filter(robot => 
		robot.name.toLowerCase().includes(searchField.toLowerCase()))

if (isPending) {
	return <h2 className='tc'>LOADING</h2>
} else {
	return (
		<div className='tc'>
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange={onSearchChange}/>
			<Scroll>
				<ErrorBoundry>
					<CardList robots={filteredRobots}/>
				</ErrorBoundry>
			</Scroll>
			<h1>Created by Alan Aspera</h1>
		</div>
		);
	}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);