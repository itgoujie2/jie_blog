from flask import request, jsonify, g
from models import Star, Account
from index import app, db
from sqlalchemy.exc import IntegrityError
from auth import verify_token, generate_token, decode_token
import logging

@app.route('/api/star_list', methods = ['GET'])
def all_star():
	star_list = Star.query.all()

	if star_list:
		return jsonify(data = [e.serialize() for e in star_list])


@app.route('/api/star_detail', methods = ['GET'])
def star_detail():
	star_id = request.args.get('star_id')
	app.logger.info('the star id %s', star_id)
	star_detail = Star.query.filter_by(id = star_id).first()

	if star_detail:
		return jsonify(
			id = star_detail.id, 
			name = star_detail.name, 
			title = star_detail.title, 
			tagline = star_detail.tagline, 
			author_id = star_detail.author_id, 
			personal_url = star_detail.personal_url, 
			github_url = star_detail.github_url, 
			linkedin_url = star_detail.linkedin_url, 
			twitter_url = star_detail.twitter_url, 
			facebook_url = star_detail.facebook_url, 
			skill_1 = star_detail.skill_1, 
			skill_2 = star_detail.skill_2, 
			skill_3 = star_detail.skill_3, 
			rating_1 = star_detail.rating_1, 
			rating_2 = star_detail.rating_2, 
			rating_3 = star_detail.rating_3, 
			answer_1 = star_detail.answer_1, 
			answer_2 = star_detail.answer_2, 
			answer_3 = star_detail.answer_3, 
			answer_4 = star_detail.answer_4, 
			answer_5 = star_detail.answer_5
		)
	else:
		return jsonify(
			error = True
		)

@app.route('/api/create_star', methods = ['POST'])
def create_star():

	incoming = request.get_json()
	app.logger.info('incoming request %s', incoming)

	decoded = decode_token(request.get_json().get('token'))
	app.logger.info('decode %s', decoded)

	star = Star(
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

	app.logger.info('create star %s', star)

	db.session.add(star)
	db.session.commit()

	new_star = Star.query.filter_by(name = request.get_json().get('name')).first()

	app.logger.info('found new_star %s', new_star)

	if new_star:
		return jsonify(
			id = new_star.id, 
			name = new_star.name, 
			title = new_star.title, 
			tagline = new_star.tagline, 
			author_id = new_star.author_id, 
			personal_url = new_star.personal_url, 
			github_url = new_star.github_url, 
			linkedin_url = new_star.linkedin_url, 
			twitter_url = new_star.twitter_url, 
			facebook_url = new_star.facebook_url, 
			skill_1 = new_star.skill_1, 
			skill_2 = new_star.skill_2, 
			skill_3 = new_star.skill_3, 
			rating_1 = new_star.rating_1, 
			rating_2 = new_star.rating_2, 
			rating_3 = new_star.rating_3, 
			answer_1 = new_star.answer_1, 
			answer_2 = new_star.answer_2, 
			answer_3 = new_star.answer_3, 
			answer_4 = new_star.answer_4, 
			answer_5 = new_star.answer_5
		)
	else:
		return jsonify(
			error = True
		)

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
    app.logger.info('request in get_token %s', request)
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
