const gifts = document.querySelectorAll(".gift");
// const formEl = document.getElementById('form');
const plans = document.querySelectorAll(".plans");
const taskbar = document.querySelector('.taskbar');
const nameEl = document.getElementById('name-el');
const emailEl = document.getElementById('email-el');
const goBack = document.getElementById('go-back');
const nextButton = document.getElementById('next-button');
const phoneEl = document.getElementById('phone-el');
const formButton = document.getElementById('form-button');
const confirmButton = document.getElementById('confirm');
const addonPrice = document.querySelectorAll(".add-on-price");
const sidebarNumber = document.querySelectorAll('.sidebar-num');
const allSteps = document.querySelectorAll(".steps-list-item");
const changePlansAndAddon = document.getElementById('change');
const toggleChecked = document.getElementById('toggle-checked');
const selectedAddon = document.getElementById('selected-add');
const formButtonOverlay = document.getElementById('form-button-overlay');
const customizeAddon = document.getElementById('customize-add');
const serviceContainer = document.querySelectorAll('.service-container');
const selectedAddonOne = document.getElementById('selected-add-one');
const nameError = document.querySelector(".name-label .error-message");
const emailError = document.querySelector(".email-label .error-message");
const phoneFieldNotification = document.getElementById('phone-field-notification');

let currentNumber = 0;
let isMonthly = true;
let inputEl;
let price = 0;
let selectedServices = [];

taskbar.classList.add('hidden');

formButton.addEventListener('click', (e) => {
    e.preventDefault();

    //   !Regular expressions
    const nameInputRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const emailInputRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneInputRegex =
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;


    if (nameInputRegex.test(nameEl.value)) {
        nameError.textContent = "";
    } else {
        nameError.textContent = "Your name is not valid";
    }

    if (emailInputRegex.test(emailEl.value)) {
        emailError.textContent = "";
    } else {
        emailError.textContent = "Your email is not valid";
    }

    if (phoneInputRegex.test(phoneEl.value)) {
        phoneFieldNotification.style.display = 'none';
        phoneEl.style.border = '1.2px solid hsl(229, 24%, 87%)';
        formButtonOverlay.classList.remove('hidden');
        taskbar.classList.remove('hidden');
        currentNumber = 1;
        goBack.style.display = "none";
        sidebarUpdate();
        update();
    } else {
        phoneFieldNotification.style.display = 'block';
        phoneEl.style.border = '1.2px solid hsl(354, 84%, 57%)';
        taskbar.classList.add('hidden');
    }

});

function sidebarUpdate() {
    sidebarNumber.forEach((sidebarNum, index) => {
        sidebarNum.addEventListener('click', () => {
            currentNumber = index
            update()
            if (index >= 1 && index <= 3) {
                sidebarNumber.forEach((num, i) => {
                    if (i >= 1 && i <= 3) {
                        num.classList.add("disabled")

                        num.addEventListener('click', () => {
                            phoneFieldNotification.style.display = 'block'
                        })

                    } else {
                        num.classList.remove("disabled")
                        num.addEventListener('click', () => {
                            phoneFieldNotification.style.display = 'none'
                        })
                    }
                })
            } else {
                sidebarNumber.forEach((num) => {
                    num.classList.remove("disabled")
                })
            }
        })
    })

}

allSteps.forEach((steps, index) => {
    if (index === currentNumber) {
        steps.classList.add('active')
    }
})

nextButton.addEventListener('click', () => {
    currentNumber++
    if (currentNumber === allSteps.length) {

    }
    update()
})

goBack.style.display = "none"
goBack.addEventListener('click', () => {
    currentNumber--
    if (currentNumber < 0) {
        currentNumber = allSteps - 1

    }
    update()
})

toggleChecked.addEventListener("click", () => {
    plans.forEach(plan => {
        const monthlyPlan = plan.querySelector(".price");
        const price = monthlyPlan.getAttribute("data-price");
        if (isMonthly) {
            toggleChecked.src = "assets/images/yearly.png";
            document.getElementById('year').style.color = "#02295a";
            document.getElementById('month').style.color = "#9699ab";
            const monthlyYearlyPlan = price.replace("$9/mo", "$90/yr")
                .replace("$12/mo", "$120/yr").replace("$15/mo", "$150/yr");
            monthlyPlan.innerHTML = monthlyYearlyPlan.replace("$", "$ ");
            monthlyPlan.setAttribute("data-price-toggle", monthlyYearlyPlan);
            gifts.forEach(discount => {
                discount.textContent = '2 months free';
            });
        } else {
            toggleChecked.src = "assets/images/month.png";
            document.getElementById('year').style.color = "#9699ab";
            document.getElementById('month').style.color = "#02295a";
            const monthlyYearlyPlan = price.replace("$90/yr", "$9/mo")
                .replace("$120/yr", "$12/mo").replace("$150/yr", "$15/mo");
            monthlyPlan.innerHTML = monthlyYearlyPlan.replace("$", "$ ");
            monthlyPlan.setAttribute("data-price", monthlyYearlyPlan);
            gifts.forEach(discount => {
                discount.textContent = '';
            });
        }
    })

    serviceContainer.forEach(servicePlans => {
        const addOnPrice = servicePlans.querySelector('.add-on-price');
        const price = addOnPrice.getAttribute('data-add');
        if (isMonthly) {
            const newAddOnPrice = price.replace('$1/mo', '$10/yr').replace('$2/mo', '$20/yr');
            addOnPrice.innerHTML = newAddOnPrice.replace('$', '$ ');
            addOnPrice.setAttribute("data-add-toggle", newAddOnPrice);
        } else {

            const newAddOnPrice = price.replace('$10/yr', '$1/mo').replace('$20/yr', '$2/mo');
            addOnPrice.innerHTML = newAddOnPrice.replace('$', '$ ');
            addOnPrice.setAttribute('data-add', newAddOnPrice);
        }
    })

    isMonthly = !isMonthly;
})


plans.forEach((plan, index) => {
    plan.addEventListener('click', function () {
        let planPrice = 0
        const title = this.querySelector('p').textContent.trim()
        const titleParts = title.split("$")
        const cleanTitle = titleParts[0].trim()

        if (isMonthly) {
            price = priceEl.getAttribute('data-price')
            planPrice = price
            pricePlan = parseFloat(planPrice.replace("$", ""))
            document.getElementById('plan-name').innerHTML = `${cleanTitle} (Monthly)`
            document.getElementById('price').innerHTML = price
        } else {
            price = priceEl.getAttribute('data-price-toggle')
            planPrice = price
            pricePlan = parseFloat(planPrice.replace("$", ""))
            document.getElementById('plan-name').innerHTML = `${cleanTitle} (Yearly)`
            document.getElementById('price').innerHTML = price
        }

        focusState(index)

        calculateTotalPrice()
    })
})

function focusState(clickedIndex) {
    plans.forEach((plan, index) => {
        if (index === clickedIndex) {
            plan.classList.add('focus-state')
        } else {
            plan.classList.remove('focus-state')
        }
    })
}

serviceContainer.forEach((servicePrice, index) => {
    servicePrice.addEventListener('click', function () {
        let selectedIndexPrice = 0
        let inputEl = this.querySelector('input[type=checkbox]')
        const addOnPriceEl = servicePrice.querySelector('.add-on-price')

        if (isMonthly) {
            price = addOnPriceEl.getAttribute('data-add')
            selectedIndexPrice = price
            selectedIndexPrice = parseInt(selectedIndexPrice.replace("$", ""))
        } else {
            price = addOnPriceEl.getAttribute('data-add-toggle')
            selectedIndexPrice = price
            selectedIndexPrice = parseInt(selectedIndexPrice.replace("$", ""))
        }

        inputEl.checked = !inputEl.checked

        if (inputEl.checked) {
            if (index === 0) {
                selectedServices[index] = selectedIndexPrice
                selectedAddon.innerHTML = `
                    <p id="addon-services">${titleText}</p>
                    <p id="addon-price">${price}</p>
                `
            } else if (index === 1) {
                selectedServices[index] = selectedIndexPrice
                selectedAddonOne.innerHTML = `
                    <p id="addon-services">${titleText}</p>
                    <p id="addon-price">${price}</p>
                `
            } else if (index === 2) {
                selectedServices[index] = selectedIndexPrice
                if (inputEl.checked) {
                    customizeAddon.innerHTML = `
                    <p id="addon-services">${titleText}</p>
                    <p id="addon-price">${price}</p>
                    `
                }
            }
        } else {
            if (index === 0) {
                selectedServices[index] = undefined
                selectedAddon.innerHTML = `
                    <p id="addon-services"></p>
                    <p id="addon-price"></p>
                `
            } else if (index === 1) {
                selectedServices[index] = undefined
                selectedAddonOne.innerHTML = `
                    <p id="addon-services"></p>
                    <p id="addon-price"></p>
                `
            } else if (index === 2) {
                selectedServices[index] = undefined
                customizeAddon.innerHTML = `
                    <p id="addon-services"></p>
                    <p id="addon-price"></p>
                `
            }
        }

        focusAddon(index)
        calculateTotalPrice()
    })
})


function focusAddon() {
    serviceContainer.forEach((addon, index) => {
        const inputEl = addon.querySelector('input[type=checkbox]')
        if (inputEl && inputEl.checked && (index === 0 || index === 1 || index === 2)) {
            addon.classList.add('focus-state')
        } else {
            addon.classList.remove('focus-state')
        }
    })
}

function calculateTotalPrice() {
    let totalPrice = selectedServices.reduce((sum, price) => sum + (price || 0), 0)
    totalPrice += pricePlan
    if (isMonthly) {
        document.getElementById('total-container').innerHTML = `
        <p id="total-month">Total (per month) </p>
        <p id="total-price" class="total">+$${totalPrice}/mo</p>
       `
    } else {
        document.getElementById('total-container').innerHTML = `
        <p id="total-month">Total (per year) </p>
        <p id="total-price" class="total">+$${totalPrice}/yr</p>
       `
    }
}

changePlansAndAddon.addEventListener('click', () => {
    currentNumber = 1
    let inputEl = document.querySelectorAll('input[type=checkbox]')
    if (inputEl && inputEl.length > 0) {
        inputEl.forEach(el => {
            el.checked = false
        })
    }
    selectedAddon.innerHTML = ''
    selectedAddonOne.innerHTML = ''
    customizeAddon.innerHTML = ''
    document.getElementById('plan-name').innerHTML = ''
    document.getElementById('price').innerHTML = ''
    document.getElementById('total-container').innerHTML = ''
    serviceContainer.forEach(focus => {
        focus.classList.remove('focus-state')
    })

    update()
})

function update() {
    allSteps.forEach((steps, index) => {
        if (index === currentNumber) {
            steps.classList.add('active')
        } else {
            steps.classList.remove('active')
        }
    })

    sidebarNumber.forEach((sidebarNum, index) => {
        if (index === currentNumber) {
            sidebarNum.classList.add('sidebar-focus')
        } else {
            sidebarNum.classList.remove('sidebar-focus')
        }
    })

    if (currentNumber === 0) {
        goBack.style.display = 'none'
        formBtn.style.display = "none"
        nextBtn.style.marginTop = "50px"
    } else {
        goBack.style.display = 'block'
        nextBtn.style.marginTop = "0"

    }

    if (currentNumber === 3) {
        nextBtn.classList.add('hidden')
        confirmBtn.style.display = 'block'
    } else {
        nextBtn.classList.remove('hidden')
        confirmBtn.style.display = 'none'
    }

    if (currentNumber === 3) {
        goBack.addEventListener('click', () => {
        })
    }

}

confirmButton.addEventListener('click', () => {
    taskbar.classList.add('hidden')
    setTimeout(() => {
        document.getElementById('replace-step5').innerHTML = `
            <img src="assets/images/icon-thank-you.svg" alt="thanks-you" class="thanks-you-icon">
            <h1 class="thanks-you">Thanks you!</h1>
            <p class="confirmation-txt">Thanks for 
                confirming your subscription! We hope you have fun 
                using our platform. If you ever need support, please feel free 
                to email us at support@loremgaming.com.
            </p>
            `
    }, 1500)
})