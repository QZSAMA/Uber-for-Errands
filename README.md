# Uber For Errands Group Project

## Group Members
- David Hadaller
- Kelvin (Qizhi) Zhao
- Kahalia Stanberry
- Rafael Ninalaya

How to create [your own branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/) to this repo.

## Coordination Resources
- [Trello](https://trello.com/b/6OiOQY0V/uber-for-errands)
- [Trello app for Slack](http://help.trello.com/article/1049-slack-app)
- [Slack Page](https://ctp2017.slack.com/messages/G7B1NQ892)
- [Shared Drive Folder](https://drive.google.com/drive/folders/0B3yxyIBtyE7fLUJWel9aVnUxNGs?usp=sharing)

## Backend Starter Code
You can use this [backend starter code](backend-starter-code/) for your own projects that require a node/express/sequelize backend server. This code was forked from [CTP week-06-projects](https://github.com/CUNYTechPrep/week-06-projects)

# Technologies Used:

## Back End
  - Node.js running
    - [Javascript ES6](https://nodejs.org/api/)
    - [Express.js](http://expressjs.com/en/guide/routing.html) for RESTful API
    - [Sequilize.js](http://docs.sequelizejs.com/) for for SQL queries to 
  - Postgres
  
## Front End
  - [Babel](https://babeljs.io/docs/setup/#installation)-Compiled 
   - [Javascript ES6](https://babeljs.io/learn-es2015/)
   - [React.js](https://reactjs.org/docs/hello-world.html) Libraries (using JSX)
   - [Bootstrap](http://bootstrapdocs.com/v3.0.3/docs/components/) (using [Bootswatch](https://bootswatch.com/) for themeing, - [HTML5 and CSS3](https://www.w3schools.com/))
   
## Development Enviromnent 
  - Git Source Code Manager ([git-scm](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things), locally installed on computer)
  - [GitHub.com](https://help.github.com/) (website)
  - [Postman](https://www.getpostman.com/) for API Queries

# Gitflow Feature Branch Workflow 
  - Start with the master branch:
      git checkout master
      git fetch origin 
      git reset --hard origin/master

      This switches the repo to the master branch, pulls the latest commits and resets the repo's local copy of master to match the latest version.
  
  - Create a new branch:
      Use a separate branch for each feature or issue you work on. 
      
      git checkout -b new-feature

      This checks out a branch called new-feature based on master, and the -b flag tells Git to create the branch if it doesn’t already exist.

  - Update, add, commit, and push changes
      Work on the feature and make commits like you would any time you use Git

      git status
      git add <some-file>
      git commit

  - Push feature branch to remote
      It’s a good idea to push the feature branch up to the central repository. This serves as a convenient backup, when collaborating with other developers, this would give them access to view commits to the new branch.

      git push -u origin new-feature

      his command pushes new-feature to the central repository (origin), and the -u flag adds it as a remote tracking branch

  - Resolve feedback
      comment and aprove the pushed commits

  - Merge pull request
      Before you merge, you may have to resolve merge conflicts if others have made changes to the repo. When your pull request is approved and conflict-free, you can add your code to the master branch.
      