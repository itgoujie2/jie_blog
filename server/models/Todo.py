from index import db

class Todo(db.model()):
	id = db.Column(db.Integer(), primary_key = True)
	title = db.Column(db.String(255))
	completed = db.Column(db.Boolean)

	def __init__(self, title, completed):
		self.title = title
		self.completed = completed

	