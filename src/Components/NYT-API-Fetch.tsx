import React, {Component} from 'react';

type Props = {

}

type State = {
    input: string
}

export default class FetchNYT extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            input: '',
        }
    }

    // componentDidMount = () => {
    //     this.fetchNYT();
    // }

    updateInput = (e: any) => {
        this.setState(
            {input: e.target.value}
        )
    }

    fetchNYT = (e: any) => {
        e.preventDefault();
        const baseURL: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        const key: string = 'IGF3UNuOBkodCCoDFe4TGQ2d4VQNBbvo';
        let url: string = baseURL + '?api-key=' + key; // + '&page=' + pageNumber + '&q=' + searchTerm.value
        console.log(url);

        fetch(url)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.fetchNYT}>
                <input onChange={((e) => this.updateInput(e))} type='text' value={this.state.input} />
                <button type='submit'>Search!</button>
                </form>
                <p>Test</p>
            </div>
        )
    }
}