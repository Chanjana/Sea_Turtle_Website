console.info("customer details store loaded!");
document.addEventListener('alpine:init', () => {
    Alpine.data('customer', () => ({
        fullName: '',
        email: '',
        confirmEmail: '',
        gender: '',
        emailError: false,
        phone: '',
        countryCode: '',



        loadDetailsFromLocalStorage() {
            // List of keys in localStorage that we want to retrieve and sync
            const localStorageKeys = [
                'fullName', 'email', 'confirmEmail', 'emailError',
                'gender', 'countryCode', 'phone'
            ];

            // Loop through each localStorage key
            localStorageKeys.forEach(key => {
                // Retrieve stored value from localStorage
                const storedValue = localStorage.getItem(key);
                // If a value is stored, update the corresponding property in the component
                if (storedValue !== null) {
                    // Special handling for 'emailError' to convert string to boolean
                    this[key] = key === 'emailError' ? storedValue === 'true' : storedValue;
                }
            });

            // Watch for changes in 'emailError' and save to localStorage
            this.$watch('emailError', newValue => {
                localStorage.setItem('emailError', newValue.toString());
            });

            // Initialize phone input using intlTelInput library
            const phoneInput = document.querySelector('.phone-input');
            const iti = window.intlTelInput(phoneInput, {
                initialCountry: this.countryCode || 'auto',
                separateDialCode: true,
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js'
            });

            // Update 'phone' property as phone input changes
            phoneInput.addEventListener('input', () => {
                this.phone = iti.getNumber();
            });

            // Update 'countryCode' property as selected country changes
            phoneInput.addEventListener('countrychange', () => {
                this.countryCode = iti.getSelectedCountryData().iso2;
                this.saveCountryCodeToStorage(this.countryCode);
            });

            // Set initial values from local storage
            if (storedCountryCode) {
                this.countryCode = storedCountryCode;
                iti.setCountry(storedCountryCode);
            }


        },


        saveCountryCodeToStorage(code) {
            localStorage.setItem('countryCode', code);
        },

        saveDetails() {
            localStorage.setItem('fullName', this.fullName);

            localStorage.setItem('email', this.email);
            localStorage.setItem('confirmEmail', this.confirmEmail);
            localStorage.setItem('gender', this.gender);
            // Combine countryCode and phone to phoneWithCountryCode
            this.phoneWithCountryCode = this.countryCode + ' ' + this.phone;

            // Save the combined phoneWithCountryCode to the phone key in local storage
            localStorage.setItem('phone', this.phone);
            localStorage.setItem('countryCode', this.countryCode); // Save the selected country code to local storage
        },

        validateEmail() {
            // Display the error only when the user starts typing in the confirm email box
            if (this.confirmEmail && this.email !== this.confirmEmail) {
                this.emailError = true;
            } else {
                this.emailError = false;
            }

            // Save email and confirmEmail to local storage as you type
            localStorage.setItem('email', this.email);
            localStorage.setItem('confirmEmail', this.confirmEmail);
        },

        restrictNonNumeric(event) {
            // Allow only numeric and control keys (ex- backspace, delete, arrow keys)
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter'];
            const inputValue = event.target.value;

            // Check if the pressed key is a numeric key or an allowed control key
            if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
                // Prevent the default action of the event (e.g., typing the character)
                event.preventDefault();
            }

            // If the input value contains non-numeric characters, remove them
            if (/\D/.test(inputValue)) {
                event.target.value = inputValue.replace(/\D/g, '');
            }
        },


        gotoPayment() {
            if (!this.fullName || !this.email || this.emailError || !this.phone) {
                // At least one of the required fields is empty, so prevent navigation
                return;
            }

            // All required fields have values, proceed to payment
            window.location.href = 'payment.html';
        }








    }));
})