function calculateAge(birthday) {
    const birthdate = new Date(birthday);
    const diff = Date.now() - birthdate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  module.exports = calculateAge