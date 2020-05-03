import React, { Component } from 'react';
import Header from './HeaderComponent'
import Chart from './Chart';
import ChartData from '../shared/ChartData';
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