if (localStorage.setItem("loggeIn" === "true")) {
  location.href = "./html/home.html";
}

function login(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (matchedUser) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    localStorage.setItem("username", matchedUser.username);
    alert("congratulation! you are loggedIn");
    location.href = "./html/home.html";
  } else {
    alert("sorry! invalid crediential");
    location.href = "./index.html";
  }
}
