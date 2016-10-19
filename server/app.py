from flask import request, jsonify, g
from models import Story, Account
from index import app, db
from sqlalchemy.exc import IntegrityError
from auth import verify_token, generate_token, decode_token
import logging

@app.route('/api/story_list', methods = ['GET'])
def all_story():
	story_list = Story.query.all()

	if story_list:
		return jsonify(data = [e.serialize() for e in story_list])
	else:
		return jsonify()


@app.route('/api/story_detail', methods = ['GET'])
def story_detail():
	story_id = request.args.get('story_id')
	app.logger.info('the story id %s', story_id)
	story_detail = Story.query.filter_by(id = story_id).first()

	if story_detail:
		return jsonify(
			id = story_detail.id, 
			name = story_detail.name, 
			title = story_detail.title, 
			tagline = story_detail.tagline, 
			author_id = story_detail.author_id, 
			personal_url = story_detail.personal_url, 
			github_url = story_detail.github_url, 
			linkedin_url = story_detail.linkedin_url, 
			twitter_url = story_detail.twitter_url, 
			facebook_url = story_detail.facebook_url, 
			skill_1 = story_detail.skill_1, 
			skill_2 = story_detail.skill_2, 
			skill_3 = story_detail.skill_3, 
			rating_1 = story_detail.rating_1, 
			rating_2 = story_detail.rating_2, 
			rating_3 = story_detail.rating_3, 
			answer_1 = story_detail.answer_1, 
			answer_2 = story_detail.answer_2, 
			answer_3 = story_detail.answer_3, 
			answer_4 = story_detail.answer_4, 
			answer_5 = story_detail.answer_5
		)
	else:
		return jsonify()

@app.route('/api/create_story', methods = ['POST'])
def create_story():

	incoming = request.get_json()
	app.logger.info('incoming request %s', incoming)

	decoded = decode_token(request.get_json().get('token'))
	app.logger.info('decode %s', decoded)

	story = Story(
		name = request.get_json().get('name'), 
		title = request.get_json().get('title'), 
		tagline = request.get_json().get('tagline'), 
		author_id = decode_token(request.get_json().get('token')).get('id'), 
		personal_url = request.get_json().get('personal_url'), 
		github_url = request.get_json().get('github_url'), 
		linkedin_url = request.get_json().get('linkedin_url'), 
		twitter_url = request.get_json().get('twitter_url'), 
		facebook_url = request.get_json().get('facebook_url'), 
		skill_1 = request.get_json().get('skill_1'), 
		skill_2 = request.get_json().get('skill_2'), 
		skill_3 = request.get_json().get('skill_3'), 
		rating_1 = request.get_json().get('rating_1'), 
		rating_2 = request.get_json().get('rating_2'), 
		rating_3 = request.get_json().get('rating_3'), 
		answer_1 = request.get_json().get('answer_1'), 
		answer_2 = request.get_json().get('answer_2'), 
		answer_3 = request.get_json().get('answer_3'), 
		answer_4 = request.get_json().get('answer_4'), 
		answer_5 = request.get_json().get('answer_5')
	)

	app.logger.info('create story %s', story)

	db.session.add(story)
	db.session.commit()

	new_story = Story.query.filter_by(name = request.get_json().get('name')).first()

	app.logger.info('found new_story %s', new_story)

	if new_story:
		return jsonify(
			id = new_story.id, 
			name = new_story.name, 
			title = new_story.title, 
			tagline = new_story.tagline, 
			author_id = new_story.author_id, 
			personal_url = new_story.personal_url, 
			github_url = new_story.github_url, 
			linkedin_url = new_story.linkedin_url, 
			twitter_url = new_story.twitter_url, 
			facebook_url = new_story.facebook_url, 
			skill_1 = new_story.skill_1, 
			skill_2 = new_story.skill_2, 
			skill_3 = new_story.skill_3, 
			rating_1 = new_story.rating_1, 
			rating_2 = new_story.rating_2, 
			rating_3 = new_story.rating_3, 
			answer_1 = new_story.answer_1, 
			answer_2 = new_story.answer_2, 
			answer_3 = new_story.answer_3, 
			answer_4 = new_story.answer_4, 
			answer_5 = new_story.answer_5
		)
	else:
		return jsonify()

@app.route('/api/create_account', methods = ['POST'])
def create_account():
	incoming = request.get_json()
	account = Account(
		email = incoming['email'], 
		password = incoming['password']
	)
	app.logger.info('create account %s', account)
	db.session.add(account)

	try:
		db.session.commit()
	except IntegrityError:
		return jsonify(message = 'Account with that email already exists'), 409

	new_account = Account.query.filter_by(email = incoming['email']).first()

	return jsonify(
		token = generate_token(new_account)
	)

@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    app.logger.info('request in get_token %s %s', incoming["email"], incoming["password"])
    account = Account.get_account_with_email_and_password(incoming["email"], incoming["password"])
    if account:
        return jsonify(token=generate_token(account))

    return jsonify(error=True), 403

@app.route('/api/is_token_valid', methods = ['POST'])
def is_token_valid():
	incoming = request.get_json()
	app.logger.info('token in is_token_valid %s', request)
	is_valid = verify_token(incoming['token'])

	if is_valid:
		return jsonify(token_is_valid = True)
	else:
		return jsonify(token_is_valid = False), 403
