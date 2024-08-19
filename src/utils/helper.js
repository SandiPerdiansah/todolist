const generatedIds = new Set();

const generateUniqueId = () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    if (generatedIds.has(id)) {
        return generateUniqueId();
    }
    generatedIds.add(id);
    return id;
};


const priorities = [
    {color: '#ED4C5C', value: 'Very High'},
    {color: '#F8A541', value: 'High'},
    {color: '#00A790', value: 'Medium'},
    {color: '#428BC1', value: 'Low'},
    {color: '#8942C1', value: 'Very Low'},
];


export {generateUniqueId, priorities};