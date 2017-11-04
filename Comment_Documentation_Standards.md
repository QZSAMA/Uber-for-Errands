### Header Comments for All Files

File Header comments go at the top of each file. The comments only require 3 parameters. 
- `authors:` should be followed with your first name, the date in parantheses and the next author.
- `purpose:` should describe what the code contained in the document hopes to accomplish
- `notes:` notes are any "quirks" of the code you anticipate might be hard for others to understand or any general statements about the document you might make. 

```javascript
/*
authors: Kahalia (10/27/17), David (10/22/17)
purpose: This document defines model constitutes a "poll". A poll here is a single question with multiple options selectable by the user.
notes: For multiple questions, form a poll array
*/
```



### Header Comments for All Routers

Header Comments at the top of each router require 4 parameters:

- `author:`  write your name and the date when you wrote the router
- `purpose:` describe what the router ought to accomplish
- `middleware:`  if the router uses any 3rd party middleware (installed by npm) write which one. If you have defined your own middleware, specificy where (in what file) that middleware is located and what the name of that function and or object is.
- `input:` what the router accepts as input (either as a parameter or in the body of the router) 
- `output:` what the router changes
- `notes:` are optional

```javascript
/*
author: David Hadaller (10/22/17)
pupose: This route is used for adding a choice to a specific poll
middleware: No middleware used
input: poll id in route parameters, 
output: outputs to choice description, returns json of all the polls current choices and if there's an error, returns status 400
*/
router.post('/:id/choices', (req, res) => {
  models.Polls.findById(parseInt(req.params.id))
    .then(poll => {
      models.Choices.create({
        description: req.body.description,
        PollId: poll.id
      })
      .then((choice) => {
        res.json(choice);
      })
    })
    .catch(() => {
      console.log('error here')
      res.sendStatus(400);
    });
});
```



### Header Comments for All Models

Header comments for models require:


- `author:`  write your name and the date when you wrote the model
- `purpose:` describe what the model is supposed to represent in terms of features and or real-world objects.
- `attributes:` concisely list the attributes of the models with datatypes 
- `attribute requirements:` specify what `0`,`NULL`, and `empty` signify in the model
- `notes:` are optional

```javascript
/*
author: David Hadaller (10/22/17)
pupose: This model represents a choice which belongs to a poll
attributes: Choices (STRING)
attribute requirements: Not required
*/

module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define('Choices', {
    description: DataTypes.STRING
    // if there were attribute requirements they would look like this:
    /*
	allowNull: false,
    validate: {
    	notEmpty: true,
    }
    */
  });
  Choices.associate = (models) => {
    // models.Choices.hasMany(models.Votes);
    models.Choices.belongsTo(models.Polls);
  }

  return Choices;
};
```
