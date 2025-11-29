//Homepage
let selectedType = "";

const lostButton = document.getElementById("lost");
const foundButton = document.getElementById("found");
const beginButton = document.getElementById("begin");

if (lostButton && foundButton && beginButton) {
  lostButton.addEventListener("click", () => {
    selectedType = "lost";
  });

  foundButton.addEventListener("click", () => {
    selectedType = "found";
  });

  beginButton.addEventListener("click", () => {
    if (selectedType === "lost") {
      window.location.href = "lostPage.html";
    } else if (selectedType === "found") {
      window.location.href = "foundPage.html";
    } else {
      alert("Please choose Lost or Found first");
    }
  });
}

const loadItems = (key) => {
  const text = localStorage.getItem(key);
  return text ? JSON.parse(text) : [];
};

const saveItems = (key, itemsArray) => {
  const text = JSON.stringify(itemsArray);
  localStorage.setItem(key, text);
};

//Lost create page
const lostForm = document.getElementById("lostItemForm");

if (lostForm) {
  lostForm.addEventListener("submit", (event) => {
    event.preventDefault(); // stop normal submit / refresh

    const contactInput = document.getElementById("contactInfo");
    const descriptionInput = document.getElementById("itemDescription");

    const newLostItem = {
      contact: contactInput.value.trim(),
      description: descriptionInput.value.trim(),
      claimed: false // not claimed when created
    };

    const lostItems = loadItems("lostItems");
    lostItems.push(newLostItem);
    saveItems("lostItems", lostItems);

    alert("Lost item post created!");
    window.location.href = "lostPage.html"; // go see the post
  });
}

//Found create page
const foundForm = document.getElementById("foundItemForm");

if (foundForm) {
  foundForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const contactInput = document.getElementById("contactInfo");
    const descriptionInput = document.getElementById("itemDescription");

    const newFoundItem = {
      contact: contactInput.value.trim(),
      description: descriptionInput.value.trim(),
      claimed: false
    };

    const foundItems = loadItems("foundItems");
    foundItems.push(newFoundItem);
    saveItems("foundItems", foundItems);

    alert("Found item post created!");
    window.location.href = "foundPage.html";
  });
}

//Show lost posts
const lostPostsDiv = document.getElementById("lostPosts");

if (lostPostsDiv) {
  const lostItems = loadItems("lostItems");

  if (lostItems.length === 0) {
    lostPostsDiv.innerHTML = "<p>No lost items have been posted yet.</p>";
  } else {
    for (let i = 0; i < lostItems.length; i++) {
      const item = lostItems[i];

      const card = document.createElement("div");
      card.className = "itemCard";

      const descP = document.createElement("p");
      descP.textContent = "Description: " + item.description;

      const contactP = document.createElement("p");
      contactP.textContent = "Contact: " + item.contact;

      const statusP = document.createElement("p");
      statusP.textContent = item.claimed
        ? "Status: CLAIMED"
        : "Status: Not claimed";

      card.appendChild(descP);
      card.appendChild(contactP);
      card.appendChild(statusP);

      if (!item.claimed) {
        const claimButton = document.createElement("button");
        claimButton.textContent = "Mark as claimed";

        claimButton.addEventListener("click", () => {
          lostItems[i].claimed = true;
          saveItems("lostItems", lostItems);

          statusP.textContent = "Status: CLAIMED";
          claimButton.disabled = true;
        });

        card.appendChild(claimButton);
      }

      lostPostsDiv.appendChild(card);
    }
  }
}

//Show found posts
const foundPostsDiv = document.getElementById("foundPosts");

if (foundPostsDiv) {
  const foundItems = loadItems("foundItems");

  if (foundItems.length === 0) {
    foundPostsDiv.innerHTML = "<p>No found items have been posted yet.</p>";
  } else {
    for (let i = 0; i < foundItems.length; i++) {
      const item = foundItems[i];

      const card = document.createElement("div");
      card.className = "itemCard";

      const descP = document.createElement("p");
      descP.textContent = "Description: " + item.description;

      const contactP = document.createElement("p");
      contactP.textContent = "Contact: " + item.contact;

      const statusP = document.createElement("p");
      statusP.textContent = item.claimed
        ? "Status: CLAIMED"
        : "Status: Not claimed";

      card.appendChild(descP);
      card.appendChild(contactP);
      card.appendChild(statusP);

      if (!item.claimed) {
        const claimButton = document.createElement("button");
        claimButton.textContent = "Mark as claimed";

        claimButton.addEventListener("click", () => {
          foundItems[i].claimed = true;
          saveItems("foundItems", foundItems);

          statusP.textContent = "Status: CLAIMED";
          claimButton.disabled = true;
        });

        card.appendChild(claimButton);
      }

      foundPostsDiv.appendChild(card);
    }
  }
}