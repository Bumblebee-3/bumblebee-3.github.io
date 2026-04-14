const sideLinks = document.querySelectorAll(
    ".sidebar .side-menu li a:not(.logout)"
  );
  
  sideLinks.forEach((item) => {
    const li = item.parentElement;
    item.addEventListener("click", () => {
      sideLinks.forEach((i) => {
        i.parentElement.classList.remove("active");
      });
      li.classList.add("active");
    });
  });
  
  const menuBar = document.querySelector(".content nav .bx.bx-menu");
  const sideBar = document.querySelector(".sidebar");
  
  if (menuBar && sideBar) {
    menuBar.addEventListener("click", () => {
      sideBar.classList.toggle("close");
    });
  }
  
  const searchBtn = document.querySelector(
    ".content nav form .form-input button"
  );
  const searchBtnIcon = document.querySelector(
    ".content nav form .form-input button .bx"
  );
  const searchForm = document.querySelector(".content nav form");
  
  if (searchBtn && searchBtnIcon && searchForm) {
    searchBtn.addEventListener("click", function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
          searchBtnIcon.classList.replace("bx-search", "bx-x");
        } else {
          searchBtnIcon.classList.replace("bx-x", "bx-search");
        }
      }
    });
  }
  
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      if (sideBar) {
        sideBar.classList.add("close");
      }
    } else if (sideBar) {
      sideBar.classList.remove("close");
    }
    if (window.innerWidth > 576 && searchBtnIcon && searchForm) {
      searchBtnIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }
  });
  
  const toggler = document.getElementById("theme-toggle");
  
  if (toggler) {
    toggler.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });
  }