export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })

    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint',
    });
  }
  
  export const down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  };
