from index import app, db, bcrypt
from datetime import datetime
import logging

class Saas(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	title = db.Column(db.String(255))
	body = db.Column(db.Text)
	pub_date = db.Column(db.DateTime)

	# author_id = db.Column(db.Integer, db.ForeignKey('account.id'))
	# author = db.relationship('Account', backref = db.backref('saas_list', lazy = 'dynamic'))

	def __init__(self, title, body, pub_date = None):
		self.title = title
		self.body = body
		# self.author = author
		if pub_date is None:
			pub_date = datetime.utcnow()

	def serialize(self):
		return{
			'id': self.id, 
			'title': self.title, 
			'body': self.body
		}

	def __repr__(self):
		return '<Saas %r>' % self.title

class Account(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	username = db.Column(db.String(50))
	password = db.Column(db.String(200))

	def __init__(self, username, password):
		self.username = username
		self.password = Account.hashed_password(password)

	def __repr__(self):
		return '<Account %r>' % self.username

	@staticmethod
	def hashed_password(password):
		return bcrypt.generate_password_hash(password)

	@staticmethod
	def get_account_with_username_and_password(username, password):
		account = Account.query.filter_by(username = username).first()
		app.logger.info('got account based on username %s', account)
		if account and bcrypt.check_password_hash(account.password, password):
			app.logger.info('token match, returned account password %s', password)
			return account
		else:
			return None