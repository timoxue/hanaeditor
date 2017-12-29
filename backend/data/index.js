function ConnData(name) {
    this.name,
    this.toggled = false,
    this.loading = false,
    this.children = [],
    this.parent = name
}

ConnData.prototype.addChildren = function(ConnData) {
    this.children.push(ConnData)
    ConnData.parent = this.name
}

module.exports = ConnData