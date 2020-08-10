import React from 'react';
import './App.css';
import Answers from './Answers';

import amaj from './amaj.png';
import amin from './amin.png';
import bmin from './bmin.png';
import cmaj from './cmaj.png';
import dmin from './dmin.png';
import dmaj from './dmaj.png';
import emaj from './emaj.png';
import emin from './emin.png';
import fmaj from './fmaj.png';
import gmaj from './gmaj.png';

import amajMP from './amaj.mp3';
import aminMP from './amin.mp3';
import bminMP from './bmin.mp3';
import cmajMP from './cmaj.mp3';
import dminMP from './dmin.mp3';
import dmajMP from './dmaj.mp3';
import emajMP from './emaj.mp3';
import eminMP from './emin.mp3';
import fmajMP from './fmaj.mp3';
import gmajMP from './gmaj.mp3';
/*
        <div className="Game-Start">
        <button className="Game-Start" onClick={() => this.startGame()}>
          Start Game
        </button>
        </div>*/
class chord {
  constructor(chordName,chordSound,chordPic){
    this.chordName = chordName;
    this.chordPic = chordPic
    this.chordSound = chordSound;
  }
}

const Dropdown = ({show}) => 

<button onClick={() => Results.dropdownVisible=false} style={{visibility: show ? "visible" : "hidden", backgroundColor: "blue", position: "absolute", height: "100%", width: "100%"}}>
</button>
class Results extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dropdownVisible:true
    }
  }
  
  render(){
    return(
      <div>
      <Dropdown show={this.state.dropdownVisible} />
      </div>
    );
  }
}
class Container extends React.Component{
  constructor(props){
  super(props);
  this.state={
    highScore : 0,
    email:"asdf@asdf",
    password:"asdf",
    removed:[],
    ansList:[],
    result:"",
    test:[],
    correctName:"",
    correctPic:"",
    play:"Play",
    intro:"Chordian Requires sound Press play at the bottom",
    userId:"",
    userHigh:0
  };
  this.state.test=[
    new chord("amaj",amajMP,amaj),
    new chord("amin",aminMP,amin),
    new chord("bmin",bminMP,bmin),
    new chord("cmaj",cmajMP,cmaj),
    new chord("dmaj",dmajMP,dmaj),
    new chord("dmin",dminMP,dmin),
    new chord("emaj",emajMP,emaj),
    new chord("emin",eminMP,emin),
    new chord("fmaj",fmajMP,fmaj),
    new chord("gmaj",gmajMP,gmaj),
  ];
  
  for (let i = this.state.test.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.test[i], this.state.test[j]] = [this.state.test[j], this.state.test[i]];
  }

  var i;

  for (i = 0; i < 4; i++) {
  this.state.ansList[i]=this.state.test[i];
  }

  for (let i = this.state.ansList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.ansList[i], this.state.ansList[j]] = [this.state.ansList[j], this.state.ansList[i]];
  }
}
ansClick(answer){

  this.state.correct=new chord(this.state.test[0].chordName,this.state.test[0].chordSound,this.state.test[0].chordPic);
  this.state.correctName = this.state.test[0].chordName;
  this.state.correctPic = this.state.test[0].chordPic;
  if(this.state.play==="Play"){
    this.setState((state) =>{
    return {play:"Skip",intro:"",correctName:"",correctPic:""}})
    this.randomize();
    let audio = new Audio(this.state.test[0].chordSound)
    audio.play();
  }
  else if(answer === this.state.test[0].chordName){
    this.state.highScore = this.state.highScore + 100;
    if(this.state.userId && this.state.userHigh<this.state.highScore){
      this.state.userHigh = this.state.highScore;
      var url = 'http://ec2-3-129-18-39.us-east-2.compute.amazonaws.com:8080/user/'+this.state.userId;
    fetch(url,  {
      method: 'PATCH',
      body: '[{"propName":"score","value":"'+this.state.userHigh+'"}]',
      headers: {"Content-type":"application/json; charset=UTF-8"
      }
    })
    .then(JSON)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });}
    this.randomize();
    let audio = new Audio(this.state.test[0].chordSound)
    audio.play();
    this.setState((state) =>{
      return {highScore : state.highScore, result : <font color="green">Correct!</font>, correctName : this.state.correctName, correctPic:this.state.correctPic};
    })
  }
  else if(answer === ""){
    this.randomize();
    let audio = new Audio(this.state.test[0].chordSound)
    audio.play();
    this.setState((state) => {
        return {result : <font color="yellow">Skipped</font>}
    })
  }
  else{
    this.state.highScore = this.state.highScore - 50;
    this.randomize();
    let audio = new Audio(this.state.test[0].chordSound)
    audio.play();
    this.setState((state) => {
      return {result : <font color="red">Incorrect</font>}
    })
  }
}

replayClick(){
  let audio = new Audio(this.state.test[0].chordSound)
  audio.play()
}

randomize(){
  for (let i = this.state.test.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.test[i], this.state.test[j]] = [this.state.test[j], this.state.test[i]];
  }
  var i;
for (i = 0; i < 4; i++) {
  this.state.ansList[i]=this.state.test[i];
  }
for (let i = this.state.ansList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.state.ansList[i], this.state.ansList[j]] = [this.state.ansList[j], this.state.ansList[i]];
  }
}
startGame(){
}


FormChangeHandler = (event) => {
  let nam = event.target.name;
  let val = event.target.value;
  this.setState({[nam]: val});
}

submitLogIn = (event) => {
  event.preventDefault();
  var url = 'http://ec2-3-129-18-39.us-east-2.compute.amazonaws.com:8080/user/login';
  fetch(url,  {
    method: 'POST',
    body: "{\"email\": \""+this.state.email+"\", \"password\":\""+this.state.password+"\"}",
    headers: {"Content-type":"application/json; charset=UTF-8"
    }
  }).then(response => response.json()).then(data => {
    var obj = JSON.parse(JSON.stringify(data));
    this.state.userId = obj.userId;
    this.state.userHigh = obj.score;
    this.setState({[this.state.userHigh]: this.state.userHigh});
    console.log(obj);
    console.log(this.state.userId)
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
  //alert("You are submitting " + this.state.email + " , " + this.state.password);
}

submitSignUP(){
  console.log("yerrr");
  var url = 'http://ec2-3-129-18-39.us-east-2.compute.amazonaws.com:8080/user/signup';
  fetch(url,  {
    method: 'POST',
    body: "{\"email\": \""+this.state.email+"\", \"password\":\""+this.state.password+"\"}",
    headers: {"Content-type":"application/json; charset=UTF-8"
    }
  }).then(response => response.json()).then(data => {
    var obj = JSON.parse(JSON.stringify(data));
    this.state.userId = obj.userId;
    this.state.userHigh = obj.score;
    this.setState({[this.state.userHigh]: this.state.userHigh});
    console.log(obj);
    console.log(this.state.userId)
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}
  render(){
    return(
      <div>
        
        <div className ="Login">
  <form onSubmit={this.submitLogIn}>
  <label>
    Email:
    <input type="text" name="email" onChange={this.FormChangeHandler}/>
  </label>
        
  <label>
       Password:
    <input type="text" name="password" onChange={this.FormChangeHandler}/>
  </label>
  
  <input type="submit" id="LogIN" value="Log In" />
</form>
<button onClick={()=>this.submitSignUP()}>Sign UP</button>
      </div>
      <div className="High-Score">
      High Score {this.state.userHigh} <br></br>
      Score {this.state.highScore}
      </div>
      <div className="Question">
        <div className="intro">
          {this.state.intro}
        </div>
        {this.state.correctName}
        <div className="chordPic">
          <img src={this.state.correctPic}></img>
        </div>
    <div className="result">{this.state.result}
    </div>
      </div>
      <div className="container">
        <button className="replay" onClick={()=>this.replayClick()}>
          Replay
        </button>
      <button className="Game-button1" onClick={() => this.ansClick(this.state.ansList[0].chordName)}>
        Button {this.state.ansList[0].chordName}
        </button>
        <button className="Game-button2" onClick={() => this.ansClick(this.state.ansList[1].chordName)}>
        Button {this.state.ansList[1].chordName}
        </button>
        <button className="Game-button3" onClick={() => this.ansClick(this.state.ansList[2].chordName)}>
        Button {this.state.ansList[2].chordName}
        </button>
        <button className="Game-button4" onClick={() => this.ansClick(this.state.ansList[3].chordName)}>
        Button {this.state.ansList[3].chordName}
        </button>
        <button className="Game-skip"onClick={() => this.ansClick("")}>
        {this.state.play}
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
          <Answers />
          <Container />
        </div>
      </header>
      </div>
  );
}
export default App;
