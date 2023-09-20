function formatDate(date: Date): string{
    return date.toString().split(' ').slice(0, 4).join(' ');
}

export {
    formatDate
}