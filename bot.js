const Discord = require('discord.js');
const fetch = require('node-fetch');

// Récupérez votre clé API DeepL dans votre compte DeepL
const deeplApiKey = "votre_clé_api_deepl";

// Initialisez le client Discord
const client = new Discord.Client();

// Événement appelé lorsque le bot est prêt
client.once('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// Événement appelé lorsque le bot reçoit un message
client.on('message', async message => {
    // Vérifiez que le message n'est pas envoyé par le bot lui-même pour éviter une boucle infinie
    if (message.author.bot) return;

    // Vérifiez que le message est dans une langue autre que l'anglais (par exemple le français)
    if (message.content !== '' && !message.content.startsWith('!') && /^[A-Za-z0-9]+$/.test(message.content)) {
        try {
            const response = await fetch('https://api-free.deepl.com/v2/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'auth_key': deeplApiKey,
                    'text': message.content,
                    'target_lang': 'EN'
                })
            });

            // Récupérez la traduction et envoyez-la dans le chat
            const data = await response.json();
            const translatedText = data.translations[0].text;
            message.channel.send(translatedText);

        } catch (error) {
            message.channel.send('La traduction a échoué');
        }
    }
});

// Lancez le bot
client.login('votre_token_discord');
