import React, {ChangeEvent, ChangeEventHandler, Component, DOMAttributes, FormEvent, MouseEventHandler} from 'react';
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

type FetchedObject = {
    response: {
      docs: [];
    };
  };


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

    // format to handle multiple inputs
    updateAllInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(typeof(e));
        const value = e.target.value;
        this.setState({
            ...this.state, // spreading existing state into a new state value and merging it. 
            [e.target.name]: value,
        })
    }

    // updateInput = (e: any) => {
    //     console.log(typeof(e));
    //     this.setState(
    //         {input: e.target.value}
    //     )
    // }

    // updateStart = (e: any) => {
    //     console.log(typeof(e));
    //     this.setState(
    //         {start: e.target.value}
    //     )
    // }

    // updateEnd = (e: any) => {
    //     console.log(typeof(e));
    //     this.setState(
    //         {end: e.target.value}
    //     )
    // }

    updateResults = (e: FetchedObject) => { // Cannot find the type
        console.log(typeof(e)); // response does not exist on type object
        this.setState({
            results: e.response.docs
        })
        console.log(this.state.results);
    }

    nextPage = async (e: FormEvent<HTMLElement>) => {
        console.log(typeof(e));
        await this.setState({
            page: (this.state.page + 1)
        })
        console.log(this.state.page);

        this.fetchNYT(e);
    }
// MouseEvent<HTMLButtonElement, MouseEvent>
    previousPage = async (e: FormEvent<HTMLElement>) => {
        console.log(typeof(e));
        if (this.state.page > 0) {
            await this.setState({
                page: (this.state.page - 1)
            })
        } else {
            return
        }
        this.fetchNYT(e);
        console.log(this.state.page);
    }

    firstSearch = async (e: FormEvent<HTMLElement>) => {
        await this.setState ({
            page: 0
        })
        this.fetchNYT(e);
    }

    fetchNYT = (e: FormEvent<HTMLElement>) => {
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
                        <input onChange={this.updateAllInput} placeholder='baseball, or cars etc.' type='text' name='input' value={this.state.input} />
                    </p>
                    <p>
                        <label>Enter a start date: </label>
                        <input onChange={this.updateAllInput} type="date" name='start' id="start-date"  pattern="[0-9]{8}" />
                    </p>
                    <p>
                        <label>Enter an end date: </label>
                        <input onChange={this.updateAllInput} type="date" name='end' id="end-date" pattern="[0-9]{8}" />
                    </p>
                <button type='submit'>Search</button>
                </form>
                {this.state.page === 0 ? <div></div> : <button onClick={this.previousPage}>Previous Page</button> }
                {/* <button onClick={this.previousPage}>Previous Page</button> */}
                {this.state.page >= 0 && this.state.results.length > 0 ? <button onClick={this.nextPage}>Next Page</button> : <div></div>}
                {/* <button onClick={this.nextPage}>Next Page</button> */}
                {/* {this.state.page > 1 ? <p>Page: {pageThing}</p> : <div></div> } */}
                {/* <p>Page: {this.state.page}</p> */}
                <hr />
                {/* {this.state.results} */}
                {/* {this.state.results ? <Result result={this.state.results} : <h3>End of Results</h3> />} */}
                <Result result={this.state.results} />
            </div>
        )
    }
}