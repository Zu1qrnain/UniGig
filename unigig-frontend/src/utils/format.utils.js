export const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`
  }
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  export const formatRating = (rating) => {
    return parseFloat(rating).toFixed(1)
  }
  
  export const formatDelivery = (days) => {
    return days === 1 ? '1 day' : `${days} days`
  }
  
  export const formatCategory = (category) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  