const grid = document.getElementById("cityGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("regionFilters");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("cityDialog");
const dialogContent = document.getElementById("dialogContent");
let activeRegion = "all";

function cardTemplate(city){
  return `<article class="city-card" tabindex="0" role="button" aria-label="عرض معلومات ${city.name}" data-id="${city.id}">
    <div class="city-visual ${city.visual}"><span class="visual-label">${city.region === "الغرب" ? "غرب ليبيا" : city.region === "الشرق" ? "شرق ليبيا" : city.region === "الجنوب" ? "جنوب ليبيا" : "وسط ليبيا"}</span><span class="visual-icon">${city.icon}</span></div>
    <div class="city-info"><div class="city-meta"><span>${city.type}</span><span>ملف تعريفي</span></div><h3>${city.name}</h3><p>${city.summary}</p><div class="card-more">اقرأ عن المدينة <span>←</span></div></div>
  </article>`;
}
function render(){
  const q = searchInput.value.trim().toLocaleLowerCase("ar");
  const items = CITIES.filter(c => (activeRegion === "all" || c.region === activeRegion) &&
    (c.name.toLocaleLowerCase("ar").includes(q) || c.summary.toLocaleLowerCase("ar").includes(q)));
  grid.innerHTML = items.map(cardTemplate).join("");
  document.getElementById("cityCount").textContent = CITIES.length;
  emptyState.hidden = items.length !== 0;
}
function openCity(id){
  const c = CITIES.find(x=>x.id===id); if(!c) return;
  dialogContent.innerHTML = `<div class="dialog-hero ${c.visual}">${c.icon}</div><div class="dialog-body"><div class="city-meta"><span>${c.type}</span><span>${c.region === "الغرب" ? "غرب ليبيا" : c.region === "الشرق" ? "شرق ليبيا" : c.region === "الجنوب" ? "جنوب ليبيا" : "وسط ليبيا"}</span></div><h2>${c.name}</h2><p>${c.intro}</p>${c.sections.map(s=>`<section class="dialog-section"><h3>${s[0]}</h3><p>${s[1]}</p></section>`).join("")}<p class="data-note">ملاحظة تحريرية: هذه صفحة تأسيسية، وتخضع المعلومات للتوسعة والمراجعة وإضافة المصادر والصور الموثقة.</p></div>`;
  dialog.showModal();
}
grid.addEventListener("click",e=>{const card=e.target.closest(".city-card");if(card)openCity(card.dataset.id)});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("city-card")){e.preventDefault();openCity(e.target.dataset.id)}});
searchInput.addEventListener("input",render);
filters.addEventListener("click",e=>{const b=e.target.closest("button[data-region]");if(!b)return;activeRegion=b.dataset.region;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));render()});
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
document.getElementById("year").textContent=new Date().getFullYear();
const menuToggle=document.getElementById("menuToggle");
menuToggle.addEventListener("click",()=>{const nav=document.querySelector(".main-nav");const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open))});
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".main-nav").classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));
render();
