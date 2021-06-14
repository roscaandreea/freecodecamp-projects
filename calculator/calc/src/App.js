
import './App.css';
import React from 'react';



const nums= [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops= ['/', '*', '-', '+'];
const ids={
  7: 'seven',
  8: 'eight',
  9: 'nine',
  4: 'four',
  5: 'five',
  6: 'six',
  1: 'one',
  2: 'two',
  3: 'three',
  0: 'zero',
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'add'
}

class App extends React.Component{
  state ={
    lastPressed: undefined,
    currentNumber: '0',
    calc: undefined,
    op: undefined
  };
  
  handleClick = (e) =>{
    const { calc, currentNumber, lastPressed} = this.state;
    const { innerText }= e.target;
    switch(innerText){
      case 'AC':{
        this.setState({
          currentNumber: '0',
          calc: undefined
        });
        break;
      }
      case '=':{
        const evaluated = eval(calc);
        this.setState({
          currentNumber: evaluated,
          calc: evaluated
        });
        break;
      }
      case '.':{
        const splitted = currentNumber.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];
        if(!last.includes('.')){
          this.setState({
            currentNumber: currentNumber + '.',
            calc: calc + '.'
          });
        }
        break;
      }
      default: {
        let e = undefined;
        //check for other operations
        if(ops.includes(innerText)){
          if(ops.includes(lastPressed) && innerText !== '-'){
            const lastNumberIdx = calc.split('').reverse().findIndex(char => char !==' ' && nums.includes(+char));
            e= calc.slice(0,calc.length-lastNumberIdx) + ` ${innerText} `;
          } else {
            e= `${currentNumber} ${innerText} `;
          }       
        } else {
         e= (currentNumber === '0') ? innerText : (currentNumber + innerText);      
        }
         this.setState({
             currentNumber: e,
             calc: e
         });
      }
    }
    this.setState({
      lastPressed: innerText
    });
  }
  render(){
    const { currentNumber, calc }= this.state;
    return(
      <div className="calculator" >
        <div className="display">
          <small>{calc}</small>
          <div id="display">
            {currentNumber}
          </div>
        </div>
        <div className="nums-container">
          <button className=" big-h light-grey ac" onClick={this.handleClick} id="clear">AC</button>
          {nums.map(num =>(
            <button className={`dark-grey ${num == 0 && 'big-h'}`} key={num} onClick={this.handleClick} id={ids[num]}>{num}</button>
          ))}
          <button className="light-grey" onClick={this.handleClick} id="decimal">.</button>
        </div>
        <div className="ops-container">
          {ops.map(op =>(
            <button className="orange" key={op} onClick={this.handleClick} id={ids[op]}>{op}</button>
          ))}
          <button className="orange" onClick={this.handleClick} id="equals">=</button>
        </div>
      </div>
   );
  }
}

export default App;
