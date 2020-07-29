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

  //explicit mapping
  db.createTable( 'Profile',
  {
    id:
    {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
      length: 10
    },
    website: {
      type: 'text',
      notNull: false,
    },
    bio: {
      type: 'text',
      notNull: false,
    },
    user_id:
    {
      type: 'int',
      unsigned: true,
      length: 10,
      notNull: true,
      foreignKey: {
        name: 'profile_user_id_fk',
        table: 'User',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          user_id: 'id'
        }
      }
    },
    created_at: { type: 'datetime', defaultValue: new String('CURRENT_TIMESTAMP') },
    updated_at: { type: 'datetime', defaultValue: new String('CURRENT_TIMESTAMP') },
  }, callback );
};


exports.down = function(db, callback) {
  db.removeForeignKey('Profile', 'profile_user_id_fk', callback);
  db.dropTable('Profile', callback)

};

exports._meta = {
  "version": 1
};
