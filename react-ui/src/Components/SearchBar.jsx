import React from 'react';


export default class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            query: '',
            results: []
        }

        this.submitQuery = this.submitQuery.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    submitQuery(){
        fetch(`http://localhost:5000/parking-lots?location=${this.state.query}`)
        .then(res => res.json())
        .then( res => this.setState({
            results: res
        }))
    }

    handleInputChange(event){
        this.setState({
            query: event.target.value
        })
    }

    render(){
        return(
            <div className="search-container">
                <div className="search-bar">
                    <input type="text" value={this.state.query} onChange={this.handleInputChange}></input>
                    <button onClick={this.submitQuery}>Submit</button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Star Rating</th>
                            <th>Review Count</th>
                            <th>Link</th>
                            <th>Image</th>
                        </tr>
                        {this.state.results.map(result => {
                            return(
                                <tr>
                                    <td>{result.name}</td>
                                    <td>{result.address}</td>
                                    <td>{result.rating}</td>
                                    <td>{result.review_count}</td>
                                    <td><a href={result.url}>Link</a></td>
                                    <td><img className="result-image" src={result.image}></img></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
        )
    }
}