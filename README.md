## snippets-project

Snippets is a Django REST Framework and ReactJS powered code editing and sharing website.

Snippets uses a number of open source projects to work properly:

* ReactJS - for the frontend interface (including React Redux and React Router)
* Webpack - for bundling 
* Django - to create the models needed
* Django REST Framework - for the backend API
* Bulma - CSS framework used
* General project approach based on the open source bradtraversy/lead_manager_react_django github project.

### Quick demo adding a snippet

![](demo.gif)

### Local Installation and Development

pip and nodejs are used in this project.

Create and activate a python3 virtual environment and navigate to the project root directory. 

Install Django and other pip requirements:

```sh
pip install -r requirements.txt
```

Install ReactJS and other required node modules:

```sh
npm install
```
Run django migrate to create local database:

```sh
python snippetsmngr/manage.py migrate
```

Run django loaddata to load initial syntax data:

```sh
python snippetsmngr/manage.py loaddata syntax_list.json
```

In one terminal tab, run webpack

```sh
npm run dev
```

In another terminal tab, run django runserver to start local server:

```sh
python snippetsmngr/manage.py runserver
```

### Todos

- Implement better form validation, error handling, and error page rendering 

- Improve documentation

- Implement snippet expiration feature

- Implement user account management 


