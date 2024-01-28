## Extend the angular builder with Esbuild plugins (Experimental now)
This repo is an extend with [angular](https://www.npmjs.com/package/@angular-devkit/build-angular)https://www.npmjs.com/package/@angular-devkit/build-angular, provided the custom plugins.

### Current usage
> consider publish into npm
1. download and build
    1.  git pull <> dir-name
    2.  npm install
    3.  npm run build

2. config in angular project

    1.  add to the dev dependency: "@xkx/custom-esbuild": "file:**`../../../web-dev/custom_esbuild`**",  replace **`../../../web-dev/custom_esbuild`** into your last step **dir-name**
    2.  npm install (your angular project)
    3.  change the angular.json
  
      ```json
            ...
            "architect": {
              "build": {
                "builder": "@xkx/custom-esbuild:esbuild",
           ...
                "options": {
                    ...
                       "customEsbuildConfig": "./esbuild/esbuildConfig.js",  (path to your customer config, currently hard code for vite-serve )
                    ...
                  }
      ```
       

4. Run ng build

   


