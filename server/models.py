from index import db

class Post(db.Model):
	id = db.Column(db.Integer(), primary_key = True)
	title = db.Column(db.String(255))
	content = db.Column(db.String(255))

	def __init__(self, title, content):
		self.title = title
		self.content = content

	