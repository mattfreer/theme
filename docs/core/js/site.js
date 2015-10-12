$(document).ready(function() {
  prepareViewSourceBtn();
  affixSideMenu();
  activateSideMenuLinks();
});

function prepareViewSourceBtn() {
  $("a[href='#']").click(function(e) {
    e.preventDefault();
  });

  var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; View Source &gt;</div>").click(function(){
    var html = $(this).parent().html();
    html = formatSource(html);
    $("#source-modal pre").text(html);
    $("#source-modal").modal();
  });

  $(".ls-component").hover(function(){
    $(this).append($button);
    $button.show();
  }, function(){
    $button.hide();
  });
}

function cleanSource(html) {
  return html
         .replace(/<pagehtml>[\S\s]*?<\/pagehtml>\n/gi, "")
         .replace(/<docshtml>/gi, "")
         .replace(/<\/docshtml>\n/gi, "");
}

function formatSource(html) {
  var lines = html.split(/\n/);

  lines.shift();
  lines.splice(-1, 1);

  var indentSize = lines[0].length - lines[0].trim().length,
      re = new RegExp(" {" + indentSize + "}");

  lines = lines.map(function(line){
    if (line.match(re)) {
      line = line.substring(indentSize);
    }

    return line;
  });

  lines = lines.join("\n");

  return cleanSource(lines);
}

function affixSideMenu() {
  var $sideBar = $('.ls-docs-sidebar');

  $sideBar.affix({
    offset: {
      top: function () {
        var offsetTop = $sideBar.offset().top;
        var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10);
        var navOuterHeight = $('.ls-docs-nav').height();

        return (this.top = offsetTop - navOuterHeight - sideBarMargin);
      },
      bottom: function () {
        return (this.bottom = $('.ls-docs-footer').outerHeight(true));
      }
    }
  });

  $('.ls-top').affix();
}

function activateSideMenuLinks() {
  $('.ls-docs-sidebar ul.nav li').click(function() {
    $('.ls-docs-sidebar ul.nav li').removeClass("active");
    $(this).addClass("active");
  });
  $('.back-to-top').click(function() {
    $('.ls-docs-sidebar ul.nav li').removeClass("active");
  });
}
