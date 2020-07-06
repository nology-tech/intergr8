import React, { Component } from 'react';
import mockData from '../../data/mockData';
import ChartPanel from './ChartPanel';

class TicketingDashboard extends Component {

    state = {
      user: 'Ollie_Holden',
      totalTickets: null,
      assignedTickets: null,
      inProgressTickets: null,
      userInProgressTickets: null,
      percentUnassignedTickets: null,
      percentInProgressTickets: null,
      percentUserInProgressTickets: null,  
    }
  
    countTickets = () => mockData.length;
    countUserTickets = () => mockData.filter((ticket) => ticket.owner === this.state.user).length;
    countUnassignedTickets = () => mockData.filter((ticket) => !ticket.assigned).length;
    countInProgressTickets = () => mockData.filter((ticket) => ticket.inProgress).length;
    countUserInProgressTickets = () => mockData.filter((ticket) => (ticket.owner === this.state.user) && (ticket.inProgress)).length;
    calculatePercent = (total, number) => ((number / total) * 100);
  
    componentDidMount() {
      this.setState({
        totalTickets: this.countTickets(),
        assignedTickets: this.countUnassignedTickets(),
        inProgressTickets: this.countInProgressTickets(),
        userInProgressTickets: this.countUserInProgressTickets(),
        percentUnassignedTickets: this.calculatePercent(this.countTickets(), this.countUnassignedTickets()),
        percentInProgressTickets: this.calculatePercent(this.countTickets(), this.countInProgressTickets()),
        percentUserInProgressTickets: this.calculatePercent(this.countUserTickets(), this.countUserInProgressTickets()),
      });
    }
  
    render() { 
        return ( 
        <ChartPanel 
        percentUnassignedTickets={this.state.percentUnassignedTickets} 
        percentInProgressTickets={this.state.percentInProgressTickets} 
        percentUserInProgressTickets={this.state.percentUserInProgressTickets}
        />
         );
    }
}
 
export default TicketingDashboard;