const db = require("../models");
const Contact = db.contacts;

// Create and Save a new Contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body.mobile) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
  });

  // Save Contact in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact.",
      });
    });
};

// Retrieve all contacts from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  Contact.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts.",
      });
    });
};

// Find a single contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with id=" + id });
    });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else res.send({ message: "Contact was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating contact with id=" + id,
      });
    });
};

// Delete a contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({
          message: "Contact was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id,
      });
    });
};

// Delete all contacts from the database.
exports.deleteAll = (req, res) => {
  Contact.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} contacts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts.",
      });
    });
};
