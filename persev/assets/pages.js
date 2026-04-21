(function () {
  function routePath(pathname) {
    if (pathname === "/persev") {
      return "/";
    }
    if (pathname.startsWith("/persev/")) {
      return pathname.slice(7);
    }
    return pathname;
  }

  function toPersev(path) {
    if (!path) {
      return "/persev/";
    }
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("tel:")) {
      return path;
    }
    if (path.startsWith("/persev/")) {
      return path;
    }
    if (path === "/") {
      return "/persev/";
    }
    if (path.startsWith("/")) {
      return "/persev" + path;
    }
    return "/persev/" + path;
  }

  function normalizeDomUrls() {
    document.querySelectorAll("a[href], link[href], img[src], script[src], source[src], form[action]").forEach(function (el) {
      if (el.hasAttribute("href")) {
        var href = el.getAttribute("href");
        if (href && href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/persev/")) {
          el.setAttribute("href", toPersev(href));
        }
      }
      if (el.hasAttribute("src")) {
        var src = el.getAttribute("src");
        if (src && src.startsWith("/") && !src.startsWith("//") && !src.startsWith("/persev/")) {
          el.setAttribute("src", toPersev(src));
        }
      }
      if (el.hasAttribute("action")) {
        var action = el.getAttribute("action");
        if (action && action.startsWith("/") && !action.startsWith("//") && !action.startsWith("/persev/")) {
          el.setAttribute("action", toPersev(action));
        }
      }
    });
  }

  function redirect(path) {
    window.location.replace(toPersev(path));
  }

  function handleSpecialRoutes() {
    var path = routePath(window.location.pathname);
    var qs = new URLSearchParams(window.location.search);
    var auth = window.PersevStaticAuth;

    if (!auth) {
      return;
    }

    if (path === "/logout") {
      auth.schoolLogout();
      redirect("/");
      return;
    }

    if (path === "/admin/logout") {
      auth.adminLogout();
      redirect("/admin/login/");
      return;
    }

    if (path === "/login" || path === "/school-login") {
      var user = qs.get("username");
      var pass = qs.get("password");
      if (user && pass) {
        var ok = auth.validateSchoolLogin(user, pass);
        if (ok) {
          redirect("/panel/");
          return;
        }
        redirect("/login/?error=invalid");
        return;
      }
    }

    var schoolProtected = [
      "/panel",
      "/stage-registration",
      "/sports-gaming-registration",
      "/classroom-registration"
    ];

    if (schoolProtected.indexOf(path) >= 0 && !auth.isSchoolLoggedIn()) {
      redirect("/login/?error=access");
      return;
    }

    if (path === "/admin/dashboard" && !auth.isAdminLoggedIn()) {
      redirect("/admin/login/");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      normalizeDomUrls();
      handleSpecialRoutes();
    });
  } else {
    normalizeDomUrls();
    handleSpecialRoutes();
  }
})();
