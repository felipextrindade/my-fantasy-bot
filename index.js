let Twit = require('twit');
let tracery = require('tracery-grammar');
let resources = require('./resources.js');

let bot = new Twit({
    consumer_key: process.env.TRINDADBOT_CONSUMER_KEY,
    consumer_secret: process.env.TRINDADBOT_CONSUMER_SECRET,
    access_token: process.env.TRINDADBOT_ACCESS_TOKEN,
    access_token_secret: process.env.TRINDADBOT_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

let grammar = tracery.createGrammar({
    'class': resources.classes,
    'anotherClass': resources.classes,
    'action': resources.actions,
    'location': resources.locations,
    'story': ['The #class# #action# #anotherClass.a# at #location#.'],
});

let generateStory = () => {
    grammar.addModifiers(tracery.baseEngModifiers);

    const status = grammar.flatten('#story#');

    bot.post('statuses/update', { status },
        (err, data, response) => {
            err ? console.log(err) : console.log(`${data.text} tweeted.`);
        }
    );
}

generateStory();

setInterval(() => {
    generateStory();
}, 900000);