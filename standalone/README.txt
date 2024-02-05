A simple LabKey module to illustrate how to build outside the LabKey enlistment.

This simple module was created using LabKey's 'createModule' command and then 
removing a few things. It does not include any JSP or XSD files.  To include
these, you may need additional tasks for creating additional Jar files, or you
can use the LabKey Gradle plugins. The file `withPlugins_build.gradle` provides
an example of how to use the plugins with a standalone module.  

For more details see:
- https://www.labkey.org/Documentation/wiki-page.view?name=gradleModules
- https://github.com/LabKey/gradlePlugin - the repository for the plugins used to
  build LabKey
