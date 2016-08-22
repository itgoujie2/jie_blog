from flask import Flask
from os import environ

app = Flask(__name__)
app.config.from_object('config')
# override config 
if 'JIE_SETTING' in environ:
	app.config.from_envvar('JIE_SETTING')

@app.route('/')
def say_hello():
	return 'hello'