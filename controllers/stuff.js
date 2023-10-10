const Thing = require("../models/Thing");

exports.creatThing = (req, res, next) => {
  delete req.body._id; //Ici, je supprime l'id qu'envoie le frontend.
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() =>
      res.status(201).json({ message: "Objet enregistré" })
    ) /*Même si on enregistre et que tout ce passe bien il faut envoyer une reponse à la frontend sinon il y aura expiration de la requête.*/
    .catch((error) => res.status(400).json(error)); //Equilavent de error : error
};

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => {
      res.status(200).json("Objet modifié");
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json("Objet supprimé"))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json);
};

exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
