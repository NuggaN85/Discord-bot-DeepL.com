import discord
import requests

# Récupérez votre clé API DeepL dans votre compte DeepL
deepl_api_key = "votre_clé_api_deepl"

# Initialisez le client Discord
client = discord.Client()

# Événement appelé lorsque le bot est prêt
@client.event
async def on_ready():
    print(f'Bot connecté en tant que {client.user}')

# Événement appelé lorsque le bot reçoit un message
@client.event
async def on_message(message):
    # Vérifiez que le message n'est pas envoyé par le bot lui-même pour éviter une boucle infinie
    if message.author == client.user:
        return

    # Vérifiez que le message est dans une langue autre que l'anglais (par exemple le français)
    if message.content != "" and message.content[0] != "!" and message.content.isascii():
        try:
            response = requests.post("https://api-free.deepl.com/v2/translate", {
                "auth_key": deepl_api_key,
                "text": message.content,
                "target_lang": "EN"
            })

            # Récupérez la traduction et envoyez-la dans le chat
            translated_text = response.json()["translations"][0]["text"]
            await message.channel.send(translated_text)

        except:
            await message.channel.send("La traduction a échoué")

# Lancez le bot
client.run('votre_token_discord')
