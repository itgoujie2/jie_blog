from index import db, bcrypt
from datetime import datetime

class Saas(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	title = db.Column(db.String(255))
	body = db.Column(db.Text)
	pub_date = db.Column(db.DateTime)

	author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	author = db.relationship('User', backref = db.backref('saas_list', lazy = 'dynamic'))

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

class User(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	username = db.Column(db.String(50))
	password = db.Column(db.String(50))

	def __init__(self, username, password):
		self.username = username
		self.password = password

	def __repr__(self):
		return '<User %r>' % self.username

	@staticmethod
    def hashed_password(password):
    	return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
    	user = User.query.filter_by(email=email).first()
		if user and bcrypt.check_password_hash(user.password, password):
			return user
		else:
			return None