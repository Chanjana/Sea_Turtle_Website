
console.info("Payment Page loaded!");


// payment.js
document.addEventListener('alpine:init', () => {
  Alpine.data('payDetails', () => ({
    cardnumber: '',
    expieryDate: '',
    cvc: '',
    cardname: '',
    invalidExpiryDate: false,

    // Function to save payment details to local storage
    nameOnCard() {
      // Remove any non-letter characters from the cardname
      this.cardname = this.cardname.replace(/[^A-Za-z\s]/g, '');
     
    },

    // Function to load payment details from local storage

    // to validate and save the expiry date
    validateAndSaveexpieryDate() {
      const datePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
      if (this.expieryDate.match(datePattern)) {
        const [month, year] = this.expieryDate.split('/');
        const today = new Date();
        const currentYear = today.getFullYear() % 100; // Extract the last two digits of the current year

        // Check if the year is in the future or if the year is the current year and the month is not expired yet
        if (parseInt(year, 10) > currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) >= today.getMonth() + 1)) {
          // Valid expiry date, save it to local storage
          localStorage.setItem('expieryDate', this.expieryDate);
          this.invalidExpiryDate = false;
          return;
        }
      }

      // Invalid expiry date, clear the local storage key
      localStorage.removeItem('expieryDate');
      this.invalidExpiryDate = true;
    },


      // Function to navigate to the next step
    goToConfirmation() {
      
      window.location.href = 'confirmation.html';
    }

  

  }));
});

