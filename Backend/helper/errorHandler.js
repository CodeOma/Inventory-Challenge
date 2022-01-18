const productValidation = req => {
  if (!req.body.name || !req.body.name.length)
    return new Error("Name is required");

  if (!req.body.description || !req.body.description.length)
    return new Error("Description is required");
};

const groupValidation = req => {
  if (!req.body.group || !req.body.group.length)
    return new Error("Group is required");
};

module.exports = { productValidation, groupValidation };
