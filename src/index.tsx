import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//example class component
class App2 extends React.Component {

        state = {
            counter: 0
        }

    incrementCounter = () => {
        // this.setState({counter: this.state.counter + 1})
        this.setState( (prevState, props) => {
            return {
                counter: this.state.counter + 1
            }
        })
    }
    render() {
        console.log("render")
        return (
            <div>
                {this.state.counter}
                <button onClick={this.incrementCounter}>Add</button>
            </div>
        )
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
