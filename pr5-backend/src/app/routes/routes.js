module.exports = (app) => {
  const contacts = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Contact
  router.post("/", contacts.create);

  // Retrieve all contacts
  router.get("/", contacts.findAll);

  // Retrieve a single contact with id
  router.get("/:id", contacts.findOne);

  // Update a contact with id
  router.put("/:id", contacts.update);

  // Delete a contact with id
  router.delete("/:id", contacts.delete);

  // Create a new contacts
  router.delete("/", contacts.deleteAll);

  app.use("/api/contacts", router);
};
