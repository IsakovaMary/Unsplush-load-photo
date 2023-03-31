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

            // Добавление затемняющего фона
            const foo = document.querySelector('.wrapper-overlay');
            foo.classList.remove('form-focus');
            foo.classList.add('form-overlay')

            // Поднятие форма вверх
            const top = document.querySelector('.back');
            top.classList.add('search-area-top')

            const hideInput = document.querySelector('.form-search-begin');
            hideInput.classList.add('form-search-begin-hide')
            const visibleInput = document.querySelector('.form-search');
            visibleInput.classList.add('form-search-visible')

    }

    const handleClick = e => {
        const foo = document.querySelector('.wrapper-overlay');
        foo.classList.toggle('form-focus');
      };

    // const onKeyDown = e => {
    //     if(e.key === 'Enter') {
    //         axios.get(`https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=4UhQL7IdZ55_AGB-WhQQNVlxTwun4XNQI0lXn6L-gqM`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setResult(response.data.results);
    //             setisLoading(false);
    //         })
    //     }}

       

    return (
        <>
        <div className='wrapper'>
        <div className='back'>
            <div className='search-area'>
                
                <input type="search"  className='form-control form-search-begin' value={photo} onChange={(e) => {
                    setPhoto(e.target.value)
                }} />
                <input type="search"  className='form-control form-search' onClick={handleClick} value={photo} onChange={(e) => {
                    setPhoto(e.target.value)
                }} />
                <img src={imgSearch} className="imgSearch" alt="search"/>
                <button type='search' onClick={changePhoto} className='btn btn-search '>Искать</button>
                </div>
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
                        <div className='wrapper-overlay'>
                    </div>
                    </div> 
                
                }

        </div> 
        </>
    )
}

export default Main
