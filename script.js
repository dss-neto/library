const cardsContainer = document.getElementById("cards-container");
const myLibrary = [];
const bookForm = document.querySelector("#add-book");
const dialog = document.querySelector("dialog");
const showDialogButton = document.querySelector("#showDialog");
const cancelDialogButton = document.querySelector("#cancelDialog");

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

showDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelDialogButton.addEventListener("click", () => {
  dialog.close();
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(bookForm);
  const formObject = Object.fromEntries(formData);
  addBookToLibrary(
    formObject.bookName,
    formObject.authorName,
    formObject.releaseYear,
    formObject.pageNumber,
    formObject.readState,
    formObject.backgroundImageURL
  );
  dialog.close();
});

function Book(
  bookName,
  authorName,
  releaseYear,
  pageNumber,
  readState,
  backgroundImageURL
) {
  this.id = crypto.randomUUID();
  this.bookName = bookName;
  this.authorName = authorName;
  this.releaseYear = releaseYear;
  this.pageNumber = pageNumber;
  this.readState = readState;
  this.backgroundImageURL = backgroundImageURL;
}

function addBookToLibrary(
  bookName,
  authorName,
  releaseYear,
  pageNumber,
  readState,
  backgroundImageURL
) {
  let read;
  if (readState) {
    read = "I've read.";
  } else {
    read = "Didn't read.";
  }
  const bookObject = new Book(
    bookName,
    authorName,
    releaseYear,
    pageNumber,
    read,
    backgroundImageURL
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
    if (key !== "id" && key !== "toggleRead" && key !== "backgroundImageURL") {
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
  if (bookObject.backgroundImageURL === "random") {
    const randomBookCoverIndex = getRandomInt(0, defaultBookCoversURL.length);
    const randomBookCoverURL = defaultBookCoversURL[randomBookCoverIndex];
    card.style.background = `center/cover url(${randomBookCoverURL})`;
  } else {
    card.style.background = `center/cover url(${bookObject.backgroundImageURL})`;
  }
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

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const defaultBookCoversURL = [
  "https://m.media-amazon.com/images/I/71OZY035QKL._SL1500_.jpg",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1636587007589-A895BEL0VLZ1AMG2X77L/1832+-+Pride+and+Prejudice.jpg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1636587007870-J8QM5TBYNTCNC9KO5V6P/1839+-+The+Collected+Works+of+Edgar+Allen+Poe.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1636587008463-DTM28JGARWG8LA9BUEAN/1847+-+Jane+Eyre.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1636587009069-7M917JCYJOPD3NOT4ATB/1851+-+Moby+Dick.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1636587010282-I8P5M4RNERSW7FWSR0CG/1856+-+Madame+Bovary.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378369974-XC3DL3YGP4LG1577WK4D/1866+-+Crime+and+Punishment.jpg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378371326-8O18U8D8GSVP909FZL4O/1866+-+Felix+Holt+.png?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378371937-8ZBJCZQMZGW2PYG6R5J0/1869+-+Little+Women.png?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378373079-V2W0EKE8QZICDH31AX98/1884+-+Adventures+of+Huckleberry+Finn.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378373169-OBSW2CGZ3NSS3CIUKDTQ/1890+-+The+Picture+of+Dorian+Gray.jpeg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378373736-Y4NG61IRRLZ37FEYMDG8/1891+-+L_Argent.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378373704-WRO7FMBKUKB9Y130Z42V/1891+-+Tess+of+the+d_Urbervilles.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378374285-GULRYVAZWDBD242QN9AY/1897+-+Dracula.jpg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638378374286-H2BPP1FYVLJOCJACA1G6/1899+-+The+Awakening.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380274515-COFUX2MCGCF57RDVOEEG/1900+-+Claudine.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380275436-8YWASI68V64T4167GO21/1905+-+House+of+Mirth.png?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380275603-YBZZS5N3DXTHEDT3D6JJ/1905+-+The+Jungle.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380276664-9870YSIPZJALDWZOEHXB/1906+-+Love+Among+the+Chickens.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380277040-MOBS8XBSDUE4KN1C8HLY/1911+-+Peter+and+Wendy.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380277193-9GQL81DVZNZHAEYO6XSQ/1913+-+In+Search+of+Lost+Time.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380282537-FMRM6JBGBX7J0JDEQJLZ/1920+-+Ulysses.jpeg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380280234-2INNU13VMBGGAD0JRNAB/1922+-+Siddhartha.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380280977-0B65PD56LZW11HRUTL1H/1923+-+Cane.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380281860-A23JCB569S5F18O3AJGF/1925+-+Mrs.+Dalloway.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380282734-CQA9HUNU47OP2K5GXVEE/1925+-+The+Great+Gatsby.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380283175-VYKMBGD501HB8KMB42UZ/1925+-+The+Trial.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380284148-DB3WHVCB0N2AJ27NVEPO/1926+-+The+Sun+Also+Rises.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380283907-3NM7L7E2JIGX19C8UU0L/1927+-+To+the+Lighthouse.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380285057-6MTBO7L4IBZ6V1IWEZQW/1929+-+Passing.jpeg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380286498-CS5PUY193T9ORLED7G47/1930+-+As+I+Lay+Dying.jpg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380286322-ACJQL2JVA4UBQNCHQY2B/1932+-+Brave+New+World.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380286775-127OC8I6X5JNTRCZTNR1/1934+-+Murder+on+the+Orient+Express.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380286939-AF3T574I36GX8GRJJTD5/1934+-+Tropic+of+Cancer.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380287347-NHCJHIF9EQUCWUESQ9JS/1936+-+Nightwood.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380288135-7G05T6YGQDVV07HX5H1B/1937+-+East+Goes+West.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380288565-Z70G18PQTHOBJ8TU679B/1938+-+Rebecca.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638380288927-K7Y1GA21QE9E0Y01S5AS/1939+-+The+Grapes+of+Wrath.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382301196-Q0TV72AHZFN9XHD96V0T/1940+-+Native+Son.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382305302-24BO5LE631614HC7QEJR/1942+-+The+Stranger.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382305870-2J5GKYYC614TN446289M/1949+-+1984.jpg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382307575-A1ZNFE24IKAAT7OK89A9/1951+-+The+Catcher+in+the+Rye.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382307990-D8ZWY6BGDCFQVW2M217E/1952+-+Invisible+Man.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382309340-SJ6U9WULH88556MJHKMF/1952+-+The+Price+of+Salt.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382309599-XWL4QTOGN5I907Z6HMIQ/1953+-+Fahrenheit+451.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382309857-ZRKJ6L1XQNTNDE9GDUCE/1953+-+Maud+Martha.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382310105-GYPP6TXI4H50DT5ZVWKV/1954+-+The+Lord+of+the+Rings.gif?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382310473-BBHU9SYQJDXPKGLZVPX6/1955+-+Lolita.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382310538-PYT906N5BQ3JSFJ70JUV/1955+-+Pedro+Pa%CC%81ramo.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382311008-VBDYOZJ431Q2668XKGS5/1956+-+Giovanni_s+Room.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382311161-SY28V1FD5FHLIZ64H1SM/1957+-+On+the+Road.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382311423-9EKPNKCY37ZX7M77JG0P/1958+-+The+Once+_+Future+King.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638563077490-D182ZE7IY0C25NNLHUWB/1958+-+Things+Fall+Apart.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382312272-XTGLSDIYX7UROMS7N2ZQ/1959+-+The+Haunting+of+Hill+House.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382312074-D2LWHC3JTU28XYBFIMGM/1959+-+The+Nine+Guardians.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382312547-QZU037GY6AQIU2JU93DR/1960+-+To+Kill+a+Mockingbird.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382312736-Y7M7PJMXQ7S5DVOO0NAE/1961+-+Catch-22.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382312969-A09J0VL2Z4327VKHUI4T/1961+-+Solaris.jpg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382313897-F1DR9QH8ZWJ9B4E1N1C9/1962+-+Labyrinths.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382320569-2O10LEAAKRFYM5DCX4JH/1963+-+The+Spy+Who+Came+in+From+the+Cold.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382314408-7E2O9ICFFE0VRPEFLF5E/1964+-+The+Passion+According+to+G.H..jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382315360-04R58JIHWTXLOBHH83OE/1965+-+In+Cold+Blood.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638563031979-BP2S881TPKH6PWMY66TT/1966+-+Wide+Sargasso+Sea.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382321297-CKHRQT82K1K7SA7L1Z49/1967+-+One+Hundred+Years+of+Solitude.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382321356-SFRCM8WI2PFDR2NFN832/1967+-+The+Confessions+of+Nat+Turner.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382322066-TTVWQLKVDAGNLXLCBCX8/1969+-+Slaughterhouse-Five.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638382324300-A01C8WLROK0K22ZP369W/1969+-+The+Left+Hand+of+Darkness.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638386696712-4CC5QCGS715C1CHXDIQX/1970+-+Play+It+as+It+Lays.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638386697187-UTFA02TC9VRRP6CKHO55/1970+-+The+Bluest+Eye.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638386697969-32WZ887VJ5I7U1AK3C4J/1971+-+The+Book+of+Daniel.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638386697543-8R5TYC785MLS4CKTU7BQ/1971+-+Maurice.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638386698381-3WWMJUAJCUSU5VPZKEO8/1971+-+The+Complete+Stories.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638388358098-8YW6HRCYDLYN86I20XJR/1973+-+The+Summer+Book.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638386708206-5UNECGJ1ZYJGGFGLHYAU/1978+-+The+World+Accord+to+Garp.jpg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638386705627-9R3ROTT505MBO8VQQWGV/1978+-+The+Sea%2C+The+Sea.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638392931311-QZJOVXHSEZ2GED0GPG1Q/1977+-+The+Hour+of+the+Star.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638393826167-3A9JWZRP3I80QXVKO31S/1980+-+Housekeeping.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638393827885-LVQ8695Y8AYPXIH0GUSA/1982+-+The+Color+Purple.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547266934-J6YDM5TQA7BESZIMMJ95/2000+-+The+Amazing+Adventures+of+Cavalier+and+Klay.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547267123-JL8S2LPD6SPXVLZSDPK5/2000+-+White+Teeth.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547663180-GHBS654S8T9L3DIG3G0Y/2005+-+Never+Let+Me+Go.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638398139633-IHJVC58WU40JTSEIW8N2/1993+-+The+Shipping+News.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547268854-F83GTWS5IU5HA7NQGA2L/2004+-+Cloud+Atlas.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547270208-I2CQ2JUE1HMP0H9E46BH/2009+-+Let+the+Great+World+Spin.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547995299-J7XRAPA145XPNNUPYLSJ/2010+-+Event+Factory.jpeg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547995013-5RR6NL3RN0I4QVB0BZGB/2011+-+My+Brilliant+Friend.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547996051-0FGW7TQQU6RJUAJTKF0X/2011+-+The+Song+of+Achilles.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547997245-634T2JM3EZN0D6S5AOB3/2014+-+Outline.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547997299-REIDQIR95BI6XAFG4TEW/2014+-+The+Emissary+.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547997834-RM3QN80R1WEP8LTSC5JM/2015+-+The+Sellout.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547998165-42H0UTSG70LC9V2UTIA7/2016+-+The+Underground+Railroad.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547998615-B6S85Y1PNHYE70IFPJKQ/2017+-+Exit+West.jpeg?format=300w",
  "https://images.squarespace-cdn.com/content/v1/5f45ec2d98a2513ca091f6d3/1638547999694-NMRC9IN39C9O2LYAT8Q1/2017+-+Lincoln+in+the+Bardo.jpeg?format=300w",
];
