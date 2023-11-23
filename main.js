const gifts = document.querySelectorAll(".gift")
const formEl = document.getElementById('form')
const plans = document.querySelectorAll(".plans")
const taskbar = document.querySelector('.taskbar')
const nameEl = document.getElementById('name-el')
const emailEl = document.getElementById('email-el')
const goBack = document.getElementById('go-back')
const nextButton = document.getElementById('next-button')
const phoneEl = document.getElementById('phone-el')
const formButton = document.getElementById('form-button')
const confirmButton = document.getElementById('confirm')
const addPrice = document.querySelectorAll(".add-on-price")
const sidebarNumb = document.querySelectorAll('.sidebar-num')
const stepsListItem = document.querySelectorAll(".steps-list-item")
const changePlansAndAdd = document.getElementById('change')
const toggleChecked = document.getElementById('toggle-checked')
const selectedAdd = document.getElementById('selected-add')
const formButtonOverlay = document.getElementById('form-button-overlay')
const customizeAdd = document.getElementById('customize-add')
const serviceContainer = document.querySelectorAll('.service-container')
const selectedAddOne = document.getElementById('selected-add-one')
const selectedAddTwo = document.getElementById('selected-add-two')
const phoneFieldNotification = document.getElementById('phone-field-notification')

let currentNum = 0
let isMonthly = true
let inputEl
let price = 0
let selectedServices = []

taskbar.classList.add('hidden')

