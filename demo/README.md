# Summary
This is a demo LabKey ReactJS module. This module demonstrates how to render a React application/page within the LabKey framework 
including keeping the standard LabKey header and header menus.

<a name="gettingStarted"></a>
# Getting Started
Clone the tutorialModules repo into `/server/modules` directory and add the directory in `settings.gradle`.  You can then build this module 
using the [LabKey Gradle build]. This will install necessary packages, generate resources and put resources in correct LabKey module's directories.

There are three example React pages:
- http://localhost:8080/labkey/home/demo-helloWorld.view?
- http://localhost:8080/labkey/home/demo-queryModel.view?
- http://localhost:8080/labkey/home/demo-todoList.view?
- http://localhost:8080/labkey/home/demo-fileAttachmentForm.view?
- http://localhost:8080/labkey/home/demo-viewUploadedFiles.view?

Also, this module has an example of using the todoList page in a LabKey webpart.

One of the example React pages, `demo-queryModel.view`, has example usages of components from 
the LabKey React shared component library, `@labkey/components`. You can see more details and 
documentation regarding these shared components from the [Public API doc] page.

<a name="functionality"></a>
# Functionality Overview
The compilation and packaging of this module, including the NPM/webpack build, is done with the standard LabKey Gradle build. 
Gradle will use the Node and NPM version defined in `\<projectHome\>/gradle.properties` to run the `build` script defined in `package.json`.
Note: Gradle does not install Node/NPM globally. To run NPM commands outside of Gradle you will need to have Node/NPM installed 
locally. For more information on what `scripts` the LabKey Gradle build expects from the module `package.json` file, 
see the [Node.js Build Dependency] documentation page.

The webpack build will compile TypeScript and JavaScript files, as well as CSS and SCSS files, and bundle them independently 
for each module entry point. See the example at `demo/src/client/entryPoints.js`.  The bundled resources will be placed in the 
appropriate LabKey directory for web resources. See the example at `resources/web/gen/`.  The build will also 
generate the necessary LabKey HTML files, including the containing elements for the React apps, as well as the necessary 
`view.xml` files to make the bundled React and CSS files available to the appropriate LabKey React pages. 
See the example at `resources/views/`.

<a name="devServer"></a>
## Development Server
This module includes a webpack development server to help with rapid development.  The server is setup for Hot Module Replacement, 
to allow updates made to TypeScript, JavaScript, CSS and SCSS files to take effect on the page without manual builds or page refreshes. To 
start the server, from the command line in the demo module directory run `npm start`, then navigate to either of the appropriate development 
pages (note the "Dev" added to the end of the action name).
- http://localhost:8080/labkey/home/demo-helloWorldDev.view?
- http://localhost:8080/labkey/home/demo-queryModelDev.view?
- http://localhost:8080/labkey/home/demo-todoListDev.view?
- http://localhost:8080/labkey/home/demo-fileAttachmentFormDev.view?
- http://localhost:8080/labkey/home/demo-viewUploadedFilesDev.view?

<a name="jest"></a>
## Jest Tests
This module is setup to run Jest tests, including using Enzyme and Jest Snapshot testing. There is an example Jest test and 
Jest snapshot in the HelloWorld module.  Jest tests can be run using `npm run test` or they can be run directly in IntelliJ.

    
[LabKey Gradle build]: https://www.labkey.org/Documentation/wiki-page.view?name=gradleBuild   
[Node.js Build Dependency]: https://www.labkey.org/Documentation/wiki-page.view?name=nodejs 
[Public API doc]: https://github.com/LabKey/labkey-ui-components/blob/master/packages/components/docs/public.md 