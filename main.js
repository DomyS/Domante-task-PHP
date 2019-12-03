class Article {
  constructor(title, published, site, adgroup, bids) {
    this.title = title;
    this.published = published;
    this.site = site;
    this.adgroup = adgroup;
    this.bids = bids;
  }
}

// Ui class: handle UI tasks
class UI {
  static displayArticles() {
    const article = Store.getArticles();

    const StoredArticles = [
      {
        title: "Russia switches on gas mega-pipeline to China",
        published: "2019-10-19",
        site: "CNN",
        adgroup: "CNN",
        bids: "25"
      },
      {
        title:
          "How a deadly mudslide inspired a teenager to protect his environment",
        published: "2019-11-19",
        site: "CNN",
        adgroup: "CNN",
        bids: "85"
      },
      {
        title: "10 most famous paintings in the world",
        published: "2019-12-02",
        site: "BBC",
        adgroup: "BBC",
        bids: "105"
      },
      {
        title: "Climate change health treat: Most countries not doing enough",
        published: "2019-11-22",
        site: "Sky News",
        adgroup: "Sky News",
        bids: "185"
      },
      {
        title: "McDonalds is entering the fried shicken sandwich wars",
        published: "2019-10-30",
        site: "Sky News",
        adgroup: "Sky News",
        bids: "1855"
      }
    ];

    const articles = StoredArticles;

    article.forEach(article => UI.addArticleToList(article));
    articles.forEach(article => UI.addArticleToList(article));
  }

  static addArticleToList(article) {
    const list = document.querySelector("#article-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${article.title}</td>
      <td>${article.published}</td>
      <td>${article.site}</td>
      <td>${article.adgroup}</td>
      <td>${article.bids}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</td>
      `;

    list.insertBefore(row, list.childNodes[0]); // inserts first on the table

    // Load more button

    var parent = document.querySelector("#article-list"),
      items = parent.querySelectorAll("tr"),
      loadMoreBtn = document.querySelector("#load-more-comments"),
      maxItems = 4,
      hiddenClass = "visually-hidden";

    [].forEach.call(items, function(item, idx) {
      if (idx > maxItems - 1) {
        item.classList.add(hiddenClass);
      }
    });

    loadMoreBtn.addEventListener("click", function() {
      [].forEach.call(document.querySelectorAll("." + hiddenClass), function(
        item,
        idx
      ) {
        if (idx < maxItems - 1) {
          item.classList.remove(hiddenClass);
        }

        if (document.querySelectorAll("." + hiddenClass).length === 0) {
          loadMoreBtn.style.display = "none";
        }
      });
    });

    // end load more
  }

  static deleteArticle(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#published").value = "";
    document.querySelector("#site").value = "";
    document.querySelector("#adgroup").value = "";
    document.querySelector("#bids").value = "";
  }
}

// Store Class: Handles Storage

class Store {
  static getArticles() {
    let articles;
    if (localStorage.getItem("articles") === null) {
      articles = [];
    } else {
      articles = JSON.parse(localStorage.getItem("articles"));
    }
    return articles;
  }

  static addArticle(article) {
    const articles = Store.getArticles();

    articles.push(article);

    localStorage.setItem("articles", JSON.stringify(articles));
  }

  static removeArticle(bids) {
    const articles = Store.getArticles();

    articles.forEach((article, index) => {
      if (article.bids === bids) {
        articles.splice(index, 1);
      }
    });

    localStorage.setItem("articles", JSON.stringify(articles));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayArticles);

// Event: add a book
document.querySelector("#article-form").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();

  //get form values
  const title = document.querySelector("#title").value;
  const published = document.querySelector("#published").value;
  const site = document.querySelector("#site").value;
  const adgroup = document.querySelector("#adgroup").value;
  const bids = document.querySelector("#bids").value;

  if (
    title === "" ||
    published === "" ||
    site === "" ||
    adgroup === "" ||
    bids === ""
  ) {
    modal.style.display = "block";
  } else {
    //Instatiate article
    const article = new Article(title, published, site, adgroup, bids);

    //Add article to UI
    UI.addArticleToList(article);

    //Add article to store
    Store.addArticle(article);

    // clear fields
    UI.clearFields();

    //submit and close
    modal.style.display = "none";
  }
});

//event: remove a article
document.querySelector("#article-list").addEventListener("click", e => {
  //Remove Article from ui
  UI.deleteArticle(e.target);

  //Remove Article from store

  Store.removeArticle(
    e.target.parentElement.previousElementSibling.textContent
  );
});

// Modal

//get modal element
var modal = document.getElementById("simpleModal");
// get open modal button
var modalBtn = document.getElementById("modalBtn");
//get close button
var closeBtn = document.getElementsByClassName("closeBtn")[0];

//listen for open click
modalBtn.addEventListener("click", openModal);
//Listen for close click
closeBtn.addEventListener("click", closeModal);
//listen for outside click
window.addEventListener("click", clickOutside);

//function open modal
function openModal() {
  modal.style.display = "block";
}

//function close modal
function closeModal() {
  modal.style.display = "none";
}

// function outside click
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// end Modal

// sorting start
var TableIDvalue = "Table1";

var TableLastSortedColumn = -1;
function SortTable() {
  var sortColumn = parseInt(arguments[0]);
  var type = arguments.length > 1 ? arguments[1] : "T";
  var dateformat = arguments.length > 2 ? arguments[2] : "";
  var table = document.getElementById(TableIDvalue);
  var tbody = table.getElementsByTagName("tbody")[0];
  var rows = tbody.getElementsByTagName("tr");
  var arrayOfRows = new Array();
  type = type.toUpperCase();
  dateformat = dateformat.toLowerCase();
  for (var i = 0, len = rows.length; i < len; i++) {
    arrayOfRows[i] = new Object();
    arrayOfRows[i].oldIndex = i;
    var celltext = rows[i]
      .getElementsByTagName("td")
      [sortColumn].innerHTML.replace(/<[^>]*>/g, "");
    if (type == "D") {
      arrayOfRows[i].value = GetDateSortingKey(dateformat, celltext);
    } else {
      var re = type == "N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
      arrayOfRows[i].value = celltext
        .replace(re, "")
        .substr(0, 25)
        .toLowerCase();
    }
  }
  if (sortColumn == TableLastSortedColumn) {
    arrayOfRows.reverse();
  } else {
    TableLastSortedColumn = sortColumn;
    switch (type) {
      case "N":
        arrayOfRows.sort(CompareRowOfNumbers);
        break;
      case "D":
        arrayOfRows.sort(CompareRowOfNumbers);
        break;
      default:
        arrayOfRows.sort(CompareRowOfText);
    }
  }
  var newTableBody = document.createElement("tbody");
  for (var i = 0, len = arrayOfRows.length; i < len; i++) {
    newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
  }
  table.replaceChild(newTableBody, tbody);
} // function SortTable()

function CompareRowOfText(a, b) {
  var aval = a.value;
  var bval = b.value;
  return aval == bval ? 0 : aval > bval ? 1 : -1;
} // function CompareRowOfText()

function CompareRowOfNumbers(a, b) {
  var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
  var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
  return aval == bval ? 0 : aval > bval ? 1 : -1;
} // function CompareRowOfNumbers()

function GetDateSortingKey(format, text) {
  if (format.length < 1) {
    return "";
  }
  format = format.toLowerCase();
  text = text.toLowerCase();
  text = text.replace(/^[^a-z0-9]*/, "");
  text = text.replace(/[^a-z0-9]*$/, "");
  if (text.length < 1) {
    return "";
  }
  text = text.replace(/[^a-z0-9]+/g, ",");
  var date = text.split(",");
  if (date.length < 3) {
    return "";
  }
  var d = 0,
    m = 0,
    y = 0;
  for (var i = 0; i < 3; i++) {
    var ts = format.substr(i, 1);
    if (ts == "d") {
      d = date[i];
    } else if (ts == "m") {
      m = date[i];
    } else if (ts == "y") {
      y = date[i];
    }
  }
  d = d.replace(/^0/, "");
  if (d < 10) {
    d = "0" + d;
  }
  if (/[a-z]/.test(m)) {
    m = m.substr(0, 3);
    switch (m) {
      case "jan":
        m = String(1);
        break;
      case "feb":
        m = String(2);
        break;
      case "mar":
        m = String(3);
        break;
      case "apr":
        m = String(4);
        break;
      case "may":
        m = String(5);
        break;
      case "jun":
        m = String(6);
        break;
      case "jul":
        m = String(7);
        break;
      case "aug":
        m = String(8);
        break;
      case "sep":
        m = String(9);
        break;
      case "oct":
        m = String(10);
        break;
      case "nov":
        m = String(11);
        break;
      case "dec":
        m = String(12);
        break;
      default:
        m = String(0);
    }
  }
  m = m.replace(/^0/, "");
  if (m < 10) {
    m = "0" + m;
  }
  y = parseInt(y);
  if (y < 100) {
    y = parseInt(y) + 2000;
  }
  return "" + String(y) + "" + String(m) + "" + String(d) + "";
} // function GetDateSortingKey()
