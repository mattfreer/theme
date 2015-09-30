'use strict';
var fs = require('fs');
var path = require('path');
var sourceDir = __dirname + "/../docs/";

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  }
  catch (err) {
    return false;
  }
}

function readFile(filePath, requiredExist) {
  var source = sourceDir + filePath;
  if (fileExists(source)) {
    return fs.readFileSync(source, "utf8");
  }
  if(requiredExist == true) {
    throw new Error("File required but not found: " + source);
  }
  return null;
}

function cleanTitle(title) {
  return title.replace(/-/g, " ");
}

module.exports = function(grunt) {
  grunt.registerTask("buildDocs", "Build the theme documentation", function() {
    var version = grunt.config.get("version");

    if (!version) {
      grunt.log.error("No version config set");
      return false;
    }

    var outputDir = __dirname + "/../public/";

    var buildScript = JSON.parse(readFile("build.json"), true);

    var headerTemplate = readFile("core/header.html", true);
    var footerTemplate = readFile("core/footer.html", true);
    var pageTitleTemplate = readFile("core/banner.html");

    var docsPageHeaderTemplate = readFile("core/docs-page-header.html");
    var docsPageFooterTemplate = readFile("core/docs-page-footer.html");
    var docsSectionHeaderTemplate = readFile("core/docs-section-header.html");
    var docsSectionFooterTemplate = readFile("core/docs-section-footer.html");
    var docsSectionBodyTemplate = readFile("core/docs-section-body.html");
    var docsSectionBlockHeaderTemplate = readFile("core/docs-section-block-header.html");
    var docsSectionBlockFooterTemplate = readFile("core/docs-section-block-footer.html");
    var docsSectionBlockTitleTemplate = readFile("core/docs-section-block-title.html");
    var docsSectionBlockExampleTemplate = readFile("core/docs-section-block-example.html");

    for(var pageName in buildScript) {
      var pageFileName, mainMenuContent, pageContent, pageOutput;

      pageFileName = pageName + ".html";
      mainMenuContent = "";

      //build main menu
      for(var menuPageName in buildScript) {
        var menuPageFileName, menuItemClass;

        menuPageFileName = menuPageName + ".html";
        menuItemClass = "text-capitalize";
        if (pageFileName == menuPageFileName) {
          menuItemClass += " active";
        }
        mainMenuContent += '<li class="' + menuItemClass + '"><a href="' + menuPageFileName + '">' + menuPageName + '</a></li>'
      }

      pageContent = buildScript[pageName];
      //set active menu item
      pageOutput = headerTemplate
                   .replace(/\$MainMenu\$/g, mainMenuContent);

      //generate page banner content
      var pageTitleData = readFile(pageName + "/banner.html")
                          .replace(/<title>/g, "<h1 class='text-capitalize'>")
                          .replace(/<\/title>/g, "</h1>");
      pageOutput += pageTitleTemplate
                    .replace(/\$Body\$/g, pageTitleData);

      pageOutput += docsPageHeaderTemplate;

      //loop through each content section for page
      for(var sectionName in pageContent) {
        var blockContents = pageContent[sectionName];
        var pageBlocksPath = pageName + "/" + sectionName + "/";

        //Build section h1 and optional introduction body content
        pageOutput += docsSectionHeaderTemplate
                      .replace(/\$Title\$/g, sectionName)
                      .replace(/\$DisplayTitle\$/g, cleanTitle(sectionName));

        if (fileExists(sourceDir + pageBlocksPath + "index.html")) {
          pageOutput += docsSectionBodyTemplate
                        .replace(/\$Body\$/g, readFile(pageBlocksPath + "index.html"));
        }

        for(var i = 0; i < blockContents.length; i++) {
          var pageBlockName = blockContents[i];
          var pageBlockDataBody = readFile(pageBlocksPath + pageBlockName + ".html")
                                  .replace(/<title>/g, "<h3 class='page-header text-capitalize'>")
                                  .replace(/<\/title>/g, "</h3>")
                                  .replace(/<example>/g, "<div class='ls-component'>")
                                  .replace(/<\/example>/g, "</div>");

          pageOutput += docsSectionBlockHeaderTemplate
                        .replace(/\$Title\$/g, sectionName + "-" + pageBlockName)
                        .replace(/\$DisplayTitle\$/g, cleanTitle(pageBlockName))
                        .replace(/\$Body\$/g, pageBlockDataBody);

          pageOutput += docsSectionBlockFooterTemplate
                        .replace(/\$FullTitle\$/g, sectionName + "-" + pageBlockName)
        }

        pageOutput += docsSectionFooterTemplate.replace(/\$Title\$/g, sectionName);
      }
      pageOutput += docsPageFooterTemplate;
      pageOutput += footerTemplate;

      fs.writeFile(outputDir + pageFileName, pageOutput, function(err) {});
    }
  });
};
