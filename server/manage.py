from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand

from app import app, db

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

@manager.command
def create_db():
	db.create_all()

if __name__ == '__main__':
	manager.run()