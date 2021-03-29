import React from 'react';

const Result = (props) => {
    let result = props.result;
    console.log(result);
    return (
        <div>
            {result.map((result) => {
                return (
                <div>
                    <h2><a href={result.web_url} target='blank' style={{textDecoration: 'none', color: 'black'}} >{result.headline.main}</a></h2>
                    {result.multimedia[0] ? <img src={`https://www.nytimes.com/${result.multimedia[0].url}`} alt='article img' /> : <p>No Image Found</p>}
                    <h4>Keywords:</h4>
                    {result.keywords[0] ?
                    <p>{result.keywords.map(words => {
                        return (
                            <div>
                                <li>{words.value}</li>
                            </div>
                        )
                    })}</p> : <h5>No Keywords Found</h5>}
                    
                <hr />
                </div>
            )}
            )
            }
        </div>
    )
}

export default Result;