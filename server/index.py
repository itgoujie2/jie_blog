from flask import Flask, request, jsonify, g
from os import environ
from config import BaseConfig
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)