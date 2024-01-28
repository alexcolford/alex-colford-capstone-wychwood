const usersData = require("../seed-data/users");
const productsData = require("../seed-data/products");
const commentsData = require("../seed-data/comments");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("products").del();
  await knex("comments").del();
  await knex("users").insert(usersData);
  await knex("products").insert(productsData);
  await knex("comments").insert(commentsData);
};
