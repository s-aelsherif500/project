import React, {Component} from 'react';
import {Bar, Pie, Polar} from 'react-chartjs-2';
import {Row, Col, Container} from 'reactstrap';
import {Progress} from 'reactstrap'

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: false,
    legendPosition:'right',
    location:'Schools'
  }
  render(){
    const precentage = this.state.chartData.datasets[0].data.reduce((a, b)=>a+b,0)*100/400;
    const fontSize = 25;
    return (
      <Container>
      <div className="chart">
        <Row>
          <Col md="10" sm="12">
            <Bar
              data={this.state.chartData}
              options={{
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Number of Participants'
                    }
                  }]},
                title:{
                  display:this.props.displayTitle,
                  text:'What is the school you are currently in?',
                  fontSize:fontSize
                },
                legend:{
                  display:this.props.displayLegend,
                  position:this.props.legendPosition
                }
              }}
            />
          </Col>
          <Col md="2" sm="12">
            <div className="text-left">
              Number of Participants
            </div>
            <div className="text-center">
              {this.state.chartData.datasets[0].data.reduce((a, b)=>a+b,0)}/400 : ({precentage}%)
            </div>
            <Progress color="success" value={precentage} />
          </Col>
        </Row>
          <Pie
            data={this.state.chartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'What is the school you are currently in?',
                fontSize:fontSize
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
          <Polar
            data={this.state.chartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'What is the school you are currently in?',
                fontSize:fontSize
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
      </div>
      </Container>
    )
  }
}

export default Chart;