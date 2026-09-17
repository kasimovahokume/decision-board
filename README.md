# Decision Board

NV ProjectLab — Frontend Interview Task

Sadə bir Decision Board tətbiqi. İstifadəçi bir mövzu (sual) yazır, həmin mövzuya aid seçimlər əlavə edir, seçimlərdən birini seçir və nəticəni görür.

Nümunə:
- Where should I study?
  - Library
  - Home
  - Cafe

---

## Texnologiyalar

- React (Vite)
- TypeScript
- Tailwind CSS
- LocalStorage (məlumat saxlama)

Backend istifadə olunmayıb. Bütün məlumatlar brauzerin localStorage-ında saxlanılır.

---

## Əsas funksiyalar

- Yeni decision yaratmaq
- Decision-a seçimlər əlavə etmək
- Seçimlərdən birini seçmək
- Nəticəni göstərmək
- Decision-u silmək
- Bir neçə decision arasında keçid etmək
- Responsive dizayn (desktop və mobile)

---

## Qərar verdiyim texniki yanaşmalar
1. Layihə strukturu

Kodu Feature-Sliced Design prinsiplərinə yaxın qurdum:

    features/decisions — əsas biznes məntiqi (komponentlər, hook-lar, tiplər)
    shared — ortaq UI komponentləri və hook-lar
    app — giriş nöqtəsi

Hər komponent yalnız öz işini görür. Məsələn:

    DecisionForm — yalnız yaratma forması
    DecisionDetail — seçim və nəticə
    Sidebar — siyahı və naviqasiya
    OptionItem — tək seçim düyməsi

---
2. State idarəetməsi

Bütün decision məlumatları useDecisions custom hook-u ilə idarə olunur.

Daxilində useLocalStorage hook-u var. Bu sayədə:

    Səhifə yenilənəndə məlumatlar itmir
    localStorage oxuma/yazma məntiqi bir yerdə toplanıb

Hər decision belə bir struktura malikdir:

    id
    title
    options[]
    selectedOptionId (seçim edilməyibsə null)
    createdAt
---
3. Multiple click problemi

Taskda verilən sual: istifadəçi eyni seçimə bir neçə dəfə klik etsə, nəticənin səhv hesablanmaması üçün bunu necə idarə etmək olar?

Həllim iki səviyyədədir:

State səviyyəsində:
selectOption funksiyasında yoxlayıram — əgər selectedOptionId artıq null deyilsə, funksiya dərhal dayandırılır və state dəyişmir.

UI səviyyəsində:
Seçim edildikdən sonra bütün option düymələri disabled olur. Seçilməyən variantlar solğunlaşır, seçilmiş variant isə qalır.

---
4. UI / UX yanaşması

    shared/ui altında təkrar istifadə olunan komponentlər yazdım: Button, Input, Card, Modal, EmptyState
    Silmə əməliyyatında birbaşa silmirəm. Əvvəl təsdiq modalı açılır
    Heç bir decision yoxdursa EmptyState göstərilir
    Mobile-da sidebar hamburger menyu ilə açılır/bağlanır
    Seçim edildikdən sonra nəticə qutusu çıxır
---
5. Performance

    Lazım olan yerlərdə useCallback və useMemo istifadə etdim
    Siyahı və option komponentlərini React.memo ilə sarıdım
    Mobile sidebar məntiqini ayrıca useMobileSidebar hook-una çıxartdım
---
6. TypeScript

Bütün domain modelləri və komponent props tipləri ayrıca types qovluqlarında saxlanılır:

    features/decisions/types
    shared/types
