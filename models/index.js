const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: true
    },
    content: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
    status: {
      type: Sequelize.ENUM('open', 'closed'),
      allowNull: true
    }
  });
  
  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Page.beforeCreate((title) => {
      let slug = title.replace(/\s+/g, '_').replace(/\W/g, '');
      return slug
  })
  
module.exports = {Page, User, db};





