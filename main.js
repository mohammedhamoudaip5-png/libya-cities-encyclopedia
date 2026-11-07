document.addEventListener('DOMContentLoaded', () => {
    fetch('cities.json')
        .then(response => {
            if (!response.ok) throw new Error('فشل تحميل ملف بيانات المدن');
            return response.json();
        })
        .then(cities => {
            const grid = document.getElementById('cities-grid');
            if (!grid) return;
            grid.innerHTML = '';
            
            cities.forEach(city => {
                let extraNote = '';
                if (city.id === 'mizda') {
                    extraNote = '<div class="image-note">🖼️ الصورة المعتمدة: صورة مزدة القديمة</div>';
                } else if (city.id === 'rajban') {
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
        .catch(err => {
            console.error('خطأ:', err);
            const grid = document.getElementById('cities-grid');
            if (grid) {
                grid.innerHTML = '<p style="color: red; text-align: center; grid-column: 1/-1;">عذراً، حدث خطأ في تحميل بيانات المدن. تأكد من وجود ملف cities.json.</p>';
            }
        });
});
