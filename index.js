
// Select the main container
const app = document.querySelector("#app");

// 1. Add some dummy content to practice with
app.innerHTML = `
  <section class="card" data-group="books">
    <h2 class="card-title">JavaScript Guide</h2>
    <button class="btn-select">Select Me</button>
  </section>
  <section class="card" data-group="laptops">
    <h2 class="card-title">MacBook Pro</h2>
    <button class="btn-select">Select Me</button>
  </section>
`;

// 2. The "Modern" Event Listener (Event Delegation)
// Instead of adding listeners to every button, we add ONE to the container.
app.addEventListener("click", (event) => {
  // 'event.target' is exactly what was clicked (could be the icon inside the button)
  // 'event.currentTarget' is the element we attached the listener to (#app)

  // 3. Robust Checking with.closest()
  // "Look up the tree from the clicked spot. Do you find a.btn-select?"
  const btn = event.target.closest(".btn-select");

  // If we didn't click a button, stop here.
  if (!btn) return;

  // 4. Traversal: Find the parent card of this specific button
  const card = btn.closest(".card");

  // 5. Manipulation: Toggle a CSS class
  // We use classList because it's cleaner than className
  card.classList.toggle("highlighted");

  console.log(`You toggled the card in group: ${card.dataset.group}`);
});
