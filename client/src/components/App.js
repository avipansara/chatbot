import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Page from './webpage/Page';
import About from './webpage/About';
import Bot from './bot/bot';
import Chatbot from './chatbot/chatbot';



const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path="/" component={Page} />
                    <Route exact path="/" component={About} />
                    <Route exact path="/" component={Bot} />
                    <Chatbot/>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;