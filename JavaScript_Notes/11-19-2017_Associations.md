
# [Associations](http://docs.sequelizejs.com/manual/tutorial/associations.html)

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
Team.belongsTo(Player, {foreignKey: 'alternate'}); // Adds alternate to user rather than alternateId xor playerId
```



### Difference between hasOne() and belongsTo() (both one to one)

- 1:1 relationship can be defined by either HasOne or BelongsTo. Each serves a different purpose. 
- `hasOne()` inserts the association key in **target** model
- `belongsTo()` inserts the association key in the **source** model.



### Example:
```javascript
const Player = this.sequelize.define('player', {/* attributes */})
const Coach  = this.sequelize.define('coach', {/* attributes */})
const Team  = this.sequelize.define('team', {/* attributes */});
```
- xSuppose our `Player` model should have a `teamId` column. 
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



## hasMany() associations (one to many) 

- One-To-Many associations are connecting **one source** with **multiple targets**. The targets however are again connected to exactly one specific source.

```javascript
const User = sequelize.define('user', {/* ... */})
const Post = sequelize.define('project', {/* ... */})
Post.hasMany(User, {as: 'Workers'}) // the hasmany association. 
```

- This will add the attribute `postId` or to User. 
  - just like `hasOne()` it goes from source to target.
  - only now the target table, User, is allowed to have many rows with the same value occupying the  `postId` column.
- Instances of Post will get the **accessors** `getWorkers` and `setWorkers`. 
  - otherwise, since the foreign id is in the User table, Post won't have any way to access User.
- Sometimes you may need to associate records on different columns, you may use `sourceKey` option:

```javascript
const City = sequelize.define('city', { countryCode: Sequelize.STRING });
const Country = sequelize.define('country', { isoCode: Sequelize.STRING });
// Here we can connect countries and cities base on country code
Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});
```

- Line 4 allows you to use the `isoCode` column (which is in the Country table) instead of the countryId, the source's primary key.
- Line 5 allows you to use the `isoCode` column (still in the Country table) instead of countryId, the target's primary key.




## belongs-To-Many() associations (many to many)

- Belongs-To-Many associations are used to connect **many sources** with **multiple targets**. 
- ==Also **many targets** have connections to **multiple sources** (its a two way relationship)==
  - ==if it defines a two way relationship why does it need to be written twice?==
  - ==why dont they both do the same thing like hasOne and Belongs to?==

```javascript
Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});
```

- these associations will create a new model called UserProject
  - UserProject has foreign keys `projectId` and `userId`.
- Defining `through` is **required**. Sequelize would previously attempt to autogenerate names but that would not always lead to the most logical setups.
- The association will also add methods
  -  `getUsers`, `setUsers`, `addUser`,`addUsers` to `Project` ==what is the difference between set user and add user?==
  -  `getProjects`, `setProjects`, `addProject`, and `addProjects` to `User`
- Sometimes you may want to rename your models when using them in associations. Let's define users as workers and projects as tasks by using the alias (`as`) option. We will also manually define the foreign keys to use:
- ==I'm confused about using the "foreign key" and "as" at the same time== what are all these attributes too? The target or the source?
- `foreignKey:` allows you to **set source model key in the through relation**. 
- `otherKey:` allows you to **set target model key in the through relation**.
  - ==does this mean that `foreignKey:` and `otherKey:` have to be used with `through:` when it comes to `hasMany()` associations? Do I need a "join table"?==

```javascript
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' })
```

```javascript
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'})
```



Of course you can also define self references with belongsToMany:

```javascript
Person.belongsToMany(Person, { as: 'Children', through: 'PersonChildren' })
// This will create the table PersonChildren which stores the ids of the objects.
```

If you want additional attributes in your join table, you can define a model for the join table in sequelize, before you define the association, and then tell sequelize that it should use that model for joining, instead of creating a new one:

```javascript
const User = sequelize.define('user', {})
const Project = sequelize.define('project', {})
const UserProjects = sequelize.define('userProjects', {
    status: DataTypes.STRING
})

User.belongsToMany(Project, { through: UserProjects })
Project.belongsToMany(User, { through: UserProjects })
```

To add a new project to a user and set its status, you pass extra `options.through` to the setter, which contains the attributes for the join table

```javascript
user.addProject(project, { through: { status: 'started' }})
```

By default the code above will add projectId and userId to the UserProjects table, and *remove any previously defined primary key attribute* - the table will be uniquely identified by the combination of the keys of the two tables, and there is no reason to have other PK columns. To enforce a primary key on the `UserProjects` model you can add it manually.

```javascript
const UserProjects = sequelize.define('userProjects', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: DataTypes.STRING
})
```

With Belongs-To-Many you can query based on **through** relation and select specific attributes. For example using `findAll` with **through**

```javascript
User.findAll({
  include: [{
    model: Project,
    through: {
      attributes: ['createdAt', 'startedAt', 'finishedAt'],
      where: {completed: true}
    }
  }]
});
```