from flask import request, jsonify, g
from models import Post
from index import app, db
import logging

@app.route('/')
def say_hello():
	return 'hello'

@app.route('/api/get_post/<post_id>', methods = ['GET'])
def get_post(post_id):
	post = Post.query.filter_by(id = post_id).first()

	if post:
		return jsonify(
			title = post.title, 
			content = post.content
		)
	else:
		return jsonify(
			title = 'blank', 
			content = 'blank'
		)

@app.route('/api/create_post', methods = ['POST'])
def create_post():
	# incoming = request.get_json()
	# app.logger.info('incoming request %s', incoming)
	post = Post(
		title = request.form.get('title'), 
		content = request.form.get('content')
	)
	db.session.add(post)

	db.session.commit()

	new_post = Post.query.filter_by(title = request.form.get('title')).first()

	return jsonify(
		title = new_post.title, 
		content = new_post.content
	)
