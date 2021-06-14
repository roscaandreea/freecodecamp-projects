import React from 'react';
import './App.css';

const sounds = [
  {
    key: 'Q',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
   {
    key: 'W',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
   {
    key: 'E',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
   {
    key: 'A',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
   {
    key: 'S',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
   {
    key: 'D',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
   {
    key: 'Z',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
   {
    key: 'X',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
   {
    key: 'C',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];
const keys = ['Q','W','E','A','S','D','Z','X','C'];

const App =()=>(
  <div className="container" id="drum-machine">
    <div className="display" id="display">
      <h1 id="content">Display</h1>
      {sounds.map((sound,index) =>(
            <DrumPad text={sound.key} key={index} audio={sound.mp3} />
          ))}
        </div>
      </div>
    );
  
class DrumPad extends React.Component{
  constructor(props){
    super(props);
    this.audio= React.createRef();
  }
  
  componenDidMount(){
     this.audio.current.addEventListener('ended',(e) =>{
        const parent= e.target.parentNode;
        parent.classList.remove('active');
       });
  }
  
  playSound =() =>{
    this.audio.current.play();
    const parent= this.audio.current.parentNode;
    const id = this.audio.current.id;
    parent.classList.add('active');
    const display = parent.parentNode;
    display.querySelector("h1").innerText=`${id} is playing`;
  }
  
  render(){
    const { text, audio }= this.props;
    return(
      <div className="drum-pad" onClick={this.playSound} id={`drum-${text}`}>
        {text}
        <audio ref={this.audio} src={audio} className="clip" id={text} />
      </div>
    );
  }
}

document.addEventListener('keydown',(e) =>{
     const id= e.key.toUpperCase();
     const audio = document.getElementById(id);
     if(audio){
       const parent= audio.parentNode;
       parent.classList.add('active');
        const display = parent.parentNode;
        display.querySelector("h1").innerText=`${id} is playing`;
       audio.play();
     }  
    });   

export default App;
