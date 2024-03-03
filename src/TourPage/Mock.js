import React, { Component } from 'react'

export class Mock extends Component {
    constructor(props) {
        super(props)
         
        this.state = {
             person : {
                 age : 22,
                 name: 'Ram',
                 address : 'vella street'
             }
        }
    }
    
    render() {
       
        return (
            <div>
               {this.state.person.age}  {this.state.person.name}
               <br></br>
               <button onClick = { () => this.setState({person : {
                   age : 32
               }})}> change age</button>
            </div>
        )
    }
}

export default Mock;
