const cardsContainer = document.getElementById("cards-container");
const myLibrary = [];
const bookForm = document.querySelector("#add-book");

const bookPrototype = {
  toggleRead(card) {
    readText = card.querySelector(".readState");
    if (this.readState === "Didn't read.") {
      this.readState = "I've read.";
      readText.textContent = this.readState;
      card.classList.remove("redBorder");
      card.classList.add("greenBorder");
    } else {
      this.readState = "Didn't read.";
      readText.textContent = this.readState;
      card.classList.remove("greenBorder");
      card.classList.add("redBorder");
    }
  },
};

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(bookForm);
  const formObject = Object.fromEntries(formData);
  addBookToLibrary(
    formObject.bookName,
    formObject.authorName,
    formObject.releaseYear,
    formObject.pageNumber,
    formObject.readState
  );
});

function Book(bookName, authorName, releaseYear, pageNumber, readState) {
  this.id = crypto.randomUUID();
  this.bookName = bookName;
  this.authorName = authorName;
  this.releaseYear = releaseYear;
  this.pageNumber = pageNumber;
  this.readState = readState;
}

function addBookToLibrary(
  bookName,
  authorName,
  releaseYear,
  pageNumber,
  readState
) {
  let read;
  if (readState) {
    read = "I've read.";
  } else {
    read = "Didn't read.";
  }
  let bookObject = new Book(
    bookName,
    authorName,
    releaseYear,
    pageNumber,
    read
  );
  Object.setPrototypeOf(bookObject, bookPrototype);
  futureUpdateGrid(bookObject);
  myLibrary.push(bookObject);
}

function futureUpdateGrid(bookObject) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = bookObject.id;
  for (key in bookObject) {
    if (key !== "id" && key !== "toggleRead") {
      const cardText = document.createElement("div");
      cardText.classList.add(key);
      cardText.textContent = bookObject[key];
      card.appendChild(cardText);
    }
  }
  if (bookObject.readState === "I've read.") {
    card.classList.add("greenBorder");
  } else {
    card.classList.add("redBorder");
  }
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("svgButtonsContainer");
  buttonsDiv.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="removeBook" id="removeBook" > <title>Remove book</title> <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /> </svg> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="toggleRead" id="toggleRead" > <title>Toggle read</title> <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /> </svg>';

  card.appendChild(buttonsDiv);
  cardsContainer.appendChild(card);
  setRemoveBookInteraction(card);
  setToggleReadInteraction(card);
}

function setRemoveBookInteraction(card) {
  const removeButton = card.querySelector("#removeBook");
  removeButton.addEventListener("click", (e) => {
    for (let index in myLibrary) {
      if (myLibrary[index].id === card.id) {
        myLibrary.splice(index, 1);
        break;
      }
    }
    cardsContainer.removeChild(card);
  });
}

function setToggleReadInteraction(card) {
  const toggleRead = card.querySelector("#toggleRead");
  toggleRead.addEventListener("click", (e) => {
    for (let index in myLibrary) {
      if (myLibrary[index].id === card.id) {
        myLibrary[index].toggleRead(card);
        break;
      }
    }
  });
}
