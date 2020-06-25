import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ticketDetails } from "./../Stitch/mongodb";
import trash from './../images/trash.svg';
import './../CSS/bookingrequests.css';

class Tickets extends React.Component {

    constructor(props) {
       super(props)
       this.state = {
            tickets: []
       }
    }

    async componentDidMount() {
        var curruser = this.props.reducerState.userReducer.currentuser;
        //getting tickets data from db of current user.
        var data = await ticketDetails.find({"customer_id": curruser.id}).toArray();
        data.forEach(element => {
            this.setState({ tickets: [...this.state.tickets,element]});
        //console.log("Tickets:- " + Tickets);
    });
}

    render() {
        //console.log(this.state.tickets);
        //storing the tickets list in table view
        var ticketList = this.state.tickets.map( (details) => {
            return(
            <tr key={details._id}>
                <td>{details.start}</td>
                <td>{details.destiny}</td>
                <td>{details.startdate}</td>
                <td>{details.returndate}</td>
                <td>{details.quantity}</td>
                <td><img className='trashimg' src={trash} alt='Delete'  onClick = { (e) => 
                    ticketDetails.deleteOne({ "_id": details._id}).then( 
                        (e) => { this.setState({ tickets: this.state.tickets.filter( list => list._id !== details._id ) })}
                        )}/>
                </td>
            </tr>)
        } );

        return (
            <div className = 'brcontainer'>
                <h1 className = 'brheading'>Your Tickets</h1>

                <Table striped bordered hover size="sm" variant="dark" responsive style={{ paddingTop: '30px'}}>
                    <thead>
                        <tr>
                            <th>Start</th>
                            <th>Destiny</th>
                            <th>Start Date</th>
                            <th>Return Date</th>
                            <th>Quantity</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketList}
                    </tbody>
                </Table>
            </div>
            );
    }
}


const mapStateToProps = (state) => ({
    reducerState: state
})


export default connect(mapStateToProps)(Tickets);
