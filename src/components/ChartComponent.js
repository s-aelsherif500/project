import React, { Component } from 'react';
import Header from './HeaderComponent'
import ChartData from '../shared/ChartData';
import {Bar, Pie, Polar} from 'react-chartjs-2';
import {Row, Col, Container} from 'reactstrap';
import {Progress} from 'reactstrap'

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:this.props.results
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: false,
    legendPosition:'right',
    location:'Schools'
  }
  render(){
    const ChartData = {
        labels: [
            "praktijkschool Terra Nigra",
            "VO Bernard Lievegoed School",
            "VO Bonnefanten College",
            "VO Sint-Maartenscollege",
            "VO Porta Mosana College",
            "VO Stella Maris College",
            "OPDC St. Michael",
            "United World College",
            "MBO VISTA college",
            "MBO CITAVERDE College",
            "HBO Zuyd Hogeschool",
            "WO Maastricht University",
            "Business School Notenboom"],
        datasets:[
            {
            label:'Schools',
            data:[
                34, 4, 56, 4, 56, 5, 5, 70, 43, 5, 56, 34, 0
            ],
            backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                '#2471A3',
                '#F1C40F',
                '#C0392B',
                '#273746',
                '#0E6655',
                '#4A235A',
            ]
            }
        ]
        }
    const precentage = ChartData.datasets[0].data.reduce((a, b)=>a+b,0)*100/400;
    const fontSize = 25;
    return (
      <Container>
      <div className="chart">
        <Row>
          <Col md="10" sm="12">
            <Bar
              data={ChartData}
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
              {ChartData.datasets[0].data.reduce((a, b)=>a+b,0)}/400 : ({precentage}%)
            </div>
            <Progress color="success" value={precentage} />
          </Col>
        </Row>
          <Pie
            data={ChartData}
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
            data={ChartData}
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
class Charts extends Component {
    constructor(){
        super();
        this.state = {
          chartData:{}
        }
    
    }
    componentWillMount(){
        this.getChartData();
      }
    
    getChartData(){
    // Ajax calls here
    this.setState({
        chartData:ChartData
    });
    console.log(this.state.chartData)
    }
    render(){
        return(
            <>  
                <Header />
                <div className="container-paper">
                    <h1>Charts</h1>
                    <hr/>
                    <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
                </div>
                
            </>
        )
    }
}
export default Charts;