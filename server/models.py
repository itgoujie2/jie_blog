from index import app, db, bcrypt
from datetime import datetime
import logging

class Question(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	content = db.Column(db.Text)

	answers = db.relationship('Answer', backref='question', lazy='dynamic')

class Answer(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	content = db.Column(db.Text)

	question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
	story_id = db.Column(db.Integer, db.ForeignKey('story.id'))
	account_id = db.Column(db.Integer, db.ForeignKey('account.id'))


class Story(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	pub_date = db.Column(db.DateTime)

	author_id = db.Column(db.Integer, db.ForeignKey('account.id'))
	answers = db.relationship('Answer', backref='story', lazy='dynamic')

	# link section
	personal_url = db.Column(db.String(255))
	github_url = db.Column(db.String(255))
	linkedin_url = db.Column(db.String(255))
	twitter_url = db.Column(db.String(255))
	facebook_url = db.Column(db.String(255))
	# text section
	name = db.Column(db.String(255))
	title = db.Column(db.String(255))
	tagline = db.Column(db.String(255))
	skill_1 = db.Column(db.String(255))
	skill_2 = db.Column(db.String(255))
	skill_3 = db.Column(db.String(255))
	rating_1 = db.Column(db.Integer)
	rating_2 = db.Column(db.Integer)
	rating_3 = db.Column(db.Integer)
	answer_1 = db.Column(db.Text)
	answer_2 = db.Column(db.Text)
	answer_3 = db.Column(db.Text)
	answer_4 = db.Column(db.Text)
	answer_5 = db.Column(db.Text)

	def __init__(self, name, title, tagline, author_id, personal_url, github_url, linkedin_url, 
		twitter_url, facebook_url, skill_1, skill_2, 
		skill_3, rating_1, rating_2, rating_3, answer_1, answer_2, answer_3, 
		answer_4, answer_5):

		self.author_id = author_id
		self.personal_url = personal_url
		self.github_url = github_url
		self.linkedin_url = linkedin_url
		self.twitter_url = twitter_url
		self.facebook_url = facebook_url
		self.name = name
		self.title = title
		self.tagline = tagline
		self.skill_1 = skill_1
		self.skill_2 = skill_2
		self.skill_3 = skill_3
		self.rating_1 = rating_1
		self.rating_2 = rating_2
		self.rating_3 = rating_3
		self.answer_1 = answer_1
		self.answer_2 = answer_2
		self.answer_3 = answer_3
		self.answer_4 = answer_4
		self.answer_5 = answer_5
		self.pub_date = datetime.utcnow()

	def __repr__(self):
		return 'Story: %r' % self.name

	def serialize(self):
		return{
			'id': self.id, 
			'author_id': self.author_id, 
			'personal_url': self.personal_url, 
			'github_url': self.github_url, 
			'linkedin_url': self.linkedin_url, 
			'twitter_url': self.twitter_url, 
			'facebook_url': self.facebook_url, 
			'name': self.name, 
			'title': self.title, 
			'tagline': self.tagline, 
			'skill_1': self.skill_1, 
			'skill_2': self.skill_2, 
			'skill_3': self.skill_3, 
			'rating_1': self.rating_1, 
			'rating_2': self.rating_2, 
			'rating_3': self.rating_3, 
			'answer_1': self.answer_1, 
			'answer_2': self.answer_2, 
			'answer_3': self.answer_3, 
			'answer_4': self.answer_4, 
			'answer_5': self.answer_5, 
			'pub_date': self.pub_date
		}

class Account(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	email = db.Column(db.String(200))
	password = db.Column(db.String(200))

	stories = db.relationship('Story', backref='account', lazy='dynamic', uselist=False)
	answers = db.relationship('Answer', backref='account', lazy='dynamic')

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