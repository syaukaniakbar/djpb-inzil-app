const formatDateTime = (value: string) =>
    new Date(value).toLocaleString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).replace('.', ':');

export default formatDateTime;