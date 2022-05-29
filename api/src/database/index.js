// We cannot use absolute imports here because of package.json db related scripts
const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const {
  connectionString,
  databaseUrl,
  databaseName,
} = require('../util/config');

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {},
});

const migrationConf = {
  migrations: {
    glob: 'src/database/migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async (setupConnection = true) => {
  if (setupConnection) {
    await sequelize.authenticate();
  }

  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });

  if (setupConnection) {
    await sequelize.close();
  }
};

const rollbackMigrations = async (setupConnection = true) => {
  if (setupConnection) {
    await sequelize.authenticate();
  }

  const migrator = new Umzug(migrationConf);
  await migrator.down();

  if (setupConnection) {
    await sequelize.close();
  }
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('database connected');
  } catch (err) {
    console.log('connecting database failed');
    return process.exit(1);
  }

  return null;
};

const createDatabase = async () => {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: databaseUrl,
  });

  console.log('Connecting to database "postgres"...');

  await client.connect();

  console.log(`Creating database ${databaseName}...`);
  client.query(`CREATE DATABASE ${databaseName}`, (err, res) => {
    if (err) {
      throw err;
    }

    console.log(`Created database ${databaseName}`, res);
    client.end();
  });
};

module.exports = {
  connectToDatabase,
  sequelize,
  runMigrations,
  rollbackMigrations,
  createDatabase,
};
