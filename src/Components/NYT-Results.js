import React from 'react';

const Result = (props) => {
    let result = props.result;
    console.log(result);
    return (
        <div>
            {result.map((result) => {
                return (
                <div>
                    <a href={result.web_url} target='blank'><h2>{result.headline.main}</h2></a>
                    {result.multimedia[0] ? <img src={`https://www.nytimes.com/${result.multimedia[0].url}`} alt='article img' /> : <p>No Image Found</p>}
                    <h4>Keywords:</h4>
                    <p>{result.keywords.map(words => {
                        return (
                            <div>
                                <li>{words.value}</li>
                            </div>
                        )
                    })}</p>
                <hr />
                </div>
            )}
            )
            }
        </div>
    )
}

export default Result;