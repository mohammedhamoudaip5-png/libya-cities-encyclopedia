// تحميل وتنسيق بطاقات المدن الـ 21 مباشرة
document.addEventListener('DOMContentLoaded', () => {
    // جلب البيانات من ملف cities.json الموجود في نفس المجلد
    fetch('cities.json')
        .then(response => response.json())
        .then(cities => {
            const grid = document.getElementById('cities-grid');
            if(!grid) return;
            grid.innerHTML = '';
            cities.forEach(city => {
                let extraNote = '';
                if(city.id === 'mizda') {
                    extraNote = '<div class="image-note">🖼️ الصورة المعتمدة: صورة مزدة القديمة</div>';
                } else if(city.id === 'rajban') {
                    extraNote = '<div class="image-note">🖼️ الصورة المعتمدة: صورة الرجبان البانورامية الثانية العريضة</div>';
                }

                const card = document.createElement('div');
                card.className = 'city-card';
                card.innerHTML = `
                    <div class="city-card-header">
                        <h4>${city.name}</h4>
                        <span class="city-region">${city.region}</span>
                    </div>
                    <div class="city-card-body">
                        <p>${city.desc}</p>
                        ${extraNote}
                    </div>
                `;
                grid.appendChild(card);
            });
        })
        .catch(err => console.error('خطأ في تحميل بيانات المدن:', err));
});
