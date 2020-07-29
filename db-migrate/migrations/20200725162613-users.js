'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('User', {
    id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
      length: 10
    },
    name: {
      type: 'string',
      notNull: true,
      length: 15
    },
    email: {
      type: 'string',
      notNull: true,
      unique: true,
      length: 25,
    },
    password: {
      type: 'string',
      notNull: true,
      length: 100
    },
    created_at: { type: 'datetime', defaultValue: new String('CURRENT_TIMESTAMP') },
    updated_at: { type: 'datetime', defaultValue: new String('CURRENT_TIMESTAMP') },
  }, function(err){
    if (err) return callback(err);
    return callback()
  })
};

exports.down = function(db, callback) {
  db.dropTable('User', callback)
};

exports._meta = {
  "version": 1
};
