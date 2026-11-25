let openModule = false;
let edit = false;
let selectIndex = -1;
let deleteIndex = -1;
let view = "tableView";

let bookList = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "History",
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    category: "Other",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Other",
  },
];
let totalNum = bookList.length;
let fictionNum = bookList.filter((book) => book.category == "Fiction").length;
let ScienceNum = bookList.filter((book) => book.category == "Science").length;
let HistoryNum = bookList.filter((book) => book.category == "History").length;
let OtherNum = bookList.filter((book) => book.category == "Other").length;
const cardList = [
  { icon: "fa-solid fa-book", name: "Total Books", num: totalNum, id: "total" },
  {
    icon: "fa-solid fa-user-astronaut",
    name: "Fiction",
    num: fictionNum,
    id: "fiction",
  },
  {
    icon: "fa-solid fa-microscope",
    name: "Science",
    num: ScienceNum,
    id: "science",
  },
  {
    icon: "fa-solid fa-landmark",
    name: "History",
    num: HistoryNum,
    id: "history",
  },
  { icon: "fa-solid fa-ellipsis", name: "Other", num: OtherNum, id: "other" },
];

function handleOpenModule() {
  if (openModule) {
    document.getElementById("module").style.display = "flex";
  } else {
    document.getElementById("module").style.display = "none";
  }
}

function renderCard() {
  const Cards = document.getElementById("cards");
  Cards.innerHTML = cardList
    .map(
      (card) => `
        <div class="card" id="${card.id}">
          <div class="iconCard"><i class="${card.icon}"></i></div>
          <div class="info">
            <p>${card.name}</p>
            <h4>${card.num}</h4>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderView(view) {
  const viewContent = document.querySelector(".view");

  if (view == "tableView") {
    viewContent.innerHTML = `
      <div class="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="body-table">
            ${
              bookList.length > 0
                ? bookList
                    .map(
                      (book, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>
                        <div class="bookTitle">
                          <span>${book.title}</span>
                        </div>
                      </td>
                      <td>${book.author}</td>
                      <td><span class="category green">${book.category}</span></td>
                      <td>
                        <button class="edit" data-index="${index}">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="delete" data-index="${index}">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  `,
                    )
                    .join("")
                : `<tr>
                      <td class="emptyBook" colspan="5">
                        <i class="fa-solid fa-book-open icon"></i>
                        <h5>No books yet</h5>
                        <p style="margin : 10px">Your library is currently empty. Add your first book to get started</p>
                        <button class="addBtnEmpty" id="addBtnEmpty" ><i class="fa-solid fa-plus" ></i> Add New Book</button>
                      </td>
                   </tr>`
            }
          </tbody>
        </table>
      </div>
    `;
  } else if (view == "gridView") {
    viewContent.innerHTML = `
            ${
              bookList.length > 0
                ? `
                <div class="gridView">
                ${bookList
                  .map(
                    (book, index) =>
                      `
                    <div class="grid">
                      <div class="header_grid">
                          <div class="grid_num">
                              <h6>${index + 1}</h6>
                          </div>
                          <div class="wrap_Categroy">
                              <p>${book.category}</p>
                          </div>
                      </div>
                      <h3>${book.title}</h3>
                      <p>Author : ${book.author}</p>
                      <div class="grid_action_button">
                          <button class="edit" data-index="${index}"  style="display: flex; justify-content: center; align-items: center; gap : 5px" >
                            <i class="fa-solid fa-pen"></i>
                            <p>Edit</p>
                          </button>
                          <button class="delete"  data-index="${index}" style="display: flex; justify-content: center; align-items: center; gap : 5px">
                            <i class="fa-solid fa-trash"></i>
                            <p>Delete</p>
                          </button>
                      </div>
                    </div>
                    `,
                  )
                  .join("")}
                  </div>
                `
                : `
                      <div class="emptyBook" style="border : 2px dashed #d7d7d8; border-radius: 10px;">
                        <i class="fa-solid fa-book-open icon"></i>
                        <h5>No books yet</h5>
                        <p style="margin : 10px; font-size : 10px">Your library is currently empty. Add your first book to get started</p>
                        <button class="addBtnEmpty" id="addBtnEmpty" ><i class="fa-solid fa-plus" ></i> Add New Book</button>
                      </div>
                `
            }
    `;
  }
}
const buttonDisplay = document.querySelectorAll(".button");

buttonDisplay.forEach((button) => {
  button.addEventListener("click", () => {
    buttonDisplay.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    view = button.id;
    renderView(view);
  });
});

function updateCards() {
  cardList[0].num = bookList.length;
  cardList[1].num = bookList.filter(
    (book) => book.category == "Fiction",
  ).length;
  cardList[2].num = bookList.filter(
    (book) => book.category == "Science",
  ).length;
  cardList[3].num = bookList.filter(
    (book) => book.category == "History",
  ).length;
  cardList[4].num = bookList.filter((book) => book.category == "Other").length;

  renderCard();
}

renderCard();
renderView(view);
handleOpenModule();

function addFunc() {
  openModule = true;
  edit = false;
  selectIndex = -1;

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";

  document.getElementById("moduleIcon").className = "fa-solid fa-book-medical";
  document.getElementById("moduleName").textContent = "Add New Book";
  document.getElementById("moduleDescription").textContent =
    "Add a new book to your collection";
  document.getElementById("btnSubmitText").textContent = "Add Book";

  handleOpenModule();
}

// document.getElementById("addBtn").addEventListener("click", () => {
//   addFunc();
// });
// document.getElementById("addBtnEmpty").addEventListener("click",()=>{
//   addFunc();
// });
document.querySelector(".wrap").addEventListener("click", (event) => {
  if (event.target.closest("#addBtn") || event.target.closest("#addBtnEmpty")) {
    addFunc();
  }
});

document.querySelector(".view").addEventListener("click", (event) => {
  const editBtn = event.target.closest(".edit");
  const deleteBtn = event.target.closest(".delete");

  if (editBtn) {
    openModule = true;
    edit = true;

    selectIndex = Number(editBtn.dataset.index);
    let selectBook = bookList[selectIndex];

    document.getElementById("title").value = selectBook.title;
    document.getElementById("author").value = selectBook.author;
    document.getElementById("category").value = selectBook.category;

    document.getElementById("moduleIcon").className = "fa-solid fa-pen";
    document.getElementById("moduleName").textContent = "Edit Book";
    document.getElementById("moduleDescription").textContent =
      "Edit a book in your collection";
    document.getElementById("btnSubmitText").textContent = "Edit Book";

    handleOpenModule();
  }

  if (deleteBtn) {
    deleteIndex = Number(deleteBtn.dataset.index);
    let selectBook = bookList[deleteIndex];

    document.getElementById("deleteTitle").textContent = selectBook.title;
    document.getElementById("deleteAuthor").textContent = selectBook.author;
    document.getElementById("deleteCategory").textContent = selectBook.category;

    document.getElementById("deleteModule").style.display = "flex";
  }
});

document.getElementById("btnSubmit").addEventListener("click", () => {
  let Title = document.getElementById("title").value;
  let Author = document.getElementById("author").value;
  let Category = document.getElementById("category").value;

  if (!Title || !Author || !Category) {
    return;
  }
  if (edit) {
    bookList[selectIndex].title = document.getElementById("title").value;
    bookList[selectIndex].author = document.getElementById("author").value;
    bookList[selectIndex].category = document.getElementById("category").value;

    if (!Title || !Author || !Category) {
      return;
    }
    openModule = false;
    handleOpenModule();
    renderView(view);
    updateCards();
  } else {
    bookList.push({
      title: Title,
      author: Author,
      category: Category,
    });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("category").value = "";
    selectIndex = -1;
    openModule = false;
    handleOpenModule();
    renderView(view);
    updateCards();
  }
});

document.getElementById("btnClose").addEventListener("click", () => {
  openModule = false;
  handleOpenModule();
});

document.getElementById("btnCancel").addEventListener("click", () => {
  openModule = false;
  handleOpenModule();
});

function closeDeleteModule() {
  deleteIndex = -1;
  document.getElementById("deleteModule").style.display = "none";
}

document.getElementById("cancelDelete").addEventListener("click", () => {
  closeDeleteModule();
});
document.getElementById("closeDelete").addEventListener("click", () => {
  closeDeleteModule();
});

document.getElementById("confirmDelete").addEventListener("click", () => {
  bookList = bookList.filter((book, index) => index !== deleteIndex);
  renderView(view);
  updateCards();
  deleteIndex = -1;
  document.getElementById("deleteModule").style.display = "none";
});
