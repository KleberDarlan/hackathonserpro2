/*-----------------------------------------------------------------------------
This Bot demonstrates how to create a simple menu for a bot. We've also added a
reloadAction() to the menus dialog which lets you return to the menu from any 
child dialog by simply saying "menu" or "back". 
# RUN THE BOT:
    Run the bot from the command line using "node app.js" and then type 
    "hello" to wake the bot up.
    
-----------------------------------------------------------------------------*/

var builder = require('./core/');

// Create chat bot
var connector = new builder.ChatConnector({
    appId: "a4e7d3de-f410-47ba-aa29-706e63fa39d9",
    appPassword: "r9HjGnxe7nvY2G6WVWK9geT"
});

// Setup bot and root waterfall
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Bem vindo ao portal de duvidas do micro empreendor. Aqui você vai tirar todas duvidas.");
        session.beginDialog('rootMenu');
    },
    function (session, results) {
        session.endConversation("Xau Xau :)))))");
    }
]);

// Add root menu dialog
bot.dialog('rootMenu', [
    function (session) {
        builder.Prompts.choice(session, "Primeiro você possui MEI:", 'Sim|Não|Quit');
    },
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('Sim');
                break;
            case 1:
                session.beginDialog('Não');
                break;
            default:
                session.endDialog();
                break;
        }
    },
    function (session) {
        // Reload menu
        session.replaceDialog('rootMenu');
    }
]).reloadAction('showMenu', null, { matches: /^(menu|back)/i });

// Flip a coin
bot.dialog('flipCoinDialog', [
    function (session, args) {
        builder.Prompts.choice(session, "Choose heads or tails.", "heads|tails", { listStyle: builder.ListStyle.none })
    },
    function (session, results) {
        var flip = Math.random() > 0.5 ? 'heads' : 'tails';
        if (flip == results.response.entity) {
            session.endDialog("It's %s. YOU WIN!", flip);
        } else {
            session.endDialog("Sorry... It was %s. you lost :(", flip);
        }
    }
]);

// Roll some dice
bot.dialog('rollDiceDialog', [
    function (session, args) {
        builder.Prompts.number(session, "How many dice should I roll?");
    },
    function (session, results) {
        if (results.response > 0) {
            var msg = "I rolled:";
            for (var i = 0; i < results.response; i++) {
                var roll = Math.floor(Math.random() * 6) + 1;
                msg += ' ' + roll.toString(); 
            }
            session.endDialog(msg);
        } else {
            session.endDialog("Ummm... Ok... I rolled air.");
        }
    }
]);

// Magic 8-Ball
bot.dialog('magicBallDialog', [
    function (session, args) {
        builder.Prompts.text(session, "What is your question?");
    },
    function (session, results) {
        // Use the SDK's built-in ability to pick a response at random.
        session.endDialog(magicAnswers);
    }
]);

var magicAnswers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];
