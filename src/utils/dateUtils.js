export const formatDate = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatShortDate = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleDateString('tr-TR');
}; 