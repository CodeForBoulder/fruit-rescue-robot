# Community Fruit Rescue

## ARCHIVE UPDATE

This project lost traction and will be archived. If you find this and wish to pick it up, please [join us](http://www.codeforboulder.org/) and consider [resubmitting a proposal](http://www.codeforboulder.org/project-proposals).

### Environment

Install global node modules to use from the command line:

```
npm install http-server -g
npm install watch -g
```

Install local nodal modules listed in `package.json`:

```
npm install
```

### Development


Build once from `src/index.js` and `src/fruit-rescue.css`:

```
npm run build
```

Or watch them for changes:

```
npm run watch
```

Start the web server on http://localhost:8081:

```
npm run start
```

### Deploy to Github Pages

```
$ git checkout gh-pages
$ git rebase master
$ git push
```
