const grid=document.getElementById('cityGrid'),search=document.getElementById('searchInput'),dialog=document.getElementById('cityDialog'),content=document.getElementById('dialogContent');
let language='ar';
const T={ar:{home:'الرئيسية',cities:'المدن الليبية',map:'الخريطة',aboutNav:'عن الموسوعة',contact:'اتصل بنا',tag:'تراثنا • تاريخنا • مدننا',verse:'﴿وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا﴾',verseRef:'سورة الحجرات — الآية ١٣',eyebrow:'ذاكرة وطن • حضارة ممتدة عبر القرون',title:'موسوعة المدن الليبية',subtitle:'تاريخ المدن الليبية... حضارة وهوية وذاكرة وطن',placeholder:'ابحث عن مدينة ليبية...',search:'بحث',discover:'اكتشف المدن ←',heroCaption:'مزدة القديمة',heroSub:'عراقة المكان وذاكرة الأجيال',journey:'رحلة في أرجاء البلاد',explore:'اكتشف المدن الليبية',choose:'اختر المدينة لفتح ملفها التعريفي.',mapEyebrow:'من الساحل إلى عمق الصحراء',mapTitle:'مواقع المدن الليبية',mapText:'افتح ملف المدينة ثم اختر رابط خرائط Google للوصول إلى موقعها. لا نعرض إحداثيات غير متحقق منها.',about:'عن الموسوعة',aboutTitle:'ذاكرة المدن... ذاكرة ليبيا',aboutText:'مشروع معرفي لجمع تاريخ المدن الليبية وجغرافيتها وآثارها وتراثها، مع التمييز بين المعلومات العامة والروايات المحلية، وعدم نسبة قول أو حدث أو نسب إلى جهة دون مصدر.',rights:'© جميع الحقوق محفوظة',contactFb:'اتصل بنا عبر فيسبوك ↗',prepared:'إعداد المهندس محمد عبدالمجيد حمودة',noPhoto:'صورة المدينة قيد الإضافة',open:'افتح الملف التعريفي ←',notFound:'لم نعثر على مدينة بهذا الاسم.',mapLink:'اعرض موقع',onMaps:'على خرائط Google ↗',imageSource:'مصدر الصورة:',note:'تُميز الموسوعة بين المعلومات العامة والروايات المحلية، ولا تدرج أنساباً أو أسماء مجاهدين أو وقائع تفصيلية دون توثيق.',weather:'طقس المدينة الآن',loading:'جارٍ جلب حالة الطقس...',weatherFail:'تعذر جلب الطقس حالياً. حاول لاحقاً.',updated:'آخر تحديث:',temp:'درجة الحرارة',wind:'سرعة الرياح',feels:'المحسوسة',humidity:'الرطوبة',precip:'الهطول الحالي',conditions:'الحالة الجوية',weatherSource:'البيانات: Open-Meteo',photoUnavailable:'تعذر تحميل الصورة حالياً'},en:{home:'Home',cities:'Libyan Cities',map:'Map',aboutNav:'About',contact:'Contact',tag:'Our Heritage • Our History • Our Cities',verse:'“We made you peoples and tribes so that you may know one another.”',verseRef:'Quran, Al-Hujurat 49:13',eyebrow:'A nation’s memory • A civilisation across the centuries',title:'Encyclopedia of Libyan Cities',subtitle:'The history of Libyan cities — civilisation, identity and national memory',placeholder:'Search for a Libyan city...',search:'Search',discover:'Explore the cities ←',heroCaption:'Old Mizdah',heroSub:'The authenticity of place and the memory of generations',journey:'A journey across the country',explore:'Explore Libyan cities',choose:'Select a city to open its profile.',mapEyebrow:'From the coast to the deep Sahara',mapTitle:'Locations of Libyan cities',mapText:'Open a city profile and follow the Google Maps link to view its location. Unverified coordinates are not displayed.',about:'About the encyclopedia',aboutTitle:'The memory of cities… the memory of Libya',aboutText:'A knowledge project documenting the history, geography, archaeology and heritage of Libyan cities. It distinguishes general information from local accounts and does not attribute statements, events or genealogies without sources.',rights:'© All rights reserved',contactFb:'Contact us on Facebook ↗',prepared:'Prepared by Engineer Mohammed Abdulmajid Hamouda',noPhoto:'City photo to be added',open:'Open city profile →',notFound:'No city with that name was found.',mapLink:'View',onMaps:'on Google Maps ↗',imageSource:'Image source:',note:'The encyclopedia distinguishes general information from local accounts. Genealogies, resistance fighters’ names and detailed events are included only with documentation.',weather:'Current city weather',loading:'Loading weather...',weatherFail:'Weather is temporarily unavailable. Please try again later.',updated:'Last updated:',temp:'Temperature',wind:'Wind speed',feels:'Feels like',humidity:'Humidity',precip:'Current precipitation',conditions:'Conditions',weatherSource:'Data: Open-Meteo',photoUnavailable:'Image could not be loaded',humidity:'Humidity',precip:'Current precipitation',conditions:'Conditions',weatherSource:'Data: Open-Meteo',photoUnavailable:'Image could not be loaded'}};
const norm=s=>String(s||'').toLocaleLowerCase(language==='ar'?'ar':'en').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي');
function current(c){return language==='en'?(c.en||c):c}
function render(){const q=norm(search.value.trim()),list=CITIES.filter(c=>{const d=current(c);return !q||norm([c.name,c.summary,c.region,d.name,d.summary,d.region].join(' ')).includes(q)});grid.innerHTML=list.map(c=>{const d=current(c);return `<article class="city" tabindex="0" role="button" data-id="${c.id}"><div class="visual">${c.image?`<img src="${c.image}" alt="${c.imageAlt||c.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'no-photo',textContent:'${T[language].photoUnavailable}'}))">`:`<div class="no-photo">${T[language].noPhoto}</div>`}</div><div class="city-body"><small>${d.region} • ${d.kind}</small><h3>${d.name}</h3><p>${d.summary}</p><span class="more">${T[language].open}</span></div></article>`}).join('');document.getElementById('cityCount').textContent=language==='ar'?CITIES.length+' مدينة':CITIES.length+' cities';document.getElementById('emptyState').hidden=list.length>0;document.getElementById('emptyState').textContent=T[language].notFound}
const coords={tripoli:[32.8872,13.1913],sabratha:[32.7934,12.4885],misrata:[32.3754,15.0925],khoms:[32.6486,14.2619],'leptis-magna':[32.6380,14.2920],zlitn:[32.4674,14.5687],sabha:[27.0377,14.4283],ajdabiya:[30.7554,20.2263],gharyan:[32.1722,13.0203],'bani-walid':[31.7566,14.0030],yefren:[32.0633,12.5286],'al-qalaa':[32.2,12.8],zintan:[31.9316,12.2529],rajban:[31.9167,12.0833],bayda:[32.7627,21.7551],zwara:[32.9312,12.08199],jadu:[31.95,12.017],tajoura:[32.88167,13.35056],benghazi:[32.1917,20.0667],derna:[32.76,22.64],tarhuna:[32.435,13.633]};
function weatherInfo(code,temp){if(temp>=38)return ['🔥','Extreme heat','hot'];if(temp<=8)return ['🥶','Cold','cold'];if(code===0)return ['☀️','Clear sky','sunny'];if([1,2].includes(code))return ['🌤️','Partly cloudy','cloudy'];if(code===3)return ['☁️','Overcast','cloudy'];if([45,48].includes(code))return ['🌫️','Fog','dust'];if([51,53,55,56,57].includes(code))return ['🌦️','Drizzle','rain'];if([61,63,65,66,67,80,81,82,85,86].includes(code))return ['🌧️','Rain','rain'];if([71,73,75,77].includes(code))return ['❄️','Snow','cold'];if([95,96,99].includes(code))return ['⛈️','Thunderstorm','rain'];return ['🌡️','Variable conditions','mild']}
async function loadWeather(c){
 const box=document.getElementById('weatherBox');if(!box)return;
 const xy=c.coordinates?[c.coordinates.latitude,c.coordinates.longitude]:coords[c.id];
 if(!xy){box.innerHTML=`<b>${T[language].weather}</b><p>${T[language].weatherFail}</p>`;return}
 box.innerHTML=`<b>${T[language].weather}</b><p>${T[language].loading}</p>`;
 try{
  const url=`https://api.open-meteo.com/v1/forecast?latitude=${xy[0]}&longitude=${xy[1]}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;
  const r=await fetch(url);if(!r.ok)throw new Error('weather');
  const j=await r.json(),v=j.current,[emoji,condition,tone]=weatherInfo(v.weather_code,v.temperature_2m);
  const labels={sunny:language==='ar'?'صافٍ':'Clear',cloudy:language==='ar'?'غائم جزئياً أو كلياً':'Cloudy',dust:language==='ar'?'ضباب أو غشاوة':'Fog or haze',rain:language==='ar'?'أمطار أو عواصف':'Rain or storms',cold:language==='ar'?'بارد':'Cold',hot:language==='ar'?'حرارة شديدة':'Extreme heat',mild:language==='ar'?'أحوال متغيرة':'Variable conditions'};
  const stamp=(()=>{try{return new Intl.DateTimeFormat(language==='ar'?'ar-LY':'en-GB',{dateStyle:'medium',timeStyle:'short',timeZone:j.timezone}).format(new Date(v.time))}catch(_){return String(v.time).replace('T',' ')}})();
  const val=(n,d=0)=>Number.isFinite(Number(n))?Number(n).toFixed(d):'—';
  box.className='weather-box '+tone;
  box.innerHTML=`<div class="weather-top"><b>${T[language].weather}</b><span>${emoji} ${labels[tone]||condition}</span></div>
  <div class="weather-main"><strong>${Math.round(v.temperature_2m)}°C</strong><div>${labels[tone]||condition}<small>${T[language].feels}: ${Math.round(v.apparent_temperature)}°C</small></div></div>
  <div class="weather-meta"><span>${T[language].humidity}: ${val(v.relative_humidity_2m)}%</span><span>${T[language].wind}: ${val(v.wind_speed_10m,1)} km/h</span><span>${T[language].precip}: ${val(v.precipitation,1)} mm</span></div>
  <small class="weather-updated">${T[language].updated} ${stamp} · ${T[language].weatherSource}</small>`;
 }catch(e){box.className='weather-box unavailable';box.innerHTML=`<b>${T[language].weather}</b><p>${T[language].weatherFail}</p>`}
}
function openCity(id){const c=CITIES.find(x=>x.id===id);if(!c)return;const d=current(c),sections=d.sections||c.sections;content.innerHTML=`<header class="article-head"><small>${d.region} • ${d.kind}</small><h2>${d.name}</h2><p>${d.intro}</p></header><div class="article-body"><div id="weatherBox" class="weather-box unavailable"><b>${T[language].weather}</b><p>${T[language].loading}</p></div>${sections.map(s=>`<section><h3>${s[0]}</h3><p>${s[1]}</p></section>`).join('')}${c.gallery?.length?`<section class="photo-gallery"><h3>${language==='ar'?'صور ومعالم من المدينة':'City photographs and landmarks'}</h3><div class="photo-grid">${c.gallery.map(g=>`<figure><img src="${g.url}" alt="${g.alt}" loading="lazy"><figcaption><b>${language==='en'?(g.title_en||g.title):g.title}</b><span>${language==='en'?(g.caption_en||g.caption):g.caption}</span><small>${T[language].imageSource} ${g.source}</small></figcaption></figure>`).join('')}</div></section>`:''}<a class="article-map" href="https://earth.google.com/web/search/${encodeURIComponent(c.coordinates?c.coordinates.latitude+','+c.coordinates.longitude:c.name+' Libya')}" target="_blank" rel="noopener">${T[language].mapLink} ${d.name} ${T[language].onMaps}</a>${c.imageSource?`<p class="note">${T[language].imageSource} ${c.imageSource}</p>`:''}${c.sources?.length?`<section class="sources"><h3>${language==='ar'?'المراجع والمصادر':'References and sources'}</h3><ul>${c.sources.map(x=>`<li><a href="${x.url}" target="_blank" rel="noopener noreferrer">${x.title} ↗</a></li>`).join('')}</ul></section>`:''}<p class="note">${T[language].note}</p></div>`;dialog.showModal();loadWeather(c);if(window.__weatherRefresh)clearInterval(window.__weatherRefresh);window.__weatherRefresh=setInterval(()=>{if(dialog.open)loadWeather(c)},600000)}
document.addEventListener('error',e=>{const img=e.target;if(!(img instanceof HTMLImageElement)||!img.closest('.photo-grid'))return;const fallback=document.createElement('div');fallback.className='gallery-image-fallback';fallback.textContent=language==='ar'?'الصورة غير متاحة حالياً':'Image currently unavailable';img.replaceWith(fallback)},true);

grid.addEventListener('click',e=>{const c=e.target.closest('.city');if(c)openCity(c.dataset.id)});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('city')){e.preventDefault();openCity(e.target.dataset.id)}});
search.addEventListener('input',render);
document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('cities').scrollIntoView({behavior:'smooth'})});
document.getElementById('dialogClose').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const menuToggle=document.getElementById('menuToggle'),navLinks=document.getElementById('navLinks'),menuBackdrop=document.getElementById('menuBackdrop');
function setMenu(open){navLinks.classList.toggle('open',open);menuBackdrop.classList.toggle('show',open);document.body.classList.toggle('menu-open',open);menuToggle.setAttribute('aria-expanded',String(open));navLinks.setAttribute('aria-hidden',String(!open));menuBackdrop.setAttribute('aria-hidden',String(!open));}
menuToggle.addEventListener('click',()=>setMenu(!navLinks.classList.contains('open')));
menuBackdrop.addEventListener('click',()=>setMenu(false));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navLinks.classList.contains('open'))setMenu(false)});
function setLanguage(next){
 language=next;
 document.documentElement.lang=next;
 document.documentElement.dir=next==='ar'?'rtl':'ltr';
 const en=next==='en';
 document.querySelector('.basmala').textContent=en?'I seek refuge in Allah from Satan, the accursed':'أعوذ بالله من الشيطان الرجيم';
 // The Quranic verse intentionally remains in Arabic in both languages.
 document.querySelector('.motto').textContent=en?'A proud past • An honourable history • A lasting legacy':'ماضي عريق.. تاريخ مشرف.. عبق وتخليد';
 document.querySelector('.hero-top h1').textContent=en?'The Comprehensive Libyan Encyclopedia':'الموسوعة الليبية الشاملة';
 document.querySelector('.english-title').textContent=en?'The Comprehensive Libyan Encyclopedia':'The Comprehensive Libyan Encyclopedia';
 search.placeholder=en?'Search for a Libyan city...':'ابحث عن مدينة ليبية...';
 search.setAttribute('aria-label',search.placeholder);
 document.querySelector('#searchForm button').textContent=en?'Search':'بحث';
  document.querySelector('#cities .heading small').textContent=en?'A journey across the country':'رحلة في أرجاء البلاد';
 document.querySelector('#cities .heading h2').textContent=en?'Index of Libyan Cities':'فهرس المدن الليبية';
 document.querySelector('#cities .heading p').textContent=en?'Select a city to open its profile.':'اختر المدينة لفتح ملفها التعريفي.';
 document.querySelector('#food small').textContent=en?'From the memory of Libyan tables':'من ذاكرة المائدة الليبية';
 document.querySelector('#food h2').textContent=en?'Traditional foods of the cities':'الأكلات الشعبية للمدن';
 document.querySelector('#food p').textContent=en?'Selected dishes listed for each city in the encyclopedia.':'مختارات من الأكلات التي أدرجها صاحب الموسوعة لكل مدينة.';
 document.querySelector('#map small').textContent=en?'From the coast to the deep Sahara':'من الساحل إلى عمق الصحراء';
 document.querySelector('#map h2').textContent=en?'Locations of Libyan Cities':'مواقع المدن الليبية';
 document.querySelector('#map p').textContent=en?'Each city profile includes a link to open its approximate coordinates in Google Earth or Maps.':'تتضمن صفحة كل مدينة رابطاً لفتح إحداثياتها على Google Earth/Maps. الإحداثيات تقريبية لمراكز المدن.';
 document.querySelector('#about small').textContent=en?'About the encyclopedia':'حول الموسوعة';
 document.querySelector('#about h2').textContent=en?'The memory of cities… the memory of Libya':'ذاكرة المدن... ذاكرة ليبيا';
 document.querySelector('#about p').textContent=en?'This encyclopedia aims to share the history, cities and heritage of Libya with readers around the world. Prepared and designed by Engineer Mohammed Abdulmajid Mohammed Hamouda.':'تهدف الموسوعة إلى نقل تاريخ ليبيا ومدنها وتراثها إلى العالم، ليطلع عليها الناس من مختلف البلدان. إعداد وتصميم المهندس محمد عبدالمجيد محمد حمودة، آملاً أن تنال الموسوعة إعجاب زوارها.';
 document.querySelector('footer .foot>div p').textContent=en?'© All rights reserved':'© جميع الحقوق محفوظة';
 document.querySelector('.prepared').textContent=en?'Prepared by Engineer Mohammed Abdulmajid Hamouda':'إعداد المهندس محمد عبدالمجيد حمودة';
 document.getElementById('languageToggle').textContent=en?'العربية':'English';
 const menuAnchors=navLinks.querySelectorAll('a');
 if(menuAnchors[0])menuAnchors[0].textContent=en?'City index':'فهرس المدن';
 if(menuAnchors[1])menuAnchors[1].textContent=en?'Traditional foods':'الأكلات الشعبية للمدن';
 if(menuAnchors[2])menuAnchors[2].textContent=en?'About the encyclopedia':'حول الموسوعة';
 document.getElementById('themeToggle').textContent=en?'Dark / light mode':'الوضع الداكن / العادي';
 render();
}
document.getElementById('languageToggle').addEventListener('click',()=>setLanguage(language==='ar'?'en':'ar'));
document.getElementById('themeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');document.getElementById('themeToggle').setAttribute('aria-pressed',String(document.body.classList.contains('dark')))});
function renderFoodIndex(){
 const host=document.getElementById('foodGrid'); if(!host)return;
 host.innerHTML=CITIES.map(c=>{
   const food=(c.sections||[]).find(s=>s[0]==='الأكلات الشعبية'||s[0]==='المأكولات الشعبية');
   const enFood=(c.en?.sections||[]).find(s=>s[0]==='Local food'||s[0]==='Traditional food');
   const title=language==='en'?(c.en?.name||c.name):c.name;
   const desc=language==='en'?(enFood?.[1]||food?.[1]||''): (food?.[1]||'');
   return `<article class="food-card"><b>${title}</b><p>${desc}</p><button type="button" data-city="${c.id}">${language==='en'?'Open city profile':'افتح صفحة المدينة'}</button></article>`;
 }).join('');
 host.querySelectorAll('button[data-city]').forEach(b=>b.addEventListener('click',()=>openCity(b.dataset.city)));
}
const originalRender=render;
render=function(){originalRender();renderFoodIndex()};
render();
