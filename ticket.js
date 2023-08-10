document.addEventListener('alpine:init', () => {
    Alpine.data('tickets', () => ({
        date: null,
        totalPrice: 0,
        duration: 0,
        guestTicketTypes: [
            {
                name: 'Sri Lankan Adult',
                peak: 4,
                offPeak: 6,
                count: 0,
                total: 0
            },
            {
                name: 'Sri Lankan Child',
                peak: 2,
                offPeak: 3,
                count: 0,
                total: 0
            },
            {
                name: 'Foreign Adult',
                peak: 10,
                offPeak: 13,
                count: 0,
                total: 0
            },
            {
                name: 'Foreign Child',
                peak: 5,
                offPeak: 8,
                count: 0,
                total: 0
            },
            {
                name: 'Infant',
                peak: 0,
                offPeak: 0,
                count: 0,
                total: 0
            },
        ],
        availableTimeSlots: [
            {
                title: '7AM to 8AM',
                isPeak: false
            },
            {
                title: '8AM to 9AM',
                isPeak: false
            },
            {
                title: '9AM to 10AM',
                isPeak: false
            },
            {
                title: '10AM to 11AM (Peak)',
                isPeak: true
            },
            {
                title: '11AM to 12PM (Peak)',
                isPeak: true
            },
            {
                title: '12PM to 1PM (Peak)',
                isPeak: true
            },
            {
                title: '1PM to 2PM',
                isPeak: false
            },
            {
                title: '2PM to 3PM',
                isPeak: false
            },
            {
                title: '3PM to 4PM (Peak)',
                isPeak: true
            },
            {
                title: '4PM to 5PM (Peak)',
                isPeak: true
            },
            {
                title: '5PM to 6PM (Peak)',
                isPeak: true
            },
        ],

        selectedTimeSlots: [], 

        showTimes: false,
        //------- Functions -------

        selectTimeSlot(index) {

            // check if the index is already in the array
            if (this.selectedTimeSlots.includes(index)) {

                // remove the index from the array
                this.selectedTimeSlots = this.selectedTimeSlots.filter(item => item !== index);

            } else {

                // Todo - you should be able to select time slots in the past !!!

                // get the last element of the array
                let lastElement = this.selectedTimeSlots[this.selectedTimeSlots.length - 1];

                // add 1 to the last element and check if the value is equals to the index
                if (!this.selectedTimeSlots.length || index - 1 == lastElement) {

                    // add the index to the array
                    this.selectedTimeSlots.push(index); 

                } else {
                    alert('Kindly pick time slots that follow a consecutive order :)');
                }
            }

            // sort the array
            this.selectedTimeSlots = this.selectedTimeSlots.sort();
            this.duration = this.selectedTimeSlots.length;

            console.log(this.selectedTimeSlots);

        },

        calculate(ticketType) {

            let total = 0;

            this.selectedTimeSlots.forEach((timeSlotIndex) => {

                // calculate the total
                total += parseInt(ticketType.count * (this.availableTimeSlots[timeSlotIndex].isPeak ? ticketType.peak : ticketType.offPeak));
            });

            ticketType.total = total;

            this.calculateTotal();


        },

        calculateTotal(ticketType) {

            let totalPrice = 0;

            this.guestTicketTypes.forEach((guestTicketType) => { //here instead of total (key) we use the singular term of array name
                
                // calculate the total
                totalPrice += guestTicketType.total;// can't directly access JSON objects inside the array
            });

            this.totalPrice = totalPrice;

            console.log("Total price equal ", totalPrice);
        },






        gotoDetails() {
            // store the data in the local storage
            localStorage.setItem('guestTicketTypes', JSON.stringify(this.guestTicketTypes));
            localStorage.setItem('selectedTimeSlots', JSON.stringify(this.selectedTimeSlots));
            localStorage.setItem('availableTimeSlots', JSON.stringify(this.availableTimeSlots));//changes i made
            
            localStorage.setItem('date', this.date);
            localStorage.setItem('totalPrice', this.totalPrice);
            localStorage.setItem('duration', this.duration);

            // redirect to the details page
            if(this.totalPrice != 0){
                window.location.href = 'details.html';   
            }
        }

    }));
})