export const getColor = (category: string) => {
    switch (category) {
        case 'shopping':
            return '#cc85ff';
        case 'business':
            return '#facd39';
        case 'other':
            return '#0ad4ef';
        default:
            return '#ccc';
    }
};

export const getStripeBackground = (categories: string[]) => {
    if (!Array.isArray(categories) || categories.length === 0) {
        return '#ccc';
    }

    const step = 100 / categories.length;
    const colorStops = categories.map((cat, index) => {
        const color = getColor(cat);
        const from = step * index;
        const to = step * (index + 1);
        return [`${color} ${from}%`, `${color} ${to}%`];
    });
    console.log(`linear-gradient(to bottom, ${colorStops.join(', ')})`);
    return `linear-gradient(to bottom, ${colorStops.join(', ')})`;
};
