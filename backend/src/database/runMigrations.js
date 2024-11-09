import { Sequelize } from 'sequelize'
import sequelize from './db.js'
import * as migration from './migrations/202408111635-create-user.js'

async function runMigrations() {
  try {
    await migration.up(sequelize.getQueryInterface(), Sequelize)
    console.log('Migração executada com sucesso!')
  } catch (err) {
    console.error('Erro ao executar a migração:', err)
  }
}

runMigrations().catch((err) => console.error('Erro ao executar migrations:', err))
