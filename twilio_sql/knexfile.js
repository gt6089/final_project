// Update with your config settings.

const sharedConfig = {
  client: 'pg',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      database: 'twilio_dev'
    }
  },

  staging: {
    ...sharedConfig,
    connection: {
      database: 'twilio_staging'
    }
  },

  production: {
    ...sharedConfig,
    connection: {
      database: 'twilio_production'
    }
  }

};
