import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import styles from '../styles/InputPage.module.css';

// GLOBAL VARIABLES //
var range = 50000; // will be changed in range slider #1
var range2 = 0; // will be changed in range slider #2
var radiochoice = 20; // will be changed in radio buttons #3
var payment; // will be changed in calculatePayment function
var userName;
var userFamilyName;
var userPhoneNumber;
var userEmail;

// LOCAL STYLING //
const Styles = styled.div`

`;

// SUBMIT USER DATA TO API
const submitInput = async () => {
    const response = await fetch ('/api/mortgageCalculation.js', {
        method: 'POST',
        body: JSON.stringify({ 
            purchaseprice: range, 
            interestrate: range2, 
            period: radiochoice, 
            monthlypayment: payment, 
            name: userName, 
            familyName: userFamilyName, 
            phoneNumber: userPhoneNumber, 
            emailAddress: userEmail}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    console.log(data)
}

//CHECK IF INTEREST RATE > 0
function checkIfSelected() {
    if ((range2 !== 0) && (range2 !== 'NaN') && (radiochoice !== 0) && (radiochoice !== 'NaN')){
        document.getElementById("message").innerHTML = '';
        calculatePayment()
        return true;
    }
    else {
        document.getElementById("total").innerHTML = '';
        document.getElementById("message").innerHTML = 'Interest rate must be greater than 0.';
        return false;
    }
}

//CALCULATE PAYMENT
function calculatePayment() {
    var principal  = parseFloat(range);
    var annualInterestRate = parseFloat(range2)
    var termOfLoan = radiochoice;
    console.log( 'principal: ' + principal, 'rate: ' + annualInterestRate, 'term: ' +termOfLoan);

    var percentageRate = annualInterestRate / 1200;

    var lengthOfLoan = 12 * termOfLoan;

    var monthlyPayment = (principal * percentageRate) / (1 - (Math.pow((1 + percentageRate) , lengthOfLoan * -1)));
    payment = monthlyPayment.toFixed(2);
    console.log('payment: ' + payment);

    document.getElementById("total").innerHTML = payment;

    // return payment;
} 

// HIDE AND SHOW
function hidePage(pageName) {
    document.getElementById(pageName).style.display = 'none';
}
function showPage(pageName) {
    document.getElementById(pageName).style.display = 'block';
}

// APPLY TODAY BUTTON FUNCTION //
function applyToday() {
    if (checkIfSelected() == true) {
        
        hidePage('main')
        showPage('applyPage')
        hidePage('thankYou')
    }
}

// APPLY NOW BUTTON FUNCTION //
function confirm() {
    if (validateInput() !== false) {
        submitInput()

        hidePage('applyPage')
        hidePage('main')
        showPage('thankYou')
    }
}

// GO BACK BUTTON FUNCTION //
function goBack() {
    hidePage('applyPage')
    showPage('main')
    hidePage('thankYou')
}

// VALIDATE INPUT //
function validateInput() {
    if ((validateName() !== false) && (validateFamilyName() !== false) &&(validateEmail() !== false) && (validatePhone() !== false))
    {
        return true;
    }
    else {
        return false;
    }
}

function validateName() {
    var name = document.getElementById('name');
    var filter = /^[A-Za-z\s]+$/;

    if (!filter.test(name.value)) {
        alert('Please provide a valid name');
        name.focus;
        return false;
    }
    else {
        userName = (name.value);
    }
}

function validateFamilyName() {
    var name = document.getElementById('familyname');
    var filter = /^[A-Za-z\s]+$/;

    if (!filter.test(name.value)) {
        alert('Please provide a valid name');
        name.focus;
        return false;
    }
    else {
        userFamilyName = (name.value);
    }
}

function validateEmail() {
    var email = document.getElementById('email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
        alert('Please provide a valid email address');
        email.focus;
        return false;
    }
    else {
        userEmail = (email.value);
    }
}

function validatePhone() {  
    var pnum = document.getElementById('phone');
    var filter = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    if (!filter.test(pnum.value)) {
        alert('Please provide a valid phone number');
        pnum.focus;
        return false;
    }
    else {
        userPhoneNumber = (pnum.value);
    }
}



function formateCurrency() {
    num1 = range;
    let num1 = new Intl.NumberFormat('en-US', 
    { style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 0})
    .format(num1)
    console.log('number1: ' + num1)
    return num1;
}

// HIDE AND SHOW //
// function hideMessage() {
// 	document.getElementById("message").innerHTML = 'none';
// }
// function showMessage() {
// 	document.getElementById("message").style.display = 'block';
// }
// function hideInputPage() {
// 	document.getElementById("message").style.display = 'block';
// }
// function showInputPage() {
// 	document.getElementById("message").style.display = 'block';
// }


// INPUT PAGE FUNCTIONS //

function InputPage() {
    const [radio, setRadio] = useState('20')


    

    const handleOnChange = (e) => { 
        setRadio(e.target.value)
        radiochoice = parseInt(e.target.value);
        checkIfSelected();
    }
    
    
    return (
        <>
            <Styles>

            

    {/* MAIN PAGE */}

            

            <div id = 'main' className = {styles.main}>
                <div className = {styles.header}>
                    <img className = {styles.logo} src = "vercel.svg" alt="Logo"/> 
                </div>
                <div className = {styles.form}>
                

                    <h2 className = {styles.h2}>Get started with Digital Credit Experience</h2>
                    <p className = {styles.h8}>Qualify or apply your mortgage in minutes.</p>

                    {/* SCROLL DOWN TO SEE THE SLIDER CLASS */}
                    <Slider/>

                    {/* SCROLL DOWN TO SEE THE SECOND SLIDER CLASS */}
                    <Slider2 />

                    {/* SCROLL DOWN TO SEE RADIO CLASS */}

                    

                    <p>Period</p>  
                    <section>
                    <label for = "myRadioId" className = {styles.radio}>
                        <input 
                            className = {styles.radio__input}
                            type="radio"
                            checked = {radio === '20'}
                            id = "myRadioId"
                            value = '20'
                            onChange={handleOnChange}
                        />
                        <div className = {styles.radio__radio}></div>
                    20 Years</label> 
                    </section> 
                    <section>
                    <label for = "myRadioId2" className = {styles.radio}>
                        <input 
                            className = {styles.radio__input}
                            type="radio"
                            checked = {radio === '25'}
                            id = "myRadioId2"
                            value = '25'
                            onChange={handleOnChange}
                        />
                        <div className = {styles.radio__radio}></div>
                    25 Years</label> 
                    </section> 
                    <section>
                    <label for = "myRadioId3" className = {styles.radio}>
                        <input 
                            className = {styles.radio__input}
                            type="radio"
                            checked = {radio === '30'}
                            id = "myRadioId3"
                            value = '30'
                            onChange={handleOnChange}
                        />
                        <div className = {styles.radio__radio}></div>
                    30 Years</label> 
                    </section> 

                    <button onClick = {applyToday}> Apply Today</button>
                    <br/>
                    <br/>

                    <div id = 'total'>$0.00</div>
                    <div id = 'message'></div>

                    <br/>
                    <br/>   
                </div> 
            </div>


{/* APPLY PAGE */}

            <div id = 'applyPage' className = {styles.applyPage}>
                <div>Your Input is</div>
                <div>Purchase Price: {range}</div>
                <div>Interest Rate: {range2}</div>
                <div>Term of Payment: {radiochoice} years</div>
                <div>Total Monthly Payment: {payment} </div>

                <div>Your name: </div> <input id = 'name' type = 'text'/>
                <div>Your last name: </div> <input id = 'familyname' type = 'text'/>
                <div>Phone number: </div> <input id = 'phone' type = 'text'/>
                <div>Email: </div> <input id = 'email' type = 'text'/>

                <button onClick = {confirm}> Apply Now</button>
                <button onClick = {goBack}> Go Back</button>

            </div>

{/* THANK YOU PAGE */}

            <div id = 'thankYou' className = {styles.thankYouPage}>
                <div>Thank you! Our representative will contact you soon with more information. </div>

            </div>
      
            </Styles>
        </>
    )
}



/////// SLIDER 1 ////////
export class Slider extends React.Component {

    state = {
        value: 50000
    }

    handleOnChangeCurrency = (e) => { 
        num = e.target.value
        range = num;

        let num = new Intl.NumberFormat('en-US', 
        { style: 'currency', 
        currency: 'USD', 
        minimumFractionDigits: 0})
        .format(num)
        this.setState ({ value: num})
        

        checkIfSelected();
        
    }

    render () {
        return (
            <Styles>
                <p>Purchase Price</p>
                <div className = "value">
                    {(this.state.value).toLocaleString('en-US', 
                    { style: 'currency', 
                    currency: 'USD', 
                    minimumFractionDigits: 0})}
                </div>
                <div className = {styles.slidercontainer}>
                    <input 
                        className = {styles.slider}
                        id="myRange"
                        type="range"
                        min = {50000}
                        max = {2500000}
                        step = {10000}
                        defaultValue = {this.state.value}
                        onChange={this.handleOnChangeCurrency}
                    />
                </div>

                
            </Styles>
        )
    }
}



/////// SLIDER 2 ////////
export class Slider2 extends React.Component {

    state = {
        value: 0
    }

    handleOnChangePercent = (e) => { 
        num = e.target.value
        let num = new Intl.NumberFormat('default', {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          }).format(num / 100);
        this.setState ({ value: num})
        range2 = num;
        checkIfSelected();
    }

    submitInput = async () => {
        const response = await fetch ('/api/mortgageCalculation', {
            method: 'POST',
            body: JSON.stringify({ principal, annualInterestRate, termOfLoan, payment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    }

    render () {
        return (
            <Styles>
                <p>Interest Rate</p>
                <div className = "value">
                    {(this.state.value).toLocaleString(undefined,
                    {style: 'percent', minimumFractionDigits:1})}
                </div>
                <input 
                    className ="slider"
                    type="range"
                    min = {0}
                    max = {25}
                    step = {.25}
                    defaultValue = {this.state.value}
                    onChange={(this.handleOnChangePercent)}
                />
            </Styles>
        )
    }
}

export default InputPage