from flask import request, jsonify, g
from models import Saas, Account, Category
from index import app, db
from sqlalchemy.exc import IntegrityError
from auth import verify_token, generate_token, decode_token
from image import screenshot_from_user_url
import logging

@app.route('/api/saas_list', methods = ['GET'])
def all_saas():
	saas_list = Saas.query.all()

	if saas_list:
		return jsonify(data = [e.serialize() for e in saas_list])

@app.route('/api/category_list', methods = ['GET'])
def all_category():
	category_list = Category.query.all()

	if category_list:
		return jsonify(data = [e.serialize() for e in category_list])

@app.route('/api/saas_detail', methods = ['GET'])
def saas_detail():
	saas_id = request.args.get('saas_id')
	app.logger.info('the saas id %s', saas_id)
	saas_detail = Saas.query.filter_by(id = saas_id).first()

	if saas_detail:
		return jsonify(
			id = saas_detail.id, 
			title = saas_detail.title, 
			body = saas_detail.body, 
			votes = saas_detail.votes, 
			pub_date = saas_detail.pub_date
		)
	else:
		return jsonify(
			title = 'blank', 
			body = 'blank'
		)

@app.route('/api/create_saas', methods = ['POST'])
def create_saas():

	incoming = request.get_json()
	app.logger.info('incoming request %s', incoming)

	screenshot_from_user_url(request.get_json().get('url'))

	decoded = decode_token(request.get_json().get('token'))
	app.logger.info('decode %s', decoded)

	saas = Saas(
		title = request.get_json().get('title'), 
		body = request.get_json().get('body'), 
		category_id = request.get_json().get('category'), 
		author_id = decode_token(request.get_json().get('token')).get('id')
	)

	app.logger.info('create saas %s', saas)

	db.session.add(saas)
	db.session.commit()

	new_saas = Saas.query.filter_by(title = request.get_json().get('title')).first()

	app.logger.info('found new_saas %s', new_saas)

	if new_saas:
		return jsonify(
			title = new_saas.title, 
			body = new_saas.body, 
			votes = new_saas.votes, 
			pub_date = new_saas.pub_date
		)
	else:
		return jsonify(
			title = 'blank', 
			body = 'blank'
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
