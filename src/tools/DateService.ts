class DateService {
  now() {
    return new Date()
  }

  lastDay(day: number) {
    const now = this.now()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - day)
  }
}

export default new DateService()
