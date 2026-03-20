export function renderLoadScreen(city) {
  const mainScreenEl = document.querySelector(".app");
  mainScreenEl.innerHTML = "";
  mainScreenEl.innerHTML = `<div class="loading">
        <div class="loading__message">Daten für ${city} werden geladen</div>
        <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </div>
      `;
}
