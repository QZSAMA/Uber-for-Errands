
# Associations

- In `User.hasOne(Project)` we say that `User` model is the **source** and `Project` is the **target**





## One-To-One Associations
- One-To-One associations are associations between **exactly two table rows** connected by a single foreign key.
- A `Player` is part of a `Team` and  the foreign key is in the `Player` table. 
```javascript
const Player = this.sequelize.define('player', {/* attributes */});
const Team  = this.sequelize.define('team', {/* attributes */});
Team.belongsTo(Player); // Will add a playerId attribute to Team to hold the primary key value for Player
```
- The default **foreign key** is made by combining the name of the target model and the primary key of the target model. Eg: a  `playerId` column would be placed in the `Player` table in the above example. The default case is `camelCase`
- you can use `as` to **change the name of the foreign key** Eg:


```javascript
Team.belongsTo(Player, {as: 'alternate'}); // Adds alternateId to user rather than playerId
```

In all cases the default foreign key can be overwritten with the `foreignKey` option. When the foreign key option is used, Sequelize will use it as-is (ie it won't append Id to the end of the foreign key):

```javascript
Team.belongsTo(Player, {foreignKey: 'alternate'}); // Adds alternate to user rather than alternateId or playerId
```



## Difference between HasOne and BelongsTo

- 1:1 relationship can be defined by either HasOne or BelongsTo. Each serves a different purpose. 
- `hasOne` inserts the association key in **target** model
- `belongsTo` inserts the association key in the **source** model.



### Example:
```javascript
const Player = this.sequelize.define('player', {/* attributes */})
const Coach  = this.sequelize.define('coach', {/* attributes */})
const Team  = this.sequelize.define('team', {/* attributes */});
```
- Suppose our `Player` model should have a `teamId` column. 
- Each  `Team` model should have a `coachId` column to store the `Coach` .
- Both scenarios requires different kind of 1:1 relation because foreign key relation is present on different models each time.
- **belongsTo()**: for `Player.belongsTo(Team)` think of a backward arrow from Team->Player because the team's id ends up as a column in the players table.
  -  When information about association is present in **source** model we can use `belongsTo`. In this case `Player` is suitable for `belongsTo` because it has `teamId`column.

```javascript
Player.belongsTo(Team)  // `teamId` will be added on Player which is the Source model
```

- **hasOne():** for `Coach.hasOne(Team)` think of a forward arrow from Coach->Team because the coache's id ends up as a column in the team's table.
  - When information about association is present in **target** model we can use `hasOne`. In this case `Coach` is suitable for `hasOne` because `Team` model store information about its `Coach` as `coachId` field.

```javascript
Coach.hasOne(Team)  // `coachId` will be added on Team which is the Target model
```