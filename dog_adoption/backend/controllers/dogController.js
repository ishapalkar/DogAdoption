const Dog = require('../models/Dog');

exports.getDogs = async (req, res) => {
  const dogs = await Dog.find();
  res.json(dogs);
};

exports.addDog = async (req, res) => {
  try {
    const dog = await Dog.create(req.body);
    res.status(201).json(dog);
  } catch (err) {
    res.status(400).json({ errors: [err.message] });
  }
};

exports.updateDog = async (req, res) => {
  try {
    const updated = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ errors: [err.message] });
  }
};

exports.deleteDog = async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id);
    res.json({ message: "Dog deleted" });
  } catch (err) {
    res.status(400).json({ errors: [err.message] });
  }
};
