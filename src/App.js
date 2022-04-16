import React from 'react';
import './App.css';
import { roadsInvest } from './invest.js';

class IntroModal extends React.Component {
  render() {
    return (
      <div 
        style={{visibility: this.props.visible ? 'visible' : 'hidden'}}
        className = 'introModal'
      >
        {/* <h1>Hello and Welcome to Green City Builder!</h1>
        <p className="intro-text">As the mayor of your city, you have 30 years to help your city reach 80% sustainability. Currently, these are your city's stats:</p> */}
        <h1>{this.props.title}</h1>
        <p>{this.props.text}</p>
        <img 
          src={require("./Photos/money.gif")} 
          alt="Money"
          width="30px"
        />
        <p>Money: ${this.props.money}</p>
        <img 
          src={require("./Photos/thumb.png")} 
          alt="Approval"
          width="15px"
        />
        <p>Public approval rating: {this.props.approval}%</p>
        <img 
          src={require("./Photos/tree.png")} 
          alt="Trees"
          width="20px"
        />
        <p>Sustainability: {this.props.sustainbility}%</p>
        <p>Unemployment: {this.props.unemployment}%</p>
        {/*<p>Annual CO2 emissions: {this.props.co2}</p>*/}

        {/* Button for closing modal */}
        
        {this.props.closeButton}
      </div>
    );
  }
}

class YearStatsModal extends React.Component {
  render() {
    return (
      <div style = {{visibility: this.props.visible ? 'visible' : 'hidden'}}
        className='yearStatsModal'>
        <h1>Year: {this.props.year}</h1>
        <p>Money: ${this.props.money}</p>
        <p>Approval: {this.props.approval}%</p>
        <p>Sustainability: {this.props.sustainability}%</p>
        <p>Unemployment: {this.props.unemployment}%</p>

        {/* Button for ending year */}
        {this.props.endYear}
      </div>
    );
  }
}

class YearChanges extends React.Component {
  render() {
    return (
      <div>
        <h1>Losses</h1>
      </div>
    );
  }
}

class InvestModal extends React.Component {
  render() {
    return (
      <div 
        style={{visibility: this.props.visible ? 'visible' : 'hidden'}}
        className="invest-modal"
      >
        <h1>Invest in {this.props.thing}</h1>
        <div className='options'>
          {this.props.options}
        </div>
        
        <button
          onClick={() => this.props.closeButton()}
          className="x-button"
        >X</button>
        {this.props.closeButton} {/* Closes modal */}
      </div>
    );
  }
}

function InvestOption(props) {
  return (
    <div className='invest-option'>
      <p>Benefits: {props.benefits}</p>
      <p>Drawbacks: {props.drawbacks}</p>
      <button onClick={() => props.onClick()}>
        {props.description}
      </button>
    </div>
  );
}

 

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Modal visibilities
      introModalVisible: true,
      statsModalVisibile: false,

      // Intro Modal state
      introTitle: 'Hello and Welcome to Green City Builder!',
      introText: "As the mayor of your city, you have 30 years to help your city reach 80% sustainability. Currently, these are your city's stats:",
      introCloseButVisible: true,
      
      // Invest modal visibilities
      carsVisible: false, roadsVisible: false, waterVisible: false, 
      schoolVisible: false, trashVisible: false, homesVisible: false, 
      treesVisible: false, industryVisible: false,

      // Game stats
      year: 1,
      money: 5000000 + Math.round(Math.random() * 2000000), // random int [5 million, 7 million]
      unemployment: 4 + Math.round(Math.random() * 4), // random int [4, 8]
      approval: 45 + Math.round(Math.random() * 10), // random int [45%, 55%]
      sustainability: 15 + Math.round(Math.random() * 5), // random int [15%, 20%],

      prevUnemp: 6, prevApproval: 50, prevSust: 17.5,

      carSust: 10, trashSust: 10, roadSust: 10, industrySust: 10, 


      investments: [],
      events: [],
    };
  }

  /* Closes intro modal and opens yearStats modal */
  closeIntroOpenStats() {
    this.setState({
      introModalVisible: false,
      statsModalVisibile: true,
    });
  }

  /* Invests and moves to next year */
  nextYear() {
    // this.yearlyInvest();
    this.yearlyEvents();
    let losses = this.calculateLosses();
    this.setState({
      year: this.state.year + 1,
      money: this.state.money 
          - Math.round(losses) 
          + Math.round(Math.random() * 200000000) + 200000000,
      unemployment: this.state.unemployment + Math.round(Math.random() * 5 - 3), // [-3%, +2%]
      // Approval changes based on change in sustainability and unemployment
      approval: Math.round(this.state.approval + Math.round(Math.random() * 5 - 3)
              + ((this.state.sustainability - this.state.prevSust) / 2) 
              + ((this.state.unemployment - this.state.prevUnemp) / 2)), 
      prevSust: this.state.sustainability,
    });
  }

  /* Performs all investments for the year */
  yearlyInvest() {
    for (let i = this.state.investments.length - 1; i >= 0; i--) {
      let investment = this.state.investments[i];

      // Delete investment that is over 
      if (investment.years === 0) {
        this.setState({
          investments: this.state.investments.slice(0,i) + this.state.investments.slice(i+1, this.state.investments.length - 1)
        })
      }

      // Change stats based on investment
      else {
        this.setState({
          money: this.state.money - investment.cost,
          // unemployment: this.adjustUnemployment(investment), 
        });
      }
    }
  }

  /* Calculates losses for next year based on sustainability */
  calculateLosses() {
    // Road losses - worse roads, more accidents [0, 50] million
    let roadLoss = (100 - Math.random(this.state.roadSust)) * 500000;
    // School losses - worse education, more loss [0, 20] million
    let schoolLoss = (100 - Math.random(this.state.schoolSust)) * 200000;
    // Trash losses - more waste, more disasters [0, 10] million
    let trashLoss = (100 - Math.random(this.state.trashSust)) * 100000;
    // Industry losses - worse industry, lower productivity [0, 40] million
    let industryLoss = (100 - Math.random(this.state.industrySust)) * 400000;
    // Natural disaster losses - lower overall sustainability, more disaster loss [0, 50] million
    let disasterLoss = (100 - Math.random(this.state.sustainability)) * 500000;
    
    let totalYearlyLosses = roadLoss + schoolLoss + trashLoss + industryLoss + disasterLoss;
    return totalYearlyLosses;
  }

  /* Adds an investment */
  addInvest(amount, thng, yrs) {
    this.setState({
      investments: [...this.state.investments, {cost: amount, thing: thng, years: yrs}]
    });
  }

  /* Executes all events TODO: move this to yearlyInvest */
  yearlyEvents() {
    for (let i = this.state.events.length - 1; i >= 0; i--) {
      let event = this.state.events[i];

      if (event.years === 0) { // Delete event that is over 
        // Cuts out finished event
        let newEvents = this.state.events.slice(0,i) + 
                        this.state.events.slice(i+1, this.state.events.length - 1);
        this.setState({
          events: newEvents
        });
      }
      
      // Change stats based on event
      else {
        this.setState({
          money: this.state.money - event.cost.amount + event.moneyGain.amount,
          unemployment: this.state.unemployment - event.jobs.amount,
          sustainability: this.state.sustainability + event.sustainability.amount,
          // unemployment: this.adjustUnemployment(investment), 
        });
      }
    }
  }

  /* Adds events from an investment TODO: move this to addInvest */
  addEvents(event) {
    let newEvents = this.state.events.slice();
    newEvents.push(event);
    this.setState({
      events: newEvents
    });
  }

  render() {
    return (
      <div className="App">
        <IntroModal 
          visible={this.state.introModalVisible}
          gameOverModal
          money={this.state.money}
          title={this.state.introTitle}
          text={this.state.introText}
          approval={this.state.approval}
          sustainability={this.state.sustainability}
          unemployment={this.state.unemployment}
          
          // Closes modal
          closeButton={
            <button 
              onClick={() => this.closeIntroOpenStats()}
              className="closeIntroButton"
              style={{visibility: this.state.introCloseButVisible ? 'visible' : 'hidden'}}
            >
            Start Game
          </button>
          }
        />

        {/* Stats modal for current year */}
        <YearStatsModal 
          visible={this.state.statsModalVisibile} 
          year={this.state.year}
          money={this.state.money}
          approval={this.state.approval}
          sustainability={this.state.sustainability}
          unemployment={this.state.unemployment}

          /* Executes investments and moves to next year */
          endYear = {
            <button 
              className='endYear'
              onClick={
                () => { 
                  if (this.state.year >= 5) {
                    // console.log('game over');
                    this.setState({
                      gameOverModalVisible: true,
                      introModalVisible: true,
                      statsModalVisibile: false,
                      introTitle: 'Game Over! You ' + (this.state.sustainability > 80 ? 'won!' : 'lost.'),
                      introText: 'These were your stats:',
                      introCloseButVisible: false,
                    })
                  }
                  else {
                    this.nextYear();
                  }
                }
              }
            >
            End Year
            </button>
          }
        />

        {/* Cars Modal */}
        <InvestModal 
          thing="Cars"
          visible={this.state.carsVisible} 
          closeButton={() => this.setState({carsVisible: false})}
          benefits="Help save energy"
          drawbacks="Expensive" // TODO : add these to InvestModal

          options={[
            <InvestOption 
              description={'Invest $1000 per year (3 years)'}
              years={3}
              onClick={() => {
                  // this.addInvest(1000, 'cars');
                  // console.log('yo');
                  this.addEvents(
                    roadsInvest(1000, 5)
                  );
                  this.setState({carsVisible: false}); // close modal
                }}
            />,
            <InvestOption 
              description={'Invest $5000 per year (3 years)'}
              years={3}
              onClick={() => { 
                this.addInvest(5000, 'cars', 3)
                this.setState({carsVisible: false}); // close modal
              }}
            />
          ]}        
        />

        {/* Trash Modal */}
        <InvestModal 
          thing="Trash" 
          visible={this.state.trashVisible}
          closeButton={() => this.setState({trashVisible: false})}
          benefits="Help save energy"
          drawbacks="Expensive"
          
          options={[
            <InvestOption 
              description={'Invest in trash for $1000'}
              years={3}
              onClick={
                () => {
                  this.addInvest(1000, 'trash', 3)
                  
                }
              }
            />
          ]}        
        />

        {/* Roads Modal */}
        <InvestModal 
          thing="Roads" 
          visible={this.state.roadsVisible}
          closeButton={() => this.setState({roadsVisible: false})}
          benefits=
            {`Poor infrastructure can reduce economic productivity. 
              Investing in infrastructure can create many temporary jobs.
            `}
          drawbacks="Maintaining and building infrastructure is very expensive"

          options={[
            <InvestOption 
              description={'Invest $5000'}
              onClick={() => this.addInvest(1000, 'cars')}
            />
          ]}        
        />

        {/* Trees Modal */}
        <InvestModal 
          thing="Trees" 
          visible={this.state.treesVisible}
          closeButton={() => this.setState({treesVisible: false})}
          benefits={
            `Poor infrastructure can reduce economic productivity. 
              Investing in infrastructure can create many temporary jobs.
          `}
          drawbacks="Maintaining and building infrastructure is very expensive"

          options={[
            <InvestOption 
              description={'Invest $5000'}
              onClick={() => this.addInvest(1000, 'cars')}
            />
          ]}        
        />

        {/* Schools Modal */}
        <InvestModal 
          thing="Schools" 
          visible={this.state.schoolVisible}
          closeButton={() => this.setState({schoolVisible: false})}
          benefits=
            {`Poor infrastructure can reduce economic productivity. 
              Investing in infrastructure can create many temporary jobs.
            `}
          drawbacks="Maintaining and building infrastructure is very expensive"

          options={[
            <InvestOption 
              description={'Invest $5000'}
              cost={1000}
              onClick={() => this.addInvest(1000, 'schools')}
            />
          ]}        
        />

        {/* Home Modal */}
        <InvestModal 
          thing="Home" 
          visible={this.state.homesVisible}
          closeButton={() => this.setState({homesVisible: false})}
          benefits=
            {`Poor infrastructure can reduce economic productivity. 
              Investing in infrastructure can create many temporary jobs.
            `}
          drawbacks="Maintaining and building infrastructure is very expensive"

          options={[
            <InvestOption 
              description={'Invest $5000'}
              cost={1000}
              onClick={() => this.addInvest(1000, 'Home')}
            />
          ]}        
        />




        {/* Game Images */}
        {/* Cars */}
        <img 
          src={require("./Photos/car.png")} 
          id="car1"
          className='car'
          alt="Car"
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          width={'40px'}
          onClick={() => {
            this.setState({
              carsVisible: !this.state.carsVisible
            })
          }}
        /> 
        <img 
          src={require("./Photos/car_yellow.png")} 
          id="car2"
          className='car'
          alt="Car"
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          width={'40px'}
          onClick={() => {
            this.setState({
              carsVisible: !this.state.carsVisible
            })
          }}
        /> 
        <img 
          src={require("./Photos/car_black.png")} 
          id="car3"
          className='car'
          alt="Car"
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          width={'40px'}
          onClick={() => {
            this.setState({
              carsVisible: !this.state.carsVisible
            })
          }}
        /> 

        {/* Roads */}
        <img 
          src={require("./Photos/rotated_road.png")}
          alt="road"
          id='road1'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              roadsVisible: !this.state.roadsVisible
            })
          }}
        />
        <img 
          src={require("./Photos/road.png")}
          alt="road"
          id='road2'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              roadsVisible: !this.state.roadsVisible
            })
          }}
        />
        <img 
          src={require("./Photos/road.png")}
          alt="road"
          id='road3'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              roadsVisible: !this.state.roadsVisible
            })
          }}
        />
        <img 
          src={require("./Photos/rotated_road.png")}
          alt="road"
          id='road4'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              roadsVisible: !this.state.roadsVisible
            })
          }}
        />
        <img 
          src={require("./Photos/road.png")}
          alt="road"
          id='road5'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              roadsVisible: !this.state.roadsVisible
            })
          }}
        />

        {/* Water */}
        <img 
          src={require("./Photos/water.png")}
          alt="water"
          id='water1'
          width="100%"
          height="70px"
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              watersVisible: !this.state.waterVisible
            })
          }}
        />

        {/* <img 
          src={require("./Photos/river.png")}
          alt="river"
          onClick={() => {
            this.setState({
              waterVisible: !this.state.waterVisible
            })
          }}
        /> */}

        {/* Factories/Buildings */}
        

        {/* Trees */}
        <img 
          src={require("./Photos/trees.png")}
          alt="tree"
          id='tree1'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              treesVisible: !this.state.treesVisible
            })
          }}
        />

        {/* School */}
        <img 
          src={require("./Photos/school.png")}
          alt="school"
          id='school'
          width='100px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              schoolVisible: !this.state.schoolVisible
            })
          }}
        />

        {/* Bus */}
        <img 
          src={require("./Photos/bus.png")}
          alt="bus"
          id='bus'
          width='150px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              schoolVisible: !this.state.schoolVisible
            })
          }}
        />
        
        {/* Homes */}
        <img 
          src={require("./Photos/home.gif")}
          alt="home"
          id='home'
          width='100px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              homesVisible: !this.state.homesVisible
            })
          }}
        />

        {/* Trash */}
        <img 
          src={require("./Photos/trash.png")}
          alt="trash"
          id='trash'
          width='50px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              trashVisible: !this.state.trashVisible
            })
          }}
        />

      </div>
  
    );
  }
}
export default Game;