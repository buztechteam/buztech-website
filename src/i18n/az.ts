import type { Dict } from './types';

/**
 * Azerbaijani (Latin script). Served with the Baku office, so it makes no claim only the
 * Georgian company can make: no VAT invoice, local currency, tax ID or founding date.
 * Product names stay in English, as in en.ts.
 */
export const az: Dict = {
  meta: {
    title: 'BUZ Tech - Microsoft 365 lisenziyaları ən sərfəli qiymətlərlə',
    description:
      'Microsoft 365 lisenziyaları ən sərfəli qiymətlərlə, rəsmi Microsoft CSP partnyorundan. Noutbuklar, serverlər, şəbəkə avadanlığı və Huawei IdeaHub - sorğu əsasında.',
  },
  a11y: {
    skip: 'Əsas məzmuna keçin',
    openMenu: 'Menyunu açın',
    closeMenu: 'Menyunu bağlayın',
    language: 'Dil seçimi',
    close: 'Bağlayın',
    mainNav: 'Əsas naviqasiya',
    home: 'BUZ Tech - ana səhifə',
    breadcrumb: 'Naviqasiya yolu',
    quickContact: 'Birbaşa əlaqə',
  },
  notFound: {
    title: 'Səhifə tapılmadı',
    lead: 'Ünvan səhv yazılmış ola bilər və ya səhifə başqa yerə köçürülüb. Aşağıdan bölmə seçin.',
  },
  nav: {
    home: 'Ana səhifə',
    products: 'Məhsullar',
    services: 'Xidmətlər',
    about: 'Haqqımızda',
    contact: 'Əlaqə',
  },
  cta: 'Qiymət alın',
  hero: {
    title: 'Microsoft 365 lisenziyaları ən sərfəli qiymətlərlə',
    lead: 'Lisenziyalar, quraşdırma və dəstək - rəsmi Microsoft CSP partnyorundan.',
    points: ['Rəsmi Microsoft CSP partnyoru', 'Tenderlər üçün sənədlər', 'Satışdan sonra dəstək'],
    secondary: 'Pulsuz lisenziya auditi',
    stack: { top: 'Tətbiqlər', mid: 'Giriş və MFA', base: 'Bulud' },
  },
  pages: {
    'microsoft-365': {
      label: 'Microsoft 365',
      summary: 'Business və Enterprise planları, Copilot, Windows və Office.',
    },
    'it-equipment': {
      label: 'IT avadanlığı',
      summary: 'Noutbuklar, serverlər, şəbəkə avadanlığı və daha çoxu - sorğu əsasında.',
    },
    ideahub: {
      label: 'Huawei IdeaHub',
      summary: 'İclas otaqları və tədris məkanları üçün interaktiv lövhələr.',
    },
  },
  products: {
    m365: 'Microsoft 365 - planı hələ seçməmişəm',
    'business-basic': 'Microsoft 365 Business Basic',
    'business-standard': 'Microsoft 365 Business Standard',
    'business-premium': 'Microsoft 365 Business Premium',
    e3: 'Microsoft 365 E3',
    e5: 'Microsoft 365 E5',
    copilot: 'Microsoft 365 Copilot',
    'windows-office': 'Windows və Office lisenziyaları',
    azure: 'Azure',
    entra: 'Entra ID',
    dynamics: 'Dynamics 365',
    audit: 'Pulsuz lisenziya auditi',
    laptops: 'Noutbuklar və kompüterlər',
    servers: 'Serverlər və məlumat saxlama sistemləri',
    networking: 'Şəbəkə avadanlığı',
    printers: 'Printerlər və digər avadanlıq',
    ideahub: 'Huawei IdeaHub',
    documents: 'Tender üçün şirkət sənədləri',
  },
  productLinks: { heading: 'Məhsullar' },
  beat: {
    title: 'Microsoft 365 üçün ən sərfəli qiymətlər',
    text: 'Rəsmi Microsoft CSP partnyoru olaraq Microsoft 365 lisenziyalarını ən sərfəli qiymətə təklif edirik. Nəyə ehtiyacınız olduğunu bizə yazın, sizinlə əlaqə saxlayacağıq.',
  },
  included: {
    heading: 'Hər sifarişə daxildir',
    items: [
      { icon: 'documents', title: 'Tenderlər üçün sənədlər', text: 'Şirkət sənədləri və ISO sertifikatları.', action: 'Sənədləri tələb edin' },
      {
        icon: 'renewals',
        title: 'Yenilənmə xatırlatmaları',
        text: 'Lisenziyalarınızın müddətini vaxtında uzatmağı xatırladırıq ki, xidmətləriniz fasiləsiz işləsin.',
      },
      { icon: 'support', title: 'Satışdan sonra dəstək', text: 'Suallar, dəyişikliklər, yeni istifadəçilər - əlaqədə qalırıq.' },
    ],
  },
  home: {
    m365: {
      heading: 'İstənilən ölçüdə şirkət üçün Microsoft 365',
      lead: 'Kiçik komandalardan böyük korporasiyalara qədər - istənilən miqyasda biznesə uyğundur. Doğru planı seçməyə və onu quraşdırmağa kömək edirik.',
      compare: 'Planları müqayisə edin',
      rows: [
        { name: 'Business Basic, Standard, Premium', text: '300 istifadəçiyədək şirkətlər üçün' },
        { name: 'E3 və E5', text: 'Böyük təşkilatlar üçün, istifadəçi limiti olmadan' },
        { name: 'Copilot', text: 'Word, Excel, Outlook və Teams daxilində AI köməkçisi' },
        { name: 'Windows və Office', text: 'Kompüterləriniz üçün lisenziyalar' },
      ],
    },
    onRequest: {
      heading: 'Qalan hər şey - sorğu əsasında',
      lead: 'Noutbuklar, server və ya iclas otağı üçün lövhə də lazımdır? Nəyə ehtiyacınız olduğunu bizə bildirin - biz tədarük edəcəyik.',
    },
    friends: {
      heading: 'Satışdan sonra dost qalırıq',
      people: {
        irakli: { name: 'İrakli Mçedlişvili', role: 'Baş direktor' },
        soso: { name: 'Soso Rtveliaşvili', role: 'Biznesin inkişafı üzrə menecer' },
      },
    },
    proof: {
      heading: 'Beynəlxalq IT inteqrator',
      credentials: 'Tərəfdaşlıq və təcrübə',
      partner: 'Rəsmi Microsoft CSP partnyoru',
      cspText:
        'Microsoft bizə öz bulud lisenziyalarını birbaşa satmaq və idarə etmək səlahiyyəti verir. Lisenziyalarınız şirkətinizin öz hesabında qalır, yenilənmə və dəyişiklikləri isə biz həyata keçiririk.',
      countries: '5 ölkədə fəaliyyət göstəririk',
    },
  },
  m365: {
    lead: 'İstənilən ölçüdə şirkət üçün Microsoft 365 lisenziyaları, ən sərfəli qiymətə - rəsmi Microsoft CSP partnyorundan.',
    business: {
      heading: 'Business planları, 300 istifadəçiyədək',
      lead: 'Kiçik və orta şirkətlər üçün üç plan. Hansının sizə uyğun olduğunu bilmirsiniz? Bizimlə əlaqə saxlayın - uyğun planı tövsiyə edəcəyik.',
      plans: {
        'business-basic': {
          who: 'Brauzerdə işləyən komandalar üçün: e-poçt, çat və fayllar.',
          includes: [
            'Outlook ilə korporativ e-poçt, həmçinin Teams',
            'Hər istifadəçiyə 1 TB OneDrive yaddaşı',
            'Brauzerdə və telefonlarda Word, Excel və PowerPoint',
            'MFA ilə qorunan giriş',
          ],
        },
        'business-standard': {
          who: 'Kompüterlərində tam Office tətbiqlərinə ehtiyacı olan komandalar üçün.',
          includes: [
            'Kompüter üçün Word, Excel, PowerPoint və Outlook',
            'Hər istifadəçi üçün 5-ə qədər PC və ya Mac, həmçinin planşetlər və telefonlar',
          ],
        },
        'business-premium': {
          who: 'Həssas məlumatlar saxlayan və ya çoxlu cihaz idarə edən şirkətlər üçün.',
          includes: [
            'Intune ilə cihazların idarə edilməsi',
            'Fişinq və zərərli proqramlardan qabaqcıl qoruma',
            'Şərti giriş: kimin və haradan daxil ola biləcəyinə dair qaydalar',
          ],
        },
      },
      plus: '{plan} planındakı hər şey, üstəlik:',
    },
    extras: {
      heading: 'Böyük şirkətlər və əlavələr',
      lead: '300-dən çox istifadəçisi olan təşkilatlar, gündəlik işdə AI, həmçinin yalnız Windows və ya Office tələb edən kompüterlər üçün.',
      items: {
        e3: 'Böyük təşkilatlar üçün: tam Office tətbiqləri, cihazların idarə edilməsi və uyğunluq alətləri, istifadəçi sayına limit olmadan.',
        e5: 'E3-dəki hər şey, üstəlik Microsoft-un ən qabaqcıl təhlükəsizlik, uyğunluq və analitika imkanları.',
        copilot:
          'Microsoft 365 planınıza əlavə: Word, Excel, PowerPoint, Outlook və Teams daxilində şirkətinizin məlumatları ilə işləyən AI köməkçisi.',
        'windows-office':
          'Windows və Office lisenziyaları, o cümlədən abunəyə ehtiyacı olmayan kompüterlər üçün birdəfəlik alış versiyaları.',
      },
    },
    terms: {
      heading: 'Sadə dillə',
      items: [
        {
          term: 'MFA',
          text: 'Çoxfaktorlu autentifikasiya: daxil olarkən əlavə yoxlama, məsələn, telefona gələn kod. Oğurlanmış parol artıq tək başına kifayət etmir.',
        },
        {
          term: 'SSO',
          text: 'Vahid giriş: hər biri üçün ayrıca parol əvəzinə e-poçt, fayllar və digər iş tətbiqləri üçün bir korporativ hesab.',
        },
        {
          term: 'Intune',
          text: 'Şirkətin noutbuk və telefonlarını bir yerdən quraşdırmaq və qorumaq: parametrlər, yeniləmələr və itirilmiş cihazdakı məlumatların silinməsi.',
        },
        {
          term: 'CSP partnyoru',
          text: 'Microsoft-un bulud lisenziyalarını birbaşa satan və idarə edən rəsmi partnyor. Lisenziyalarınız şirkətinizin öz hesabında qalır, yenilənmələri isə biz idarə edirik.',
        },
      ],
    },
    cloud: {
      heading: 'Azure, Entra ID və Dynamics 365',
      lead: 'Bulud, giriş və biznes tətbiqləri.',
      items: {
        azure: {
          text: 'Microsoft-un bulud platforması: serverlər, yaddaş, ehtiyat nüsxələr və AI xidmətləri.',
          specs: ['Bulud serverləri və yaddaş', 'Ehtiyat nüsxələmə və bərpa', 'AI xidmətləri'],
        },
        entra: {
          text: 'Bütün komandanız üçün daxil olma və giriş hüquqları - bir yerdə.',
          specs: ['Vahid giriş (SSO)', 'Çoxfaktorlu autentifikasiya (MFA)', 'Şərti giriş'],
        },
        dynamics: {
          text: 'Microsoft-un biznes tətbiqləri: müştərilər, satış və maliyyə - bir sistemdə.',
          specs: ['Satış və müştəri xidməti', 'Maliyyə və Business Central', 'Lisenziyalar, quraşdırma sorğu əsasında'],
        },
      },
    },
  },
  equipment: {
    lead: 'Avadanlıq da lazımdır? Bizə spesifikasiyanı göndərin, ən sərfəli şərtlərlə tədarük edəcəyik.',
    heading: 'Nələri tədarük edə bilərik',
    items: {
      laptops: 'Biznes noutbukları, stolüstü kompüterlər və monitorlar - bir əməkdaş və ya bütün ofis üçün.',
      servers: 'Serverlər, məlumat saxlama və ehtiyat nüsxələmə sistemləri, şirkətinizin ölçüsünə uyğun.',
      networking: 'Kommutatorlar, Wi-Fi giriş nöqtələri, routerlər və firewall-lar.',
      printers: 'Printerlər, periferiya, aksesuarlar - və ofisinizə lazım olan hər şey.',
    },
    howHeading: 'Tədarük necə işləyir',
    how: [
      {
        title: 'Nə lazım olduğunu deyin',
        text: 'Model, texniki göstəricilər və ya sadəcə avadanlığın görəcəyi iş. Zəng edin, WhatsApp-da yazın və ya formu göndərin.',
      },
      { title: 'Ən yaxşı qiyməti tapırıq', text: 'Təchizatçılarımızdan qiymət sorğulayır və sizə təkliflə qayıdırıq.' },
      {
        title: 'Ofisinizə çatdırılma',
        text: 'Avadanlıq istehsalçı zəmanəti ilə ofisinizə çatdırılır.',
      },
    ],
  },
  ideahub: {
    tagline: 'Proyektor və lövhə əvəzinə bir ekran.',
    specs: ['İnteraktiv lövhə', 'Videokonfrans', 'Simsiz təqdimat', 'İclas otaqları və tədris məkanları üçün'],
    ask: 'Otağınıza hansı ölçünün uyğun olduğunu bilmirsiniz? Bizimlə əlaqə saxlayın, kömək edək.',
    photoAlt: 'Ofis divarında Huawei IdeaHub S2',
  },
  services: {
    heading: 'Xidmətlər',
    lead: 'Alışdan əvvəl - pulsuz lisenziya auditi. Sonra - quraşdırma, dəstək və yenilənmə xatırlatmaları. Əlaqədə qalırıq.',
    audit: {
      title: 'Pulsuz lisenziya auditi',
      text: 'Mövcud Microsoft lisenziyalarınızı yoxlayır və hansını saxlamaq, dəyişmək və ya ləğv etmək lazım olduğunu göstəririk. Pulsuz və heç bir öhdəlik olmadan.',
      points: [
        'İstifadə olunmayan lisenziyalar',
        'İş tərzinizə uyğun gəlməyən planlar',
        'Təkrarlanan abunələr',
        'Yenilənmə tarixləri - bir siyahıda',
      ],
      cta: 'Pulsuz audit tələb edin',
    },
    items: [
      {
        id: 'setup',
        title: 'Quraşdırma və miqrasiya',
        text: 'Microsoft 365, Azure və Entra ID-ni sizin üçün quraşdırır, e-poçt və faylları köhnə sistemdən köçürürük.',
      },
      {
        id: 'support',
        title: 'Davamlı dəstək',
        text: 'Suallar, yeni istifadəçilər, dəyişikliklər, problemlər - satışdan sonra hər növ dəstək.',
      },
      {
        id: 'supply',
        title: 'Avadanlıq tədarükü',
        text: 'Noutbuklar, serverlər, şəbəkə avadanlığı və Huawei IdeaHub - sizin üçün tapır və çatdırırıq.',
      },
    ],
    stepsHeading: 'Necə işləyirik',
    steps: [
      { title: 'Sorğu', text: 'Zəng edin, WhatsApp-da yazın və ya formu göndərin.' },
      { title: 'Təklif', text: 'Sizə qiymət və uyğun plan və ya avadanlıq təklif edirik.' },
      { title: 'Çatdırılma və quraşdırma', text: 'Lisenziyalar aktivləşdirilir, avadanlıq çatdırılır.' },
      { title: 'Dəstək', text: 'Əlaqədə qalırıq: yenilənmə xatırlatmaları və ehtiyac duyduğunuz zaman kömək.' },
    ],
  },
  clients: {
    heading: 'Müştərilərimiz',
    lead: 'BUZ Tech baş ofisi Çexiya Respublikasında yerləşən beynəlxalq IT inteqratordur. Azərbaycan, Gürcüstan, Türkiyə, Özbəkistan və Qazaxıstanda həm özəl, həm də dövlət sektoru ilə işləyirik.',
    more: 'Müştərilərimiz arasında Microsoft həlləri ilə işləyən dövlət qurumları, həmçinin Azərbaycan, Gürcüstan, Türkiyə, Özbəkistan və Qazaxıstanın aparıcı dövlət və özəl şirkətləri var.',
    sectorsHeading: 'İşlədiyimiz sektorlar',
    sectors: ['Energetika', 'Sığorta', 'Səhiyyə', 'Dövlət sektoru', 'Otel biznesi', 'Mədən sənayesi', 'Aviasiya', 'Kənd təsərrüfatı və süd istehsalı'],
  },
  events: {
    heading: 'Sənaye tədbirlərində',
    lead: 'Sənaye konfranslarında və tərəfdaş tədbirlərində iştirak edirik - müxtəlif ölkələrdə.',
    items: {
      antalya: {
        title: 'Bulud texnologiyaları konfransı',
        place: 'Antalya, sentyabr 2026',
        alt: 'Antalyada konfrans sessiyasının iştirakçıları',
      },
      conference: {
        title: 'Texnologiya konfransı',
        place: 'Tbilisi, iyul 2026',
        alt: 'Səhnədəki natiqi dinləyən dolu zal',
      },
      club: {
        title: 'IT biznes klubunun görüşü',
        place: 'Tbilisi, 2026',
        alt: 'BUZ Tech komandası görüşdə digər qonaqlarla söhbət edir',
      },
    },
  },
  distributor: {
    heading: 'Gürcüstanda Huawei eKit distribütoru',
    lead: 'BUZ Tech Georgia Huawei ilə eKit xətti üzrə Gold distribusiya müqaviləsi imzalayıb. eKit Huawei\u2011in kiçik və orta biznes üçün məhsul xəttidir. İmzalanmanı müxtəlif sektorlardan olan müştərilər üçün tədbirlə qeyd etdik.',
    photos: {
      guests: { caption: 'Tədbirdə qonaqlarla', alt: 'Konfrans zalında kostyumlu və bejli dörd kişi' },
      certificates: { caption: 'Tədbirdə təqdim olunan sertifikatlar', alt: 'Huawei IdeaHub banneri qarşısında iki çərçivəli sertifikat tutan üç nəfər' },
    },
  },
  contact: {
    heading: 'Bizimlə əlaqə',
    lead: 'Şirkətinizi və nəyə ehtiyacınız olduğunu bildirin - sizinlə əlaqə saxlayacağıq.',
    detailsTitle: 'Əlaqə məlumatları',
    entity: 'Hüquqi şəxs',
    location: 'Ünvan',
    address: 'Ziya Bünyadov prospekti 1965, Çinar Park Biznes Mərkəzi, 2-ci bina, Bakı, Azərbaycan',
    phone: 'Telefon',
    whatsapp: 'WhatsApp-da yazın',
    email: 'E-poçt',
    call: 'Zəng edin',
    fields: {
      company: 'Şirkətin adı',
      email: 'E-poçt',
      phone: 'Telefon',
      product: 'Nə lazımdır',
      quantity: 'Miqdar',
      message: 'Mesaj',
    },
    placeholders: {
      company: 'məs., Şirkətiniz MMC',
      email: 'name@company.az',
      quantity: 'Məs., 25 istifadəçi',
      message: 'Məsələn: hazırkı planınız və ya nəyi dəyişmək istəyirsiniz',
    },
    optional: 'istəyə bağlı',
    selectPlaceholder: 'Seçin',
    groups: { microsoft: 'Microsoft', equipment: 'IT avadanlığı', company: 'BUZ Tech' },
    next: {
      heading: 'Bundan sonra nə olur',
      steps: [
        'Sorğunuza baxırıq.',
        'Təfərrüatları razılaşdırmaq üçün sizinlə telefon və ya e-poçt vasitəsilə əlaqə saxlayırıq.',
        'Təklifimizi alırsınız, təsdiqinizdən sonra isə sifarişi icra edirik.',
      ],
    },
    other: 'Digər',
    required: 'Bu xananı doldurun',
    invalidEmail: 'Düzgün e-poçt ünvanı daxil edin, məs., name@company.az',
    status: {
      sending: 'Göndərilir…',
      mailto: 'E-poçt proqramınız açıldı. Sorğunu tamamlamaq üçün orada “Göndər” düyməsini basın.',
      error: 'Sorğu göndərilmədi. Yenidən cəhd edin və ya {email} ünvanına yazın.',
    },
    mailSubject: { price: 'Qiymət sorğusu', audit: 'Pulsuz audit sorğusu', documents: 'Sənəd sorğusu' },
    documentsCta: 'Sənədləri tələb edin',
    thanks: {
      heading: 'Təşəkkür edirik - sorğunuz qəbul olundu',
      text: 'Detalları dəqiqləşdirmək üçün sizə zəng edəcəyik və ya yazacağıq.',
      urgent: 'Təcilidir? Bizə zəng edin və ya WhatsApp-da yazın.',
      again: 'Yeni sorğu göndərin',
    },
    privacyNote: 'Məlumatlarınızdan yalnız bu sorğuya cavab vermək üçün istifadə edirik.',
    privacyLink: 'Məxfilik',
  },
  footer: {
    overview:
      'BUZ Tech rəsmi Microsoft CSP partnyorudur. Microsoft 365 lisenziyalarını ən sərfəli qiymətlərlə təqdim edirik, şirkətin qalan IT ehtiyaclarını isə sorğu əsasında qarşılayırıq.',
    presence: { hqLabel: 'Baş ofis', hq: 'Çexiya', branchesLabel: 'Filiallar', branches: ['Azərbaycan', 'Gürcüstan', 'Türkiyə', 'Özbəkistan', 'Qazaxıstan'] },
    quickLinks: 'Sürətli keçidlər',
    contactTitle: 'Əlaqə',
    complianceTitle: 'Standartlar və tərəfdaşlıq',
    rights: 'Bütün hüquqlar qorunur.',
    social: 'Sosial şəbəkələr',
    privacy: 'Məxfilik',
  },
  privacy: {
    title: 'Məxfilik siyasəti',
    intro: 'Bu səhifə qiymət sorğusu formasının hansı məlumatları topladığını və onlardan necə istifadə etdiyimizi izah edir.',
    sections: [
      {
        heading: 'Nə toplayırıq',
        body: 'Formada şirkətinizin adını, e-poçtunuzu, istəsəniz telefon nömrənizi, nəyə ehtiyacınız olduğunu və mesajınızı qeyd edirsiniz. Vebsayt başqa heç bir şəxsi məlumat tələb etmir.',
      },
      {
        heading: 'Nə üçün istifadə edirik',
        body: 'Məlumatlardan yalnız sorğunuzu emal etmək və qiymətlə bağlı sizinlə əlaqə saxlamaq üçün istifadə edirik.',
      },
      {
        heading: 'Məlumatları kim alır',
        body: 'Sorğu LLC BUZ Tech Georgia şirkətinin info-ge@buz-cloud.com e-poçt qutusuna çatdırılır. Onu oraya formların çatdırılması xidməti apara bilər; bu xidmət məlumatları yalnız həmin ünvana ötürür.',
      },
      {
        heading: 'Cookie faylları və dil',
        body: 'Vebsayt cookie fayllarından istifadə etmir və brauzerinizdə heç nə saxlamır. Dil səhifə ünvanının bir hissəsidir; ana səhifəni açdığınız zaman sayt ölkənizə və brauzer parametrlərinizə əsasən dili sizin üçün seçə bilər.',
      },
      {
        heading: 'Hüquqlarınız',
        body: 'Haqqınızda hansı məlumatları saxladığımızı öyrənmək və ya onların silinməsini tələb etmək üçün info-ge@buz-cloud.com ünvanına yazın.',
      },
    ],
    analyticsOn: 'Vebsayta baxışları Cloudflare Web Analytics ilə hesablayırıq. O, cookie fayllarından istifadə etmir və şəxsi məlumat toplamır.',
    analyticsOff: '',
    updated: 'Yenilənib: noyabr 2026',
  },
};
