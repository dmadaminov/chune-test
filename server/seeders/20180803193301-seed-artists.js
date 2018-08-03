//IMPORTANT: This is a seed for the initial 70 artists we want to follow,
// in future we want the seed to be the MusicBrainz database
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Artists', [
          { name:"Drake", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date() },
{ name: "Kanye West", disambiguation: " ", isFollowed: true , createdAt: new Date(), updatedAt: new Date() },
{ name:"Kendrick Lamar", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "J. Cole", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "A$AP Rocky", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()   },    
{ name: "Migos", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Lil Uzi Vert", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Tekashi 6ix9ine", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Lil Skies", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Future", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Gunna", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Juice WRLD", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Ski Mask the Slump God", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Post Malone", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "YBN Nahmir", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "YBN Cordae", disambiguation: " ", isFollowed: true , createdAt: new Date(), updatedAt: new Date() },
{ name: "Lil Xan", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Chance the Rapper", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Cardi B", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Lil Wayne", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Travis Scott", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Lil Yachty", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Young Thug", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Lil Pump", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Smokepurpp", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Jay-Z", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Trippie Redd", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Rich the Kid", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "21 Savage", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Kodak Black", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Kid Cudi", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "YG", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Mac Miller", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Louis the Child", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "070 Shake", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "A$AP Ferg", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Action Bronson", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Beyoncé", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Big Sean", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Billie Eilish", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Ty Dolla $ign", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Buddy", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Lauren Jauregui", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Childish Gambino", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Chris Brown", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Lil Dicky", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "J.I.D.", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Denzel Curry", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Diplo", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "DJ Khaled", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Pitbull", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Ozuna", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Nicky Jam", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "J. Balvin", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Flume", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Frank Ocean", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Jay Rock", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Jorja Smit", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Kaytranada", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Mura Masa", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Rex Orange County", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Offset", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Quavo", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Schoolboy Q", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Tyler the Creator", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "6LACK", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "2 Chainz", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Vince Staples", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Skrillex", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  },
{ name: "Justin Bieber", disambiguation: " ", isFollowed: true, createdAt: new Date(), updatedAt: new Date()  }])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
