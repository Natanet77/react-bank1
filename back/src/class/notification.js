class Notification {
  constructor(message, type) {
    this.message = message
    this.type = this.isValidType(type) ? type : 'Unknown'
    this.time = new Date()
  }
  isValidType(type) {
    return type === 'Announcement' || type === 'Warning'
  }
}

module.exports = Notification
