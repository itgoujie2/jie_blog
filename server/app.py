from flask import request, jsonify, g
from models import Saas
from index import app, db
from auth import verify_token
import logging

@app.route('/api/saas_list', methods = ['GET'])
def all_saas():
	saas_list = Saas.query.all()

	if saas_list:
		return jsonify(data = [e.serialize() for e in saas_list])

@app.route('/api/create_saas', methods = ['POST'])
def create_saas():

	incoming = request.get_json()
	app.logger.info('incoming request %s', incoming)

	saas = Saas(
		title = request.get_json().get('title'), 
		body = request.get_json().get('body')
	)

	db.session.add(saas)
	db.session.commit()

	new_saas = Saas.query.filter_by(title = request.get_json().get('title')).first()

	app.logger.info('found new_saas %s', new_saas)

	if new_saas:
		return jsonify(
			title = new_saas.title, 
			body = new_saas.body
		)
	else:
		return jsonify(
			title = 'blank', 
			body = 'blank'
		)	

@app.route('/api/is_token_valid', methods = ['POST'])
def is_token_valid():
	incoming = request.get_json()
	is_valid = verify_token(incoming['token'])

	if is_valid:
		return jsonify(token_is_valid = True)
	else:
		return jsonify(token_is_valid = False), 403
