import React from 'react';
import axios from 'axios/index';
//import Cookies from 'universal-cookie';
//import {v4 as uuid} from 'uuid'; 
import Message from './Message';
//import QuickReplies from './QuickReplies';

//const cookies = new Cookies(); 

class Chatbot extends React.Component{
    messagesEnd; //React Refs
    inputFocus;
    constructor(props){
        super(props);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
       // this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
        this._handleInputKeyPress= this._handleInputKeyPress.bind(this);
        this.state={
            messages:[],
            showBot: true
        };

        // if(cookies.get('userID') === undefined){
        //     cookies.set('userID', uuid(),{path:'/'});
        // }
    }

    async df_text_query(queryText){
        let says = {
            speaks:'me',
            msg:{
                text:{
                    text:queryText
                }
            }
        };
        this.setState({messages:[...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text:queryText});

        for(let msg of res.data.fulfillmentMessages){
            //console.log(JSON.stringify(msg));
            says={
                speaks:'Khushi',
                msg: msg
            }
            this.setState({messages:[...this.state.messages, says]});
        }
    }

    async df_event_query(eventName){
        const res = await axios.post('/api/df_event_query', {event:eventName});
        for(let msg of res.data.fulfillmentMessages){
            let says={
                speaks:'Khushi',
                msg: msg
            }
            this.setState({messages:[...this.state.messages, says]});
        }
    }
    componentDidMount(){
        this.df_event_query('Welcome');
    }

    componentDidUpdate(){
        this.messagesEnd.scrollIntoView({behaviour:"smooth"});
        if(this.inputFocus){
            this.inputFocus.focus();
        }    
    }

    show(){
        this.setState({showBot:true})
    }

    hide(){
        this.setState({showBot:false})
    }



    // _handleQuickReplyPayload(payload,text){
    //     switch (payload) {
    //         case 'navigation_masterclass':
    //             this.df_event_query('MASTERCLASS');
    //             break;
    //         default:
    //             this.df_text_query(text);
    //     }
    // }

    
    renderOneMessages(message,i){
        if(message.msg && message.msg.text && message.msg.text.text){
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        } else if(message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.card){
            return (
            <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                <div style={{overflow:'hidden'}}>
                <div className="col s2">
                        <a className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                    </div>
                    <div style={{overflow:'auto', overflowY:'scroll'}}>
                        <div style={{height:300, width:message.msg.payload.fields.cards.listValue.length * 270}}>
                        {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                        </div>
                    </div>
                </div>
                </div>
            </div>
            )
        // }   else if (message.msg &&
        //         message.msg.payload &&
        //         message.msg.payload.fields &&
        //         message.msg.payload.fields.quick_replies
        //     ) {
        //         return <QuickReplies
        //             text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
        //             key={i} r
        //             replyClick={this._handleQuickReplyPayload}
        //             speaks={message.speaks}
        //             payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
        //     }
        }
    }
    renderMessages(stateMessage){
        if(stateMessage){
            return stateMessage.map((message, i)=>{
              return this.renderOneMessages(message,i);
            });
        }else {
            return null;
        }
    }
    
    _handleInputKeyPress(e){
        if(e.key === "Enter"){
            this.df_text_query(e.target.value);
            e.target.value='';
        }
    }

    render() {
        if(this.state.showBot){
            return(
                <div style={{minHeight:400, maxHeight:500, width:400, position:'absolute', bottom:0, right:0, border:'1px solid lightgrey'}}>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo">Chatbot</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a onClick={this.hide}>Close</a></li>
                        </ul>
                    </div>
                </nav>
                    <div id="chatbot" style={{minHeight:340, maxHeight:340, width:'100%', background:'white', overflow:'auto'}}>
                     
                    {this.renderMessages(this.state.messages)}
                    <div style={{float:'left', clear:"both"}} 
                    ref={(el) => {this.messagesEnd = el;}}></div>
                    </div>
                    <div className="col s12">
                        <input style={{margin:0, paddingLeft:'1%', paddingRight:'1%', width:'98%'}} placeholder="type s message" type="text" ref={(input)=>{this.inputFocus=input;}} onKeyPress={this._handleInputKeyPress}/>
                    </div>
                </div>
                )
        }else{
            return(
                <div style={{height:40, width:400, position:'absolute', bottom:0, right:0, border:'1px solid lightgrey'}}>
                <nav>     
                    <div className="nav-wrapper">
                        <a className="brand-logo">Messanger</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a onClick={this.show}>Show</a></li>
                        </ul>
                    </div>
                </nav>
                <div ref={(el) => {this.messagesEnd = el;}} style={{float:"left", clear:"both"}}></div>
                </div>
            )
        }
    }
}

export default Chatbot;