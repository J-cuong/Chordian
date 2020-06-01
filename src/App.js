import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import amaj from './amaj.png';

class Container extends React.Component{
  
  constructor(props){
  super(props);
  this.state={
    highScore : 0,
    chords : ["amaj","amin","bmin","cmaj","dmaj","dmin","emaj","emin","fmaj","gmaj"],
    removed:[],
    ansList:[],
    answer1:"",
    answer2:"",
    answer3:"",
    answer4:"",
    answer:"",
    result:"",
  };
  for (let i = this.state.chords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.chords[i], this.state.chords[j]] = [this.state.chords[j], this.state.chords[i]];
  }
  this.state.answer=this.state.chords[0];
  let songg = this.state.answer
  var i;
  for (i = 0; i < 4; i++) {
  this.state.ansList[i]=this.state.chords[i];
  }
  for (let i = this.state.ansList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.ansList[i], this.state.ansList[j]] = [this.state.ansList[j], this.state.ansList[i]];
  }
  console.log(this.state.ansList)
  
  this.state.answer1= this.state.ansList[0];
  this.state.answer2= this.state.ansList[1];
  this.state.answer3= this.state.ansList[2];
  this.state.answer4= this.state.ansList[3];
}
ansClick(answer){
  if(answer == this.state.answer){
    this.state.highScore = this.state.highScore + 100;
    this.randomize();
    let audio = new Audio("/"+this.state.chords[0]+".mp3")
    audio.play();
    this.setState((state) =>{
      return {highScore : state.highScore, result : <font color="green">Correct!</font>};
    })
    console.log(this.state.highScore)
  }
  else if(answer == ""){
    this.randomize();
    let audio = new Audio("/"+this.state.chords[0]+".mp3")
    audio.play();
    this.setState((state) => {
      return {result : <font color="yellow">Skipped</font>}
    })
  }
  else{
    this.state.highScore = this.state.highScore - 50;
    this.randomize();
    let audio = new Audio("/"+this.state.chords[0]+".mp3")
    audio.play();
    this.setState((state) => {
      return {result : <font color="red">Incorrect</font>}
    })
  }
}
replayClick(soundName){
    let audio = new Audio("/"+soundName+".mp3")
    audio.play();
}

randomize(){
  for (let i = this.state.chords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.chords[i], this.state.chords[j]] = [this.state.chords[j], this.state.chords[i]];
  }
  this.state.answer=this.state.chords[0];
  var i;
for (i = 0; i < 4; i++) {
  this.state.ansList[i]=this.state.chords[i];
}
for (let i = this.state.ansList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.state.ansList[i], this.state.ansList[j]] = [this.state.ansList[j], this.state.ansList[i]];
}
  console.log(this.state.ansList)
  
this.state.answer1= this.state.ansList[0];
this.state.answer2= this.state.ansList[1];
this.state.answer3= this.state.ansList[2];
this.state.answer4= this.state.ansList[3];


}
  render(){

    return(
      <div>
      <div className="High-Score">
      High Score {this.state.highScore} 
      </div>
      <div className="Question">
        {this.state.answer}
        <div className="chordPic">
          <img src={amaj}></img>
        </div>
    <div className="result">{this.state.result}
    </div>
      </div>
      <div className="container">
        <button className="replay" onClick={()=>this.replayClick("sound")}>
          Replay
        </button>
      <button className="Game-button1" onClick={() => this.ansClick(this.state.answer1)}>
        Button {this.state.answer1}
        </button>
        <button className="Game-button2" onClick={() => this.ansClick(this.state.answer2)}>
        Button {this.state.answer2}
        </button>
        <button className="Game-button3" onClick={() => this.ansClick(this.state.answer3)}>
        Button {this.state.answer3}
        </button>
        <button className="Game-button4" onClick={() => this.ansClick(this.state.answer4)}>
        Button {this.state.answer4}
        </button>
        <button className="Game-skip"onClick={() => this.ansClick("")}>
        Skip
        </button>
        </div>
        </div>
    )
  }
}
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Container />
        </div>
      </header>
      </div>
  );
}
export default App;
