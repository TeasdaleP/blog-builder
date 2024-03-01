# BlogBuilder

<img src="https://github.com/TeasdaleP/blog-builder/assets/34505340/ead2ca32-d658-4796-9e85-3f2a3b04e70e" alt="drawing" width="200"/>

The blog builder has been created a professional development tool to showcase the development skills and knowledge. This application has been created using the NX monorepo pattern with all aspects of the application being delivered here. These include: 

| Application      |  Framework  | Comments                                            |
|:----------------:|:-----------:|:----------------------------------------------------|
| Automation       | Playwright  | Automated tests will be completed shortly           |
| Frontend         | Angular     | Latest Angular, standalone components and NGRX      |
| Backend          | Nest.js     | TypeORM for DB intergration and Passport for Auth   |
| Database         | Postgres    | None                                                |

## Development

To get starts, clone the repository to your local computer and run `npm install` from the root directory to install all dependencies. It might be useful to also download [Redux Devtool](https://chromewebstore.google.com/detail/redux-devtools) for your browser, [NX plugin](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) for VSCode and install the [NX CLI](https://nx.dev/getting-started/installation). 

### Frontend Development 

The development of the frontend is completed using the Angular CLI commands. Once the application is served locally, navigate to the http://localhost:4200/ and the application will reload automatically if you change any of the source files. Some useful commands include:

```
nx serve frontend-blogger
```

```
nx test frontend-blogger --code-coverage --watch
```

```
nx test frontend-blogger --test-file file-name.component.spec.ts
```

### E2E Automation Development 

The automated tests are completed using Playwright, specifically focused on Chrome, Firefox and Safari browsers by navigating to http://localhost:9323. Please serve the frontend and backend applications (API mocking will be completed separately) and the tests will run focus on authentication, the blog posts and routing guards. Some useful commands include: 

```
nx e2e frontend-blogger-e2e --debug
```

### Backend Development 

The development of the backend is completed using the Nest.JS CLI commands. Once the application is served locally, navigate to the http://localhost:3000/ and the Swagger Documentation will guide you to the correct endpoints. Some useful commands include:

```
nx serve backend-blogger
```

```
nx test backend-blogger 
```

Note: To get the application working locally, you will need to provide some environment files. Once you have created a `.env` file, please paste in the following keys into the file and provide the values relavent to your setup. 

```
APP_PORT=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_TABLE=
JWT_SECRET=
JWT_TIMEOUT=
```
## Database Strcuture

The database has been strcutured in such a way that will help link data effectively and the use of UUID for the primary column will help link smaller tables more effectively as seen: 

<img src="https://github.com/TeasdaleP/blog-builder/assets/34505340/50613697-0bee-4b02-9193-d868d3ee3853" alt="Database" width="500"/>

## Application

The application will consist of a user facing website, authentication for users to add comments to blogs. The otherside of the application will be user management which allows admins to adminstrate effectively, bloggers can add new post and users will be able to see comments they've made to posts. Some screenshots include: 

https://github.com/TeasdaleP/blog-builder/assets/34505340/b647e33a-32b4-4532-8de7-3dbfa5d17fab


https://github.com/TeasdaleP/blog-builder/assets/34505340/c87085d3-52ff-4165-ab7a-a2fc77b0d7e1


## Future Development 

The application is still a work in progress and the following items are the future development to mature the application. Including: 

- ~~Adding the ability to add comments when logged in / the ability for everyone to view comments.~~
- ~~Inclduing Build, Unit Testing & Linting results to the PR and main branch~~ 
- ~~Including automated tests using playwright~~
- Adding the ability to upload images when adding a blog post.
- Implementing the use of Docker to consolidate the deployment process.
- ~~Adding the ability to tag specific blog posts.~~
- ~~Adding the abiltiy to filter blog posts by tags, name or author.~~
