export const formatedDate = (date) => {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return new Date(date).toLocaleDateString('id-ID', options);
};