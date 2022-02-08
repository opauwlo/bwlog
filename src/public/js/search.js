const filterInput = document.querySelector("#filter");

function test(e) {
  let t = e.length;
  for (let e = 0; e <= t; e++) return [e];
}
filterInput.addEventListener("input", (e) => {
  let t = e.target.value.toLowerCase();
  const o = (t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).split(
    /[.\s]+/
  );

  function r() {
    for (let e = 0; e < o.length; e++) return o[e];
  }
  const n = document.querySelectorAll(".post");
  document.querySelector(".noPost");
  n.forEach((e) => {
    const t = e
      .querySelector(".text-titulo")
      .textContent.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
      o = e
      .querySelector(".text-descricao")
      .textContent.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
      n = e
      .querySelector(".text-autor")
      .textContent.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    t.includes(r()) || o.includes(r()) || n.includes(r()) ?
      (e.style.display = "initial") :
      (e.style.display = "none");
  });
});