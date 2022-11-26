from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer




bot  = ChatBot('test')

conv = open('chats.txt', 'r').readlines()

bot.set_trainer(ListTrainer) 

bot.train(conv)

while True:
    request = input('you: ')
    response = bot.get_response(request)

    print('bot:', response)














