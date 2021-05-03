import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator';
export default class ErrorBoundry extends Component {
     
    state ={
        error: false
    }

    componentDidCatch(){
        this.setState({error: true})
    }

    render(){
        const {error} = this.state;
        const info = error? <ErrorIndicator/> : this.props.children;
        return info;
    }
}
