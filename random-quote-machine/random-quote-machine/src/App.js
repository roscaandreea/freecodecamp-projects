import React from 'react';
import './App.css';

// 1. import React,ReactDOM
// 2 get API url
// 3. create layout(Box + inner Content)
// 4. add event listeners
// 5. some style

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component {
  state ={
    quotes: [{
       "quote":"Life isn’t about getting and having, it’s about giving and being.","author":"Kevin Kruse"}],
    item: 0,
    colors : [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
],
    index: 0
    
  }
  
  componentDidMount(){
    //call the Api and update state
    fetch(API).then(res => res.json())
              .then(res =>{
                this.setState({
                  quotes: res.quotes
                },this.getRandomItem);
              });
  }
  
  getRandomItem =() =>{
    const { quotes }= this.state;
    if(quotes.length > 0){
      const item = Math.floor(Math.random() * quotes.length);
      this.setState({
        item: item
      });
    }
  }
  
  getRandomIndexColor =() =>{
    const { colors }= this.state;
    if(colors.length >0){
      const index = Math.floor(Math.random() * colors.length);
      this.setState({
        index: index
      });
    }
  }
  render(){
    const { quotes,item,colors,index }= this.state;
    const quote = quotes[item];
    const tweetURL= `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;
    return (
      <div className="d-flex align-items-center justify-content-center vh-100" onChange={this. getRandomIndexColor}>
        <div className="col-6">
          <div className="box p-4 rounded" id="quote-box">
            { quote && (
              <div className="mb-4">
                <h5 id="text"><i className="fa fa-quote-left"> </i>
                  {quote.quote}</h5>
                  <cite className="d-block text-right" id="author"> -{quote.author}</cite>
              </div>
              )
            }
            <div className="d-flex justify-content-between">
              <a className="btn btn-sm btn-primary"  target="_blank" href={tweetURL} id="tweet-quote"><i className="fa fa-twitter"></i>Twitte</a>
              <button className="btn btn-sm btn-primary"onClick={this.getRandomItem} id="new-quote">New Quote</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
