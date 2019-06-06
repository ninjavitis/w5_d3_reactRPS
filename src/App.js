import React from 'react';
import { Container, Segment, Table, Icon, Button, Checkbox, Image, Divider, Grid, GridColumn } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css"


class App extends React.Component{
  state = {
    options:['rock', 'paper', 'scissors'],
    images:[
      "https://media.giphy.com/media/xT9Igf2wBfQ8ClCDNC/giphy.gif", 
      "https://media.giphy.com/media/yUrUb9fYz6x7a/giphy.gif", 
      "https://media.giphy.com/media/fk3b5iSLqUhdm/giphy.gif"
    ],
    p1Turn:true,
    p2CPU:true,
    gamesPlayed:0,
    gamesDrawn:0,
    message: "",
    player1: {
      pick:null,
      gamesWon:0, 
      winRatio:0.0
    },
    player2: {
      pick:null,
      gamesWon:0,  
      winRatio:0.0
    }
  }

  render(){
    return(
      <Container>
          <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell textAlign='center' >Games Played</Table.HeaderCell>
                <Table.HeaderCell textAlign='center' >Games Won</Table.HeaderCell>
                <Table.HeaderCell textAlign='center' >Games Lost</Table.HeaderCell>
                <Table.HeaderCell textAlign='center' >Games Tied</Table.HeaderCell>
                <Table.HeaderCell textAlign='center' >Win Ratio</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign='center' >Player 1</Table.Cell>
                <Table.Cell textAlign='center' id="p1_gamesPlayed">{this.state.gamesPlayed}</Table.Cell>
                <Table.Cell textAlign='center' id="p1_gamesWon">{this.state.player1.gamesWon}</Table.Cell>
                <Table.Cell textAlign='center' id="p1_gamesLost">{this.state.gamesPlayed - this.state.player1.gamesWon}</Table.Cell>
                <Table.Cell textAlign='center' id="p1_gamesDrawn">{this.state.gamesDrawn}</Table.Cell>
                <Table.Cell textAlign='center' id="p1_winRatio">{this.state.player1.winRatio}%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign='center'>Player 2</Table.Cell>
                <Table.Cell textAlign='center' id="p2_gamesPlayed">{this.state.gamesPlayed}</Table.Cell>
                <Table.Cell textAlign='center' id="p1_gamesWon">{this.state.player2.gamesWon}</Table.Cell>
                <Table.Cell textAlign='center'>{this.state.gamesPlayed - this.state.player2.gamesWon}</Table.Cell>
                <Table.Cell textAlign='center'>{this.state.gamesDrawn}</Table.Cell>
                <Table.Cell textAlign='center'>{this.state.player2.winRatio}%</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        <Segment>
              <Grid columns={2} relaxed="very">
                <GridColumn>
                  <Image src={this.state.images[this.state.player1.pick]} size='small' centered/>
                </GridColumn>
                <GridColumn>
                  <Image src={this.state.images[this.state.player2.pick]} size='small' centered/>
                </GridColumn>
              </Grid>
              <Divider vertical>VS</Divider>
        </Segment>
        <Segment textAlign='center'>{this.state.message}</Segment>
        <Segment textAlign='center'>
          1 Player
          <Checkbox toggle onClick={() => this.toggleCPU()}/>
          2 Players
          <Button.Group>
            <Button onClick={() => this.getPick(0)}><Icon className="hand rock"/>Rock</Button>
            <Button onClick={() => this.getPick(1)}><Icon className="hand paper"/>Paper</Button>
            <Button onClick={() => this.getPick(2)}><Icon className="hand scissors"/>Scissors</Button> 
          </Button.Group>
        </Segment>
      </Container>
    )
  }

  //FUNCTION BLOCK
  
  getPick=(pick)=>{
    if (this.state.p1Turn){
      if (this.state.p2CPU){
        this.setState({ 
          p1Turn: !this.state.p1Turn,
          player1: {...this.state.player1, pick: pick},
          player2: {...this.state.player2, pick: Math.floor(Math.random()*Math.floor(3))}})

          this.setState({reveal:true}, () => this.gameLoop())
      } else {
        this.setState({ 
          p1Turn: !this.state.p1Turn,
          player1: {...this.state.player1, pick: pick},
        })
      }
      } else {
        this.setState({ player2: {...this.state.player2, pick: pick} }, () => this.gameLoop())
    }
  }
      

  gameLoop = () => {
    let p1_GamesWon = this.state.player1.gamesWon
    let p2_GamesWon = this.state.player2.gamesWon
    let gamesDrawn = this.state.gamesDrawn
    let winMessage = ""

    if (this.state.player1.pick === 0 && this.state.player2.pick === 1){
      // p1 loses
      p2_GamesWon++;
      winMessage = "Player 2 Wins!"

    } else if (this.state.player1.pick === 0 && this.state.player2.pick === 2){
      // p1 wins
      p1_GamesWon++;
      winMessage = "Player 1 Wins!"


    } else if (this.state.player1.pick === 1 && this.state.player2.pick === 0){
      // p1 wins
      p1_GamesWon++;
      winMessage = "Player 1 Wins!"

    } else if (this.state.player1.pick === 1 && this.state.player2.pick === 2){
      // p1 loses
      p2_GamesWon++;
      winMessage = "Player 2 Wins!"

    
    } else if (this.state.player1.pick === 2 && this.state.player2.pick === 0){
      // p1 loses
      p2_GamesWon++;
      winMessage = "Player 2 Wins!"

    
    }else if (this.state.player1.pick === 2 && this.state.player2.pick === 1){
      // p1 wins
      p1_GamesWon++;
      winMessage = "Player 1 Wins!"

    } else {
      // draw
      gamesDrawn++;
      winMessage = "Draw!"

    }


    let gamesPlayed = this.state.gamesPlayed +1
    let p1_WinRatio = ((p1_GamesWon / gamesPlayed) * 100).toFixed(1);
    let p2_WinRatio = ((p2_GamesWon / gamesPlayed) * 100).toFixed(1);
    
    this.setState({ 
      gamesPlayed: gamesPlayed, 
      gamesDrawn: gamesDrawn,
      p1Turn: true,
      message: winMessage,
      player1: {...this.state.player1, gamesWon: p1_GamesWon, winRatio: p1_WinRatio},
      player2: {...this.state.player2, gamesWon: p2_GamesWon, winRatio: p2_WinRatio},
    })
  }

  toggleCPU =() =>{ this.setState({p2CPU: !this.state.p2CPU})}

}

export default App;