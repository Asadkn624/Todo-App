function register(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const newUser = { username, email, password };

  const ExistingUser = JSON.parse(localStorage.getItem("users")) || [];

  const existUser = ExistingUser.some((user) => user.email === email);

  if (existUser) {
    alert("regration is already exist");
    return;
  }

  ExistingUser.push(newUser);
  localStorage.setItem("users", JSON.stringify(ExistingUser));
  alert("registration is successfull ");
  location.href = "../index.html";
}
