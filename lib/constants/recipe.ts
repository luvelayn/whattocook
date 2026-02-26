const COOKING_TIME_OPTIONS: { value: TCookingTime; label: string }[] = [
    {value: 'quick', label: 'До 30 минут'},
    {value: 'medium', label: '30–60 минут'},
    {value: 'long', label: 'Более часа'},
];

const MEAL_TYPE_OPTIONS: { value: TMealType; label: string }[] = [
    {value: 'breakfast', label: 'Завтрак'},
    {value: 'lunch', label: 'Обед'},
    {value: 'dinner', label: 'Ужин'},
    {value: 'snack', label: 'Перекус'},
    {value: 'dessert', label: 'Десерт'},
    {value: 'salad', label: 'Салат'},
    {value: 'drink', label: 'Напиток'},
];

const CUISINE_OPTIONS: { value: TCuisine; label: string }[] = [
    {value: 'russian', label: 'Русская'},
    {value: 'italian', label: 'Итальянская'},
    {value: 'asian', label: 'Азиатская'},
    {value: 'caucasian', label: 'Кавказская'},
    {value: 'mexican', label: 'Мексиканская'},
    {value: 'american', label: 'Американская'},
    {value: 'mediterranean', label: 'Средиземноморская'},
    {value: 'indian', label: 'Индийская'},
    {value: 'middle eastern', label: 'Ближневосточная'},
    {value: 'international', label: 'Интернациональная'},
    {value: 'other', label: 'Другая'},
];

const UNIT_OPTIONS: { value: TUnit; label: string }[] = [
    {value: 'g', label: 'г'},
    {value: 'kg', label: 'кг'},
    {value: 'ml', label: 'мл'},
    {value: 'l', label: 'л'},
    {value: 'tbsp', label: 'ст. л.'},
    {value: 'tsp', label: 'ч. л.'},
    {value: 'cup', label: 'стакан'},
    {value: 'piece', label: 'шт.'},
];