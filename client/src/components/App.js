import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Page from './webpage/Page';
import Chatbot from './chatbot/chatbot';



const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path="/" component={Page} />

                    <Chatbot/>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;