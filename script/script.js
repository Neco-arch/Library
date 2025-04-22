const AddBookDialog = document.querySelector(".AddBookDialog")
const AddBookButton = document.querySelector(".AddBook")
const ConfirmButton = document.getElementById("confirmBtn")
const DeleteButton = document.querySelector(".Delete_Button")
const CardSection = document.querySelector(".Card")
const CancelButton = document.querySelector(".Cancel_Button")

const myLibrary = [];

function Book(title,author,pages,read_status) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read_status = read_status;
}



function addBookToLibrary(e) {
    e.preventDefault();

    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const readStatusInput = document.getElementById("read-status");

    const title = titleInput.value;  
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read_status = readStatusInput.value;

    const NewBook = new Book(title, author, pages, read_status);
    myLibrary.push(NewBook);
    AddCardToLibrary(title, author, pages);

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readStatusInput.value = "Haven't Started";
}

function AddCardToLibrary(title, author, pages) {
  const div = document.createElement("div");
  div.className = "Card-Example";

  const BookName = document.createElement("p");
  BookName.id = "Book_Name";
  BookName.textContent = title;

  const Book_Author = document.createElement("p");
  Book_Author.id = "Book_Author";
  Book_Author.textContent = "Author"+ ":" + author;

  const Book_Pages = document.createElement("p");
  Book_Pages.id = "Book_Pages";
  Book_Pages.textContent = pages + " " +"Pages";

  const ReadStatus = document.createElement("div");
  ReadStatus.id = "Read-status";

  const ReadSelector = document.createElement("select");
  ReadSelector.className = "Read-Selector";

  const Selector1 = document.createElement("option");
  Selector1.textContent = "Haven't Started";
  Selector1.value = "Haven't Started";

  const Selector2 = document.createElement("option");
  Selector2.textContent = "In Progress";
  Selector2.value = "In Progress";

  const Selector3 = document.createElement("option");
  Selector3.textContent = "Read";
  Selector3.value = "Read";

  const DeleteButton = document.createElement("button")
  DeleteButton.textContent = "Delete"
  DeleteButton.className = "Delete_Button"

  ReadSelector.append(Selector1, Selector2, Selector3);
  div.appendChild(DeleteButton)
  ReadStatus.appendChild(ReadSelector);



  div.append(BookName, Book_Author, Book_Pages, ReadStatus,DeleteButton);

  CardSection.appendChild(div);
}

document.body.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("Delete_Button")) {
    const card = e.target.closest(".Card-Example");
    if (card) {
      const BookName = card.querySelector("#Book_Name").textContent;
      card.remove();
      for (let i = myLibrary.length - 1; i >= 0; i--) {
        if (myLibrary[i].title === BookName) {
          myLibrary.splice(i, 1);
        }
      }
    }
  }
});





AddBookButton.addEventListener("click", (event) => {
  event.preventDefault()
  AddBookDialog.showModal();
})


ConfirmButton.addEventListener("click", (event) => {
  try {
    addBookToLibrary(event);
    AddBookDialog.close();
  } catch (err) {
    console.error("Failed to add book:", err);
  }
});

CancelButton.addEventListener("click", () => {
  AddBookDialog.close()
})