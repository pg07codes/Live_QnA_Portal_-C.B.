const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const db = new Sequelize('testdb', 'testuser', 'pass', {
    dialect: 'mysql'
})

const assignments = db.define('assignments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

const submissions = db.define('submissions', {
    ass_name: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull: false
    }
})


db.sync().then(() => "Database created")

exports = module.exports = {
    db,
    assignments,
    submissions
}