import React from 'react';
import './App.css';

// function IntroModal(props) {
//   return (
//     <div style={{visibility: props.visib}}>
//       <h1>Hello and Welcome to Green City Builder!</h1>
//       <p class="intro-text">It is the year 2020. As the mayor of your city, you have until 2050 to help your city reach 80% sustainability. Currently, these are your city's stats:</p>
//       <img src="./Photos/money.gif" alt="money" width="40px"/>
//       <p>Money: $1000</p>
//       <img src="./Photos/thumb.png" alt="approval"/>
//       <p>Approval rating: </p>
//       <p>CO2 emissions: </p>

//       <button onClick={() => props.visib = 'hidden'}>
//         Continue
//       </button>
//     </div>
//   )
// }

class IntroModal extends React.Component {
  render() {
    return (
      <div 
        style={{visibility: this.props.visible ? 'visible' : 'hidden'}}
        className = 'starting-container'
      >
        <h1>Hello and Welcome to Green City Builder!</h1>
        <p className="intro-text">It is the year 2020. As the mayor of your city, you have until 2050 to help your city reach 80% sustainability. Currently, these are your city's stats:</p>
        <img 
          src={require("./Photos/money.gif")} 
          alt="Money"
          width="40px"
        />
        <p>Money: ${this.props.money}</p>
        <img 
          src={require("./Photos/thumb.png")} 
          alt="Approval"
        />
        <p>Approval rating: {this.props.approval}</p>
        <p>Annual CO2 emissions: {this.props.co2}</p>

        {/* Button for closing modal */}
        {this.props.closeButton}
      </div>
    )
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

        {/* Button for ending year */}
        {this.props.endYear}
      </div>
    )
  }

}

class InvestModal extends React.Component {
  render() {
    return (
      <div style={{visibility: this.props.visible ? 'visible' : 'hidden'}}>
        <h1>Invest in {this.props.thing}</h1>
        {this.props.options}
      </div>
    )
  }
}

function InvestOption(props) {
  return (
    <div>
      <p>Benefits: {props.benefits}</p>
      <p>Drawbacks: {props.drawbacks}</p>
      <button onClick={() => props.onClick()}>
        {props.description}
      </button>
    </div>
  )
}

 

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Modal visibilities
      introModalVisible: true,
      statsModalVisibile: false,
      
      // Invest visibilities
      carsVisible: false,

      // Game stats
      year: 1,
      money: 5000000 + Math.round(Math.random() * 2000000), // random int [5 million, 7 million]
      unemployment: 4 + Math.round(Math.random() * 4), // random int [4, 8]
      approval: 45 + Math.round(Math.random() * 10), // random int [45%, 55%]
      sustainability: 15 + Math.round(Math.random() * 5), // random int [15%, 20%]


      investments: [],
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
    this.yearlyInvest();
    this.setState({
      year: this.state.year + 1,
    });
  }

  /* Performs all investments for the year */
  yearlyInvest() {
    for (let i = this.state.investments.length - 1; i >= 0; i--) {
      let investment = this.state.investments[i]

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

  /* Adds an investment */
  addInvest(amount, thng, yrs) {
    this.setState({
      investments: [...this.state.investments, {cost: amount, thing: thng, years: yrs}]
    });
  }

  render() {
    return (
      <div className="App">
        <IntroModal 
          visible={this.state.introModalVisible}
          money={this.state.money}
          approval={this.state.approval}
          co2={this.state.co2}
          
          // Closes modal
          closeButton={
            <button onClick={() => this.closeIntroOpenStats()}>
            Continue
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

          /* Executes investments and moves to next year */
          endYear = {
            <button 
              className='endYear'
              onClick={() => this.nextYear()}
            >
            End Year
            </button>
          }
        />

        <InvestModal 
          thing="Cars"
          visible={this.state.carsVisible} 
          options={[
            <InvestOption 
              description={'Invest in cars for $1000'}
              benefits="Help save energy"
              drawbacks="Expensive"
              onClick={() => {
                  this.addInvest(1000, 'cars');
                  console.log('yo');
                }}
            />,
            <InvestOption 
              description={'Invest in cars for $5000'}
              benefits="Help save energy"
              drawbacks="Expensive"
              years={3}
              onClick={() => this.addInvest(5000, 'cars', 3)}
            />
          ]}        
        />
  
        <InvestModal 
          thing="Trash" 
          visible={this.state.trashVisible}
          options={[
            <InvestOption 
              description={'Invest in cars for $1000'}
              benefits="Help save energy"
              drawbacks="Expensive"
              years={3}
              onClick={
                () => {
                  this.addInvest(1000, 'cars', 3)
                  
                }
              }
            />
          ]}        
        />
  
        <InvestModal 
          thing="Roads" 
          visible={this.state.roadsVisible}
          options={[
            <InvestOption 
              description={'Invest in building better roads'}
              cost={1000}
              benefits=
                {`- Poor infrastructure can reduce economic productivity\n
                - Investing in infrastructure can create many temporary jobs
                `}
              drawbacks="Maintaining and building infrastructure is very expensive"
              onClick={() => this.addInvest(1000, 'cars')}
            />
          ]}        
        />
  
        <img 
          src={require("./Photos/car.png")} 
          alt="Car"
          onClick={() => {
            this.setState({
              carsVisible: !this.state.carsVisible
            })
          }}
        /> 
      </div>
  
    );
  }
}
export default Game;