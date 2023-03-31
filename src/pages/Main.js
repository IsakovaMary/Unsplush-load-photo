import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../loader/Loader';
import imgSearch from './search.svg';

const Main = () =>  {

   
    
    const [photo, setPhoto] = useState("");
    const [result, setResult] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const changePhoto = () => {
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=4UhQL7IdZ55_AGB-WhQQNVlxTwun4XNQI0lXn6L-gqM`)
            .then((response) => {
                // console.log(response.data);
                setResult(response.data.results);
                setisLoading(false);
            })
    }

    const onKeyDown = e => {
        if(e.key === 'Enter') {
            axios.get(`https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=4UhQL7IdZ55_AGB-WhQQNVlxTwun4XNQI0lXn6L-gqM`)
            .then((response) => {
                console.log(response.data);
                setResult(response.data.results);
                setisLoading(false);
            })
        }}
        

    return (
        <>
        <div className='wrapper'>
            <div className='container search-area'>
                <input type="search"  className='form-control form-search' onKeyDown={onKeyDown} value={photo} onChange={(e) => {
                    setPhoto(e.target.value)
                }} />
                <img src={imgSearch} className="imgSearch" alt="search"/>
                <button type='search' onClick={changePhoto} className='btn btn-search '>Искать</button>
            </div>

                {isLoading? <Loader/> : 
                <div className="container">
                    <div className="row">
                        {result.map((value, index) => {
                            return (
                                <div className="img-result col-lg-2 col-md-3 col-xs-4" key={index}>
                                        <img className="img-fluid wrapper" src={value.urls.small} alt='' />
                                </div>
                            )
                        })}
                    </div>

                </div> }

        </div> 
        </>
    )
}

export default Main