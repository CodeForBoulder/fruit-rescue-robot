## Community Fruit Rescue

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
