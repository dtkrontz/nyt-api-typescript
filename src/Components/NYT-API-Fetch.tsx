import React, {Component} from 'react';
import Result from './NYT-Results';

type Props = {
    
}

type State = {
    input: string,
    start?: string,
    end?: string,
    results: [],
    page: number,
}


export default class FetchNYT extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            input: '',
            start: '',
            end: '',
            results: [],
            page: 0
        }
    }

    updateInput = (e: any) => {
        console.log(typeof(e));
        this.setState(
            {input: e.target.value}
        )
    }

    updateStart = (e: any) => {
        console.log(typeof(e));
        this.setState(
            {start: e.target.value}
        )
    }

    updateEnd = (e: any) => {
        console.log(typeof(e));
        this.setState(
            {end: e.target.value}
        )
    }

    updateResults = (e: any) => {
        console.log(typeof(e));
        this.setState({
            results: e.response.docs
        })
        console.log(this.state.results);
    }

    nextPage = async (e: any) => {
        console.log(typeof(e));
        await this.setState({
            page: (this.state.page + 1)
        })
        console.log(this.state.page);

        this.fetchNYT(e);
    }

    previousPage = async (e: any) => {
        console.log(typeof(e));
        if (this.state.page > 1) {
            await this.setState({
                page: (this.state.page - 1)
            })
        } else {
            return
        }
        this.fetchNYT(e);
        console.log(this.state.page);
    }

    firstSearch = async (e: any) => {
        await this.setState ({
            page: 0
        })
        this.fetchNYT(e);
    }

    fetchNYT = (e: any) => {
        console.log(typeof(e));
        e.preventDefault();
        const baseURL: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        const key: string = 'IGF3UNuOBkodCCoDFe4TGQ2d4VQNBbvo';
        let pageNumber: number = this.state.page;
        let url: string = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${this.state.input}`;
        console.log(url);
        console.log(this.state.input);
        console.log(this.state.start);
        console.log(this.state.end);

        if(this.state.start !== '') {
            console.log(this.state.start)
          url += '&begin_date=' + this.state.start;
        };
        
        if(this.state.end !== '') {
            console.log(this.state.end)
          url += '&end_date=' + this.state.end;
        };

        fetch(url)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            console.log(json.response.docs);
            this.updateResults(json);
            // this.setState(
            //     {
            //         results: json.response.docs
            //     }
            // )
        })
    }

    render() {
        // let pageThing: number = this.state.page -1
        return(
            <div>
                <form onSubmit={this.firstSearch}>
                {/* <form onSubmit={this.firstSearch}> */}
                    <p>
                        <label>Enter a search term: </label>
                        <input onChange={((e) => this.updateInput(e))} type='text' value={this.state.input} />
                    </p>
                    <p>
                        <label>Enter a start date: </label>
                        <input onChange={((e) => this.updateStart(e))} type="date" id="start-date"  pattern="[0-9]{8}" />
                    </p>
                    <p>
                        <label>Enter an end date: </label>
                        <input onChange={((e) => this.updateEnd(e))} type="date" id="end-date" pattern="[0-9]{8}" />
                    </p>
                <button type='submit'>Search</button>
                </form>
                <button onClick={this.previousPage}>Previous Page</button>
                <button onClick={this.nextPage}>Next Page</button>
                {/* {this.state.page > 1 ? <p>Page: {pageThing}</p> : <div></div> } */}
                <p>Page: {this.state.page}</p>
                <hr />
                {/* {this.state.results} */}
                <Result result={this.state.results} />
            </div>
        )
    }
}