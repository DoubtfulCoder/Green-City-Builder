import React from 'react';
import './App.css';
import { roadsInvest, carsInvest, trashInvest, schoolsInvest, homesInvest, waterInvest, treesInvest, industryInvest } from './invest.js';

class IntroModal extends React.Component {
  render() {
    return(
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
        <p>Sustainability: {this.props.sustainability}%</p>
        <img 
          src={require("./Photos/stats.png")} 
          alt="Stats"
          width="20px"
        />
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
      <div 
        style={{visibility: this.props.visible ? 'visible' : 'hidden'}}
        className="yearChanges"
      >
        <button onClick={() => this.props.onClick()}>X</button> {/* Close button */}
        <h2>Yearly Losses</h2>
        <p>Total: ${this.props.losses}</p>
        <h3>Roads: ${this.props.roadLoss}</h3>
            <p>Lower losses by investing in roads</p>
        <h3>Schools: ${this.props.schoolLoss}</h3>
            <p>Lower losses by investing in schools</p>
        <h3>Trash: ${this.props.trashLoss}</h3>
            <p>Lower losses by investing in trash</p>
        <h3>Industry: ${this.props.industryLoss}</h3>
            <p>Lower losses by investing in industry</p>
        <h3>Natural Disasters: ${this.props.disasterLoss}</h3>
            <p>Lower losses by increasing your overall sustainability</p>
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

        {/* Benefits and drawbacks */}
        <div className="benefits-drawbacks-modal">
          <div className='bd-modal-sec'>
            <h2>Benefits</h2>
            <p>{this.props.benefits}</p>
          </div>
          <div className='bd-modal-sec'>
            <h2>Drawbacks</h2>
            <p>{this.props.drawbacks}</p>
          </div>
        </div>

        {/* Closes modal */}
        <button
          onClick={() => this.props.closeButton()}
          className="x-button"
        >X</button>
      </div>
    );
  }
}

function InvestOption(props) {
  return (
    <div className='invest-option'>
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
      yearChangesVisible: false,

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
      money: 200000 + Math.round(Math.random() * 200000), // random int [100k, 200k]
      unemployment: 4 + Math.round((Math.random() * 4) * 10) / 10, // random decimal [4, 8]
      approval: 45 + Math.round(Math.random() * 10), // random int [45%, 55%]
      sustainability: 15 + Math.round(Math.random() * 5), // random int [15%, 20%],

      // Previous saved states
      prevUnemp: 6, prevApproval: 50, prevSust: 17.5,

      // Specific sustainabilities used for economic loss
      carSust: 10, trashSust: 10, roadSust: 10, industrySust: 10, schoolSust: 20,
      
      // Investments
      investments: [],
      events: [],

      // Losses
      roadLosses: 0, schoolLosses: 0, trashLosses: 0, 
      industryLosses: 0, disasterLosses: 0, losses: 0,
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
    this.setState({
        yearChangesVisible: true,
    });
    this.yearlyEvents();
    let losses = this.calculateLosses();
    console.log("losses: " + losses);
    this.setState({
      year: this.state.year + 1,
      money: this.state.money 
          - Math.round(losses) 
          + Math.round(Math.random() * 150000) + 100000, // + [150k, 250k]
      unemployment: Math.max(
        this.state.unemployment + Math.round(Math.random() * 5 - 3), // [-3%, +2%]
        3 // no lower than 3%
      ),
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
    // Road losses - worse roads, more accidents [0, 80] thousand
    let roadLoss = (Math.random() * (100 - this.state.roadSust)) / 100 * 80000;
    console.log("road loss: " + roadLoss);
    // School losses - worse education, more loss [0, 40] thousand
    let schoolLoss = (Math.random() * (100 - this.state.schoolSust)) / 100 * 40000;
    // Trash losses - more waste, more disasters [0, 20] thousand
    let trashLoss = (Math.random() * (100 - this.state.trashSust)) / 100 * 20000;
    // Industry losses - worse industry, lower productivity [0, 80] thousand
    let industryLoss = (Math.random() * (100 - this.state.industrySust)) / 100 * 80000;
    // Natural disaster losses - lower overall sustainability, more disaster loss [0, 80] thousand
    let disasterLoss = (Math.random() * (100 - this.state.sustainability)) / 100 * 80000;
    
    let totalYearlyLosses = roadLoss + schoolLoss + trashLoss + industryLoss + disasterLoss;
    this.setState({
        roadLosses: roadLoss, schoolLosses: schoolLoss, trashLosses: trashLoss,
        industryLosses: industryLoss, disasterLosses: disasterLoss, losses: totalYearlyLosses
    });
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
      console.log('Event ' + i + event);

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
        console.log('event amount' + event.cost.amount);
        console.log('event gain' + event.moneyGain.amount);
        this.setState({
          money: this.state.money - event.cost.amount + event.moneyGain.amount,
          unemployment: this.state.unemployment - event.jobs.amount,
          sustainability: this.state.sustainability + event.sustainability.amount,
          // unemployment: this.adjustUnemployment(investment), 
        });
      }

      // Adjust specific sustainabilities for roads, cars, trash, and industry
      const type = event.type;
      if (type === 'roads') {
        console.log('roadsust' + this.state.roadSust); // TODO: check console logs working
        this.setState({roadSust: this.state.roadSust + event.sustainability.amount * 10})
      }
      else if (type === 'cars') {
        console.log('cars'); // TODO: check console logs working
        this.setState({carSust: this.state.carSust + event.sustainability.amount * 2})
      }
      else if (type === 'trash') {
        console.log('trash'); // TODO: check console logs working
        this.setState({trashSust: this.state.trashSust + event.sustainability.amount * 2})
      }
      else if (type === 'industry') {
        console.log('industry'); // TODO: check console logs working
        this.setState({industrySust: this.state.industrySust + event.sustainability.amount * 2})
      }

      // Adjust event parameters based on percChange
      let newEvent = event;
      newEvent.cost.amount *= (newEvent.cost.years > 0 ? newEvent.cost.percChange : 0);
      newEvent.cost.years -= 1;

      newEvent.jobs.amount *= (newEvent.jobs.years > 0 ? newEvent.jobs.percChange : 0);
      newEvent.jobs.years -= 1;
      
      newEvent.moneyGain.amount *= (newEvent.moneyGain.years > 0 ? newEvent.moneyGain.percChange : 0);
      newEvent.moneyGain.years -= 1;
      
      newEvent.sustainability.amount *= (newEvent.sustainability.years > 0 ? newEvent.sustainability.percChange : 0);
      newEvent.sustainability.years -= 1;
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
                  const tooHighYear = this.state.year >= 30;
                  const tooLowMoney = this.state.money < 0;
                  const tooLowApproval = this.state.approval < 35;
                  if (tooHighYear || tooLowMoney || tooLowApproval) {
                    // console.log('game over');
                    let status;
                    if (tooHighYear) {
                      status = 'Game Over! You ' + (this.state.sustainability > 80 ? 'won!' : 'lost.');
                    }
                    else if (tooLowMoney) {
                      status = 'Game Over! Your money dropped too low';
                    }
                    else if (tooLowApproval) {
                      status = 'Game Over! Your approval dropped too low.';
                    }
                    this.setState({
                      gameOverModalVisible: true,
                      introModalVisible: true,
                      statsModalVisibile: false,
                      yearChangesVisible: false,
                      introTitle: status,                      
                      introText: 'These were your stats:',
                      introCloseButVisible: false,
                    })
                  }//'Game Over! You ' + (this.state.sustainability > 80 ? 'won!' : 'lost.'),
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

        <YearChanges 
            visible={this.state.yearChangesVisible}
            losses={Math.round(this.state.losses)}
            roadLoss={Math.round(this.state.roadLosses)}
            schoolLoss={Math.round(this.state.schoolLosses)}
            trashLoss={Math.round(this.state.trashLosses)}
            industryLoss={Math.round(this.state.industryLosses)}
            disasterLoss={Math.round(this.state.disasterLosses)}
            
            onClick={() => this.setState({yearChangesVisible: false})}
        />

        {/* Roads Modal */}
        <InvestModal 
          thing="Roads" 
          visible={this.state.roadsVisible}
          closeButton={() => this.setState({roadsVisible: false})}
          benefits=
            {`Poor infrastructure can heavily reduce economic productivity. Investing in infrastructure can also create many temporary jobs.
            `}
          drawbacks="Maintaining and building infrastructure is very expensive."

          options={[
            <InvestOption 
              description={'Invest $50000'}
              onClick={() => {
                  this.addEvents(roadsInvest(50000, 5));
                  this.setState({roadsVisible: false}); // close modal
                }
              }
            />, 
            <InvestOption 
              description={'Invest $100000'}
              onClick={() => {
                  this.addEvents(roadsInvest(100000, 5));
                  this.setState({roadsVisible: false});
                }
              }
            />,
          ]}        
        />

        {/* Cars Modal */}
        <InvestModal 
          thing="Cars"
          visible={this.state.carsVisible} 
          closeButton={() => this.setState({carsVisible: false})}
          benefits="Cars are the #1 emmiter of CO_2 emissions and pollute the air. Help lower CO_2 emissions by increasing public transportation and increasing alternative fuel sources for cars."
          drawbacks="Many depend on the production of fuel sources for cars and may lose out on jobs if a switch to alternative sources is made." // TODO : add these to InvestModal

          options={[
            <InvestOption 
              description={'Invest $30000 per year (5 years)'}
              onClick={() => { 
                this.addEvents(
                  carsInvest(30000, 5)
                );
                this.setState({carsVisible: false}); // close modal
              }}
            />,
            <InvestOption 
              description={'Invest $90000 per year (5 years)'}
              onClick={() => { 
                this.addEvents(
                  carsInvest(90000, 5)
                );
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
          benefits="With landfills quickly filling up and a low rate of recycling, investing in waste is very important."
          drawbacks="Many can lose jobs by switching to recycling."
          
          options={[
            <InvestOption 
              description={'Invest $20000'}
              onClick={
                () => {
                  this.addEvents(trashInvest(20000, 5));
                  this.setState({trashVisible: false}); // close modal
                }
              }
            />,
            <InvestOption 
              description={'Invest $50000'}
              onClick={
                () => {
                  this.addEvents(trashInvest(50000, 5));
                  this.setState({trashVisible: false}); 
                }
              }
            />,
          ]}        
        />

        {/* Schools Modal */}
        <InvestModal 
          thing="Schools" 
          visible={this.state.schoolVisible}
          closeButton={() => this.setState({schoolVisible: false})}
          benefits=
            {'Investing in schools will create a more educated and trained workforce. An educated population can be more productive in a global economy.'}
          drawbacks="Investing in education is expensive."

          options={[
            <InvestOption 
              description={'Invest $30000'}
              onClick={() => {
                  this.addEvents(
                    schoolsInvest(30000, 5)
                  );
                  this.setState({schoolVisible: false}); // close modal
                }
              }
            />,
            <InvestOption 
              description={'Invest $50000'}
              onClick={() => {
                  this.addEvents(
                    schoolsInvest(50000, 5)
                  );
                  this.setState({schoolVisible: false}); // close modal
                }
              }
            />,
          ]}        
        />

        {/* Home Modal */}
        <InvestModal 
          thing="Homes" 
          visible={this.state.homesVisible}
          closeButton={() => this.setState({homesVisible: false})}
          benefits=
            {`Homes use many non-sustainable fuel sources. Help the environment by
              switching to non-sustainable fuel sources.
            `}
          drawbacks="Alternative fuel sources like solar and wind are still not 100% reliable and are very expensive."

          options={[
            <InvestOption 
              description={'Invest $40000'}
              onClick={() => {
                  this.addEvents(
                    homesInvest(40000, 5)
                  );
                  this.setState({homesVisible: false}); // close modal
                }
              }
            />,
            <InvestOption 
              description={'Invest $80000'}
              onClick={() => {
                  this.addEvents(
                    homesInvest(80000, 5)
                  );
                  this.setState({homesVisible: false}); // close modal
                }
              }
            />,
          ]}        
        />

        {/* Water Modal */}
        <InvestModal 
          thing="Water" 
          visible={this.state.waterVisible}
          closeButton={() => this.setState({waterVisible: false})}
          benefits=
            {`Unclean water can be very dangerous and causes many diseases.
            `}
          drawbacks="Cleaning water sources is difficult and very expensive."

          options={[
            <InvestOption 
              description={'Invest $40000'}
              onClick={() => {
                  this.addEvents(
                    waterInvest(40000, 5)
                  );
                  this.setState({waterVisible: false}); // close modal
                }
              }
            />,
            <InvestOption 
              description={'Invest $70000'}
              onClick={() => {
                  this.addEvents(
                    waterInvest(70000, 5)
                  );
                  this.setState({waterVisible: false}); // close modal
                }
              }
            />
          ]}        
        />

        {/* Trees Modal */}
        <InvestModal 
          thing="Trees" 
          visible={this.state.treesVisible}
          closeButton={() => this.setState({treesVisible: false})}
          benefits={'Promoting local greenery is good for the environment. Trees are our best friends in lowering CO2 emissions. '}
          drawbacks="By keeping trees, you lose potential space for homes and buildings, which can lower economic output. "

          options={[
            <InvestOption 
              description={'Invest $30000'}
              onClick={() => {
                  this.addEvents(
                    treesInvest(30000, 5)
                  );
                  this.setState({treesVisible: false}); // close modal
                }
              }
            />,
            <InvestOption 
              description={'Invest $50000'}
              onClick={() => {
                  this.addEvents(
                    treesInvest(50000, 5)
                  );
                  this.setState({treesVisible: false}); // close modal
                }
              }
            />
          ]}        
        />

        {/* Industry Modal */}
        <InvestModal 
          thing="Industry" 
          visible={this.state.industryVisible}
          closeButton={() => this.setState({industryVisible: false})}
          benefits=
            {`Industry is the #2 emmitter of CO_2 emissions. Maintaining buildings
              is crucial for a sustainable city. 
            `}
          drawbacks="Many can lose their jobs in a switch to alternative fuel sources."

          options={[
            <InvestOption 
              description={'Invest $50000'}
              onClick={() => {
                  this.addEvents(
                    industryInvest(50000, 5)
                  );
                  this.setState({industryVisible: false}); // close modal
                }
              }
            />,
            <InvestOption 
              description={'Invest $100000'}
              onClick={() => {
                  this.addEvents(
                    industryInvest(100000, 5)
                  );
                  this.setState({industryVisible: false}); // close modal
                }
              }
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
          src={require("./Photos/water2.jpg")}
          alt="water"
          id='water1'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              waterVisible: !this.state.waterVisible
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
        <img 
          src={require("./Photos/trees.png")}
          alt="tree"
          id='tree2'
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
          id='school1'
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
          id='bus1'
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
          src={require("./Photos/home.png")}
          alt="home"
          id='home1'
          width='100px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              homesVisible: !this.state.homesVisible
            })
          }}
        />
        <img 
          src={require("./Photos/home.png")}
          alt="home"
          id='home2'
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
          id='trash1'
          width='50px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              trashVisible: !this.state.trashVisible
            })
          }}
        />
        <img 
          src={require("./Photos/trash.png")}
          alt="trash"
          id='trash2'
          width='50px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              trashVisible: !this.state.trashVisible
            })
          }}
        />

        {/* Industry */}
        <img 
          src={require("./Photos/industry.png")}
          alt="industry"
          id='industry1'
          width='200px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              industryVisible: !this.state.industryVisible
            })
          }}
        />
        <img 
          src={require("./Photos/industry.png")}
          alt="industry"
          id='industry2'
          width='200px'
          style={{visibility: this.state.introModalVisible ? 'hidden' : 'visible'}}
          onClick={() => {
            this.setState({
              industryVisible: !this.state.industryVisible
            })
          }}
        />

      </div>
  
    );
  }
}
export default Game;