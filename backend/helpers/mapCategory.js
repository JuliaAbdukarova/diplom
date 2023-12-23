module.exports = function(category) {
    return {
        id: category.id,
        description: category.description,
        direction: category.direction,
        user: category.user,
        iconUrl: category.iconUrl
    }
}