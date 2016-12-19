from flask import request, jsonify, g
from models import Story, Account, Question, Answer
from index import app, db
from sqlalchemy.exc import IntegrityError
from auth import verify_token, generate_token, decode_token
import logging
import json

@app.route('/api/story_list', methods = ['GET'])
def all_story():
	story_list = Story.query.filter_by(answered_question = True)

	if story_list:
		return jsonify(data = [e.serialize() for e in story_list])
	else:
		return jsonify()

@app.route('/api/question_list', methods = ['GET'])
def all_question():
	question_list = Question.query.all()

	if question_list:
		return jsonify(data = [e.serialize() for e in question_list])
	else:
		return jsonify()

def serialize_bundle(bundle):
	app.logger.info('check bundle %s', bundle)
	return{
		'question': bundle['question'], 
		'answer': bundle['answer']
	}


@app.route('/api/story_detail', methods = ['GET'])
def story_detail():
	story_id = request.args.get('story_id')
	app.logger.info('the story id %s', story_id)
	story_detail = Story.query.filter_by(id = story_id).first()

	# find all questions
	questions = Question.query.all()

	# find answers belong to this story
	answers = Answer.query.filter_by(story_id = story_id).all()

	# construct questions and corresponding answers together
	question_answer_bundle = []
	for question in questions:
		answer = [aser for aser in answers if aser.question_id == question.id][0] if [aser for aser in answers if aser.question_id == question.id] else None
		question_answer_bundle.append({
			'question': question.serialize(), 
			'answer': answer.serialize()
		})

	app.logger.info('bundle %s', question_answer_bundle)

	if story_detail:
		return jsonify(
			id = story_detail.id, 
			name = story_detail.name, 
			title = story_detail.title, 
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
			question_answer_bundle = question_answer_bundle
		)
	else:
		return jsonify()

@app.route('/api/create_story', methods = ['POST'])
def create_story():

	incoming = request.get_json()
	# first iteration, find out the story
	for item in incoming:
		for k, v in item.iteritems():
			if k == 'token':
				decoded = decode_token(v)
				account_id = decoded['id']
				# get the story based on account id
				story = Story.query.filter_by(author_id = account_id).first()
				# get the account
				account = Account.query.filter_by(id = account_id).first()
				story.answered_question = True
				account.create_story = True
				db.session.add(story)
				db.session.add(account)

	# second iteration, insert each answer
	for item in incoming:
		for k, v in item.iteritems():
			if k != 'token':
				app.logger.info('account_id before insert answer %s', account_id)
				answer = Answer(
					content = v, 
					question_id = k, 
					story_id = story.id, 
					account_id = account_id
				)
				db.session.add(answer)

	db.session.commit()

	app.logger.info('create story %s', story)

	db.session.add(story)
	db.session.commit()

	# if new_story:
	# 	return jsonify(
	# 		id = new_story.id, 
	# 		name = new_story.name, 
	# 		title = new_story.title, 
	# 		tagline = new_story.tagline, 
	# 		author_id = new_story.author_id, 
	# 		personal_url = new_story.personal_url, 
	# 		github_url = new_story.github_url, 
	# 		linkedin_url = new_story.linkedin_url, 
	# 		twitter_url = new_story.twitter_url, 
	# 		facebook_url = new_story.facebook_url, 
	# 		skill_1 = new_story.skill_1, 
	# 		skill_2 = new_story.skill_2, 
	# 		skill_3 = new_story.skill_3, 
	# 		rating_1 = new_story.rating_1, 
	# 		rating_2 = new_story.rating_2, 
	# 		rating_3 = new_story.rating_3, 
	# 		answer_1 = new_story.answer_1, 
	# 		answer_2 = new_story.answer_2, 
	# 		answer_3 = new_story.answer_3, 
	# 		answer_4 = new_story.answer_4, 
	# 		answer_5 = new_story.answer_5
	# 	)
	# else:
	# 	return jsonify()
	return jsonify()

@app.route('/api/create_account', methods = ['POST'])
def create_account():
	incoming = request.get_json()
	account = Account(
		email = incoming['email'], 
		password = incoming['password']
	)
	app.logger.info('incoming in create account %s', incoming)
	app.logger.info('create account %s', account)
	db.session.add(account)

	try:
		db.session.commit()
	except IntegrityError:
		return jsonify(message = 'Account with that email already exists'), 409

	new_account = Account.query.filter_by(email = incoming['email']).first()

	# now create the story
	story = Story(
		name = incoming['name'] if 'name' in incoming else '', 
		title = incoming['title'] if 'title' in incoming else '', 
		author_id = new_account.id, 
		skill_1 = incoming['skill_1'] if 'skill_1' in incoming else '', 
		skill_2 = incoming['skill_2'] if 'skill_2' in incoming else '', 
		skill_3 = incoming['skill_3'] if 'skill_3' in incoming else '', 
		rating_1 = incoming['rating_1'] if 'rating_1' in incoming else '', 
		rating_2 = incoming['rating_2'] if 'rating_2' in incoming else '', 
		rating_3 = incoming['rating_3'] if 'rating_3' in incoming else '', 
		personal_url = incoming['personal_url'] if 'personal_url' in incoming else '', 
		github_url = incoming['github_url'] if 'github_url' in incoming else '', 
		linkedin_url = incoming['linkedin_url'] if 'linkedin_url' in incoming else '', 
		twitter_url = incoming['twitter_url'] if 'twitter_url' in incoming else '', 
		facebook_url = incoming['facebook_url'] if 'facebook_url' in incoming else ''
	)

	db.session.add(story)
	db.session.commit()

	return jsonify(
		token = generate_token(new_account)
	)

@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    app.logger.info('request in get_token %s %s', incoming["email"], incoming["password"])
    account = Account.get_account_with_email_and_password(incoming["email"], incoming["password"])
    if account:
        return jsonify(token=generate_token(account), account = account.serialize())

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
