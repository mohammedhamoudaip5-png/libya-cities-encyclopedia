/* images-patch.js — يضيف الصور المؤكدة إلى CITIES دون تعديل cities.js
   يُحمَّل بعد cities.js وقبل app.js */
(function(){
  const patch=(id,opts)=>{
    const c=CITIES.find(x=>x.id===id); if(!c) return;
    if(opts.image){ c.image=opts.image; if(opts.imageAlt) c.imageAlt=opts.imageAlt; }
    c.gallery=c.gallery||[];
    (opts.gallery||[]).forEach(g=>{ if(!c.gallery.some(x=>x.url===g.url)) c.gallery.push(g); });
  };

  patch('msalata',{
    image:'assets/municipalities/06_msallata/sample_card.jpg',
    imageAlt:'لوحة جامع المجابرة في مسلاتة',
    gallery:[{
      url:'assets/municipalities/06_msallata/gallery/sample_plaque.jpg',
      alt:'لوحة جامع المجابرة بمسلاتة',
      title:'جامع المجابرة',
      title_en:'Al-Mujabra Mosque',
      caption:'لوحة تذكر أن الجامع مقر إعلان تأسيس الجمهورية الطرابلسية سنة 1918م.',
      caption_en:'A plaque stating that the mosque was the site of the proclamation of the Tripolitanian Republic in 1918.',
      source:'مصدر الصورة بحاجة إلى توثيق'
    }]
  });

  patch('sabratha',{
    image:'assets/municipalities/13_sabratha/sample_card.jpg',
    imageAlt:'المسرح الروماني في صبراتة',
    gallery:[
      {
        url:'assets/municipalities/13_sabratha/gallery/sample_theatre.jpg',
        alt:'المسرح الروماني في صبراتة',
        title:'المسرح الروماني',
        title_en:'The Roman Theatre',
        caption:'المسرح الروماني في موقع صبراتة الأثري.',
        caption_en:'The Roman theatre at the archaeological site of Sabratha.',
        source:'مصدر الصورة بحاجة إلى توثيق'
      },
      {
        url:'assets/municipalities/13_sabratha/gallery/sample_city_2020.jpg',
        alt:'دوار وشارع رئيسي في صبراتة',
        title:'من شوارع صبراتة',
        title_en:'A street scene in Sabratha',
        caption:'منظر لأحد الدوارات والشوارع الرئيسية (2020).',
        caption_en:'A view of a roundabout and main road (2020).',
        source:'Monir Alganudi (كما يظهر على الصورة)'
      }
    ]
  });
})();
