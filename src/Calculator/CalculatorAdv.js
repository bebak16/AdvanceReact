import React, { Component } from 'react'
import './CalculatorAdv.css'

class CalculatorAdv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: ''
        }
    }
   
    buttonhandler = (ab) => {
       
        if (ab === '=')
        {
            try 
            {   this.setState((prevState) => ({
                values: eval(prevState.values)
               }),()=> { 
                if(this.state.values == "Infinity"){
                this.setState({ values : 'Math Error'})
               }})  
            } 
            catch (error) {
                this.setState({ values : 'Math Error'})
            }
        }
        else {
            // if(flag === 1){
            //     this.setState({
            //         values: ''
            //     })
            //     flag = 0;
            // }
            this.setState((prevState) => ({
                values: prevState.values + ab,
            }))
        }
    }

    clearHandler = (e) => {
        e.preventDefault();
        this.setState({
            values: ""
        })
    }
    clearwordHandler = () => {
        this.setState((prevState ) => ({
            values : prevState.values.slice(0,-1)
        }))
    }
    render() {
        return (
            <div>
                <center>
                    <table className='tablestyle'>
                        <tbody>
                            <tr><th colSpan='4' style={{borderBottom: '5px solid grey',backgroundColor: 'darkslategray', color: 'white' }}>Simple Calculator</th></tr>
                            <tr><th colSpan='4' style={{borderBottom: '5px solid grey'}}>
                            <input id = 'result' style ={{ width:'100%', boxSizing: 'border-box'}} 
                            value={this.state.values || 0} readOnly />
                            </th></tr>
                            <tr>
                                <td><button id = 'clear' onClick={this.clearHandler}>AC</button> </td>
                                <td><button id = 'delete' onClick={this.clearwordHandler}>DELETE</button> </td> 
                                <td><button id = 'equal' style= {{backgroundColor:'green'}}onClick={() => { this.buttonhandler('=') }}>=</button> </td>
                                <td><button id = 'divide' className = 'operator' onClick={() => { this.buttonhandler('/') }}>/</button> </td> 

                            </tr>
                            <tr>
                                <td><button id = '7' onClick={() => { this.buttonhandler(7) }}>7</button> </td>
                                <td><button id = '8' onClick={() => { this.buttonhandler(8) }}>8</button> </td>
                                <td><button id = '9' onClick={() => { this.buttonhandler(9) }}>9</button> </td>
                                <td><button id = 'multiply' className = 'operator' onClick={() => { this.buttonhandler('*') }}>*</button> </td>
                            </tr>
                            <tr>
                                <td><button id = '4' onClick={() => { this.buttonhandler(4) }}>4</button> </td>
                                <td><button id = '5' onClick={() => { this.buttonhandler(5) }}>5</button> </td>
                                <td><button id = '6' onClick={() => { this.buttonhandler(6) }}>6</button> </td>
                                <td><button id = 'subtract' className = 'operator' onClick={() => { this.buttonhandler('-') }}>-</button> </td>
                            </tr>
                            <tr>
                                <td> <button id = '1' onClick={() => { this.buttonhandler(1) }}>1</button></td>
                                <td><button  id = '2' onClick={() => { this.buttonhandler(2) }}>2</button> </td>
                                <td><button id = '3' onClick={() => { this.buttonhandler(3) }}>3</button> </td>
                                <td><button id = 'add' className = 'operator' onClick={() => { this.buttonhandler('+') }}>+</button> </td>
                            </tr>
                            
                           
                            <tr>
                                <td colSpan = '2'><button id = '0' style={{width: '3.6cm'}}onClick={() => { this.buttonhandler(0) }}>0</button> </td>
                                <td><button id = 'dot' onClick={() => { this.buttonhandler('.') }}>.</button> </td>
                                <td><button id = 'percentile' className = 'operator' onClick={() => { this.buttonhandler('%') }}>%</button> </td>
                                </tr>
                               
                        </tbody>
                    </table>
                </center>

            </div>
        )
    }
}

export default CalculatorAdv
