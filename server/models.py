from index import app, db, bcrypt
from datetime import datetime
import logging

class Saas(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	title = db.Column(db.String(255))
	body = db.Column(db.Text)
	votes = db.Column(db.Integer)
	pub_date = db.Column(db.DateTime)

	author_id = db.Column(db.Integer, db.ForeignKey('account.id'))
	author = db.relationship('Account', backref = db.backref('saas_list', lazy = 'dynamic'))

	category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
	category = db.relationship('Category', backref = db.backref('saas_list', lazy = 'dynamic'))

	def __init__(self, title, body, category_id, author_id, votes = 0, pub_date = None):
		self.title = title
		self.body = body
		self.author_id = author_id
		self.votes = votes
		self.pub_date = pub_date
		self.category_id = category_id
		
		if pub_date is None:
			self.pub_date = datetime.utcnow()

	def serialize(self):
		return{
			'id': self.id, 
			'title': self.title, 
			'body': self.body, 
			'votes': self.votes, 
			'author_id': self.author_id, 
			'category_id': self.category_id, 
			'pub_date': self.pub_date
		}

	def __repr__(self):
		return '<Saas %r>' % self.title

class Category(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	name = db.Column(db.String(255))

	def __init__(self, name):
		self.name = name

	def serialize(self):
		return{
			'id': self.id, 
			'name': self.name
		}

	def __repr__(self):
		return 'Category: %r' % self.name

class Account(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	email = db.Column(db.String(200))
	password = db.Column(db.String(200))

	def __init__(self, email, password):
		self.email = email
		self.password = Account.hashed_password(password)

	def __repr__(self):
		return '<Account %r>' % self.email

	@staticmethod
	def hashed_password(password):
		return bcrypt.generate_password_hash(password)

	@staticmethod
	def get_account_with_email_and_password(email, password):
		account = Account.query.filter_by(email = email).first()
		if account and bcrypt.check_password_hash(account.password, password):
			app.logger.info('token match, returned account password %s', password)
			return account
		else:
			return None