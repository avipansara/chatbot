const {WebhookClient} = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const Wells = mongoose.model('wells');

module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function createChatbot(agent){
            console.log(agent);
            agent.add('This reply goes to dialog-flow!');
        }

        function listOfWells(agent){
            agent.add(`Sure here is the link: 
            https://drive.google.com/file/d/1SlsHnzMP4miYMEULVnB84sZ4_eGMGHPT/view`);
            
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('create chatbots', createChatbot);
        intentMap.set('list of wells', listOfWells);
        intentMap.set('Default Fallback Intent', fallback);


        agent.handleRequest(intentMap);
    });

} 