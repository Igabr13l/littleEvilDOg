const personalDetailsForm = async (page, personalDetailsFormData) => {
  await page.evaluate((personalDetailsFormData) => {
    //Personal
    document.getElementById('ContentPlaceHolder1_personDetails_familyNameTextBox').value = personalDetailsFormData.familyName
    document.getElementById('ContentPlaceHolder1_personDetails_givenName1Textbox').value = personalDetailsFormData.givenName1
    document.getElementById('ContentPlaceHolder1_personDetails_givenName2Textbox').value = personalDetailsFormData.givenName2
    document.getElementById('ContentPlaceHolder1_personDetails_givenName3Textbox').value = personalDetailsFormData.givenName3
    document.getElementById('ContentPlaceHolder1_personDetails_otherNamesTextBox').value = personalDetailsFormData.otherNames
    //Adress
    document.getElementById('ContentPlaceHolder1_addressContactDetails_address_streetNumberTextbox').value = personalDetailsFormData.streetNumber
    document.getElementById('ContentPlaceHolder1_addressContactDetails_address_address1TextBox').value = personalDetailsFormData.streetName
    document.getElementById('ContentPlaceHolder1_addressContactDetails_address_suburbTextBox').value = personalDetailsFormData.suburb
    document.getElementById('ContentPlaceHolder1_addressContactDetails_address_cityTextBox').value = personalDetailsFormData.city
    document.getElementById('ContentPlaceHolder1_addressContactDetails_address_provinceStateTextBox').value = personalDetailsFormData.province_state
    document.getElementById('ContentPlaceHolder1_addressContactDetails_address_postalCodeTextBox').value = personalDetailsFormData.pin_zipCode
    //Contact
    document.getElementById('ContentPlaceHolder1_addressContactDetails_contactDetails_phoneNumberTextBox').value = personalDetailsFormData.phoneDayTime
    document.getElementById('ContentPlaceHolder1_addressContactDetails_contactDetails_phoneNumberNightTextBox').value = personalDetailsFormData.phoneNightTime
    document.getElementById('ContentPlaceHolder1_addressContactDetails_contactDetails_phoneNumberMobileTextBox').value = personalDetailsFormData.mobile
    document.getElementById('ContentPlaceHolder1_addressContactDetails_contactDetails_faxNumberTextbox').value = personalDetailsFormData.fax
    document.getElementById('ContentPlaceHolder1_addressContactDetails_contactDetails_emailAddressTextBox').value = personalDetailsFormData.email


    const dateInput = document.querySelector('#ContentPlaceHolder1_personDetails_dateOfBirthDatePicker_DatePicker');

    // Asigna el valor de la fecha en el formato "3 September, 1993"
    dateInput.value = personalDetailsFormData.dateOfBirth;

    // Dispara el evento 'change' para actualizar cualquier lógica dependiente de la fecha
    const event = new Event('change', { bubbles: true });
    dateInput.dispatchEvent(event);

    return true
  }, personalDetailsFormData)

  await page.select('#ContentPlaceHolder1_personDetails_titleDropDownList', personalDetailsFormData.preferedTitle);
  await page.select('#ContentPlaceHolder1_personDetails_genderDropDownList', personalDetailsFormData.gender);
  await page.select('#ContentPlaceHolder1_personDetails_CountryDropDownList', personalDetailsFormData.countryOfBirth);
  //adress
  await page.select('#ContentPlaceHolder1_addressContactDetails_address_countryDropDownList', personalDetailsFormData.country);
  //contact details
  await page.select('#ContentPlaceHolder1_hasAgent_representedByAgentDropdownlist', personalDetailsFormData.representedByInmigrationAgent);
  await page.select('#ContentPlaceHolder1_communicationMethod_communicationMethodDropDownList', personalDetailsFormData.communicationMethod);
  await page.select('#ContentPlaceHolder1_hasCreditCard_hasCreditCardDropDownlist', personalDetailsFormData.hasCreditCard);

  console.log('personal form completado')
  await page.locator('input[id="ContentPlaceHolder1_wizardPageFooter_wizardPageNavigator_nextImageButton"]').click();
}

const identificationForm = async (page, identificationFormData) => {
  await page.evaluate((identificationFormData) => {
    //Personal
    document.getElementById('ContentPlaceHolder1_identification_passportNumberTextBox').value = identificationFormData.passportNumber
    document.getElementById('ContentPlaceHolder1_identification_confirmPassportNumberTextBox').value = identificationFormData.passportNumber


    const dateInput = document.querySelector('#ContentPlaceHolder1_identification_passportExpiryDateDatePicker_DatePicker');

    // Asigna el valor de la fecha en el formato "3 September, 1993"
    dateInput.value = identificationFormData.passportExpirationDate;

    // Dispara el evento 'change' para actualizar cualquier lógica dependiente de la fecha
    const event = new Event('change', { bubbles: true });
    dateInput.dispatchEvent(event);

    const dateInput2 = document.querySelector('#ContentPlaceHolder1_identification_otherIssueDateDatePicker_DatePicker');

    // Asigna el valor de la fecha en el formato "3 September, 1993"
    dateInput2.value = identificationFormData.dateDocumentIssued;

    // Dispara el evento 'change' para actualizar cualquier lógica dependiente de la fecha
    const event2 = new Event('change', { bubbles: true });
    dateInput.dispatchEvent(event2);


    const dateInput3 = document.querySelector('#ContentPlaceHolder1_identification_otherExpiryDateDatePicker_DatePicker');

    // Asigna el valor de la fecha en el formato "3 September, 1993"
    dateInput3.value = identificationFormData.expireDateDocument;

    // Dispara el evento 'change' para actualizar cualquier lógica dependiente de la fecha
    const event3 = new Event('change', { bubbles: true });
    dateInput.dispatchEvent(event3);
    return true
  }, identificationFormData)

  await page.select('#ContentPlaceHolder1_identification_otherIdentificationDropdownlist', identificationFormData.otherIdetinficationType);
  await page.locator('input[id="ContentPlaceHolder1_wizardPageFooter_wizardPageNavigator_nextImageButton"]').click();
}
const visaDetailsForm = async (page, visaDetailsFormData) => {
  await page.evaluate((visaDetailsFormData) => {
    const dateInput = document.querySelector('#ContentPlaceHolder1_permitDetails_arrivalDateDatePicker_DatePicker');

    // Asigna el valor de la fecha en el formato "3 September, 1993"
    dateInput.value = visaDetailsFormData.arrivalDate;

    // Dispara el evento 'change' para actualizar cualquier lógica dependiente de la fecha
    const event = new Event('change', { bubbles: true });
    dateInput.dispatchEvent(event);

    const dateInput2 = document.querySelector('#ContentPlaceHolder1_permitDetails_expiryDateDatePicker_DatePicker');

    // Asigna el valor de la fecha en el formato "3 September, 1993"
    dateInput2.value = visaDetailsFormData.expiryDate;

    // Dispara el evento 'change' para actualizar cualquier lógica dependiente de la fecha
    const event2 = new Event('change', { bubbles: true });
    dateInput.dispatchEvent(event2);

    return true
  }, visaDetailsFormData)

  await page.select('#ContentPlaceHolder1_permitDetails_permitTypeDropDownList', visaDetailsFormData.permitType);

  await page.locator('input[id="ContentPlaceHolder1_wizardPageFooter_wizardPageNavigator_nextImageButton"]').click();
}

const ocupationDetailsForm = async (page, ocupationDetailsFormData) => {
  await page.type('input[id="ContentPlaceHolder1_generalPersonal_industryControl_optionListSearch_SearchStringTextBox"]', ocupationDetailsFormData.industryActivity)
  await page.locator('input[id="ContentPlaceHolder1_generalPersonal_industryControl_optionListSearch_SearchImageButton"]').click()

  await existCaptcha(page, 'industryInput')
  await page.locator('input[id="ContentPlaceHolder1_generalPersonal_industryControl_optionListSearch_SearchResultRepeater_optionDescriptionButton_0"]').click()



  await existCaptcha(page, 'occupationInput')
  await page.type('input[id="ContentPlaceHolder1_generalPersonal_occupationControl_optionListSearch_SearchStringTextBox"]', ocupationDetailsFormData.occupationWork)
  await page.locator('input[id="ContentPlaceHolder1_generalPersonal_occupationControl_optionListSearch_SearchImageButton"]').click()

  await existCaptcha(page, 'occupationInput')
  await page.locator('input[id="ContentPlaceHolder1_generalPersonal_occupationControl_optionListSearch_SearchResultRepeater_optionDescriptionButton_6"]').click()



  await existCaptcha(page, 'ocupationDetailsForm')
  await page.locator('input[id="ContentPlaceHolder1_wizardPageFooter_wizardPageNavigator_nextImageButton"]').click();
}

const personalForm = async (page, data) => {
  const { personalDetailsFormData, identificationFormData, ocupationDetailsFormData, visaDetailsFormData } = data
  await existCaptcha(page, 'personalForm')
  await personalDetailsForm(page, personalDetailsFormData)
  await existCaptcha(page, 'identificationForm')
  await identificationForm(page, identificationFormData)
  await existCaptcha(page, 'visaDetailsForm')
  await visaDetailsForm(page, visaDetailsFormData)
  await existCaptcha(page, 'ocupationDetailsForm')
  await ocupationDetailsForm(page, ocupationDetailsFormData)
}

const healthForm = async (page, healthFormData) => {
  await existCaptcha(page, 'healthForm')

  await page.select('#ContentPlaceHolder1_medicalConditions_renalDialysisDropDownList', healthFormData.renalDialysis);
  await page.select('#ContentPlaceHolder1_medicalConditions_tuberculosisDropDownList', healthFormData.tuberculosis);

  await page.select('#ContentPlaceHolder1_medicalConditions_cancerDropDownList', healthFormData.cancer);
  await page.select('#ContentPlaceHolder1_medicalConditions_heartDiseaseDropDownList', healthFormData.heartDisease);
  await page.select('#ContentPlaceHolder1_medicalConditions_disabilityDropDownList', healthFormData.disability);

  await page.select('#ContentPlaceHolder1_medicalConditions_hospitalisationDropDownList', healthFormData.hospitalisation);
  await page.select('#ContentPlaceHolder1_medicalConditions_residentailCareDropDownList', healthFormData.residentailCare);

  await page.select('#ContentPlaceHolder1_medicalConditions_tbRiskDropDownList', healthFormData.tbRisk);

  if (healthFormData?.pregnancy) {
    await page.select('#ContentPlaceHolder1_medicalConditions_pregnancy_pregnancyStatusDropDownList', healthFormData.tbRisk);
  }
  await page.locator('input[id="ContentPlaceHolder1_wizardPageFooter_wizardPageNavigator_nextImageButton"]').click();
}

const characterForm = async (page, characterFormData) => {
  await existCaptcha(page, 'characterForm')

  await page.select('#ContentPlaceHolder1_character_imprisonment5YearsDropDownList', characterFormData.imprisonment5Years);
  await page.select('#ContentPlaceHolder1_character_imprisonment12MonthsDropDownList', characterFormData.imprisonment12Months);
  await page.select('#ContentPlaceHolder1_character_deportedDropDownList', characterFormData.deported);
  await page.select('#ContentPlaceHolder1_character_chargedDropDownList', characterFormData.charged);
  await page.select('#ContentPlaceHolder1_character_convictedDropDownList', characterFormData.convicted);
  await page.select('#ContentPlaceHolder1_character_underInvestigationDropDownList', characterFormData.underInvestigation);
  await page.select('#ContentPlaceHolder1_character_excludedDropDownList', characterFormData.excluded);
  await page.select('#ContentPlaceHolder1_character_removedDropDownList', characterFormData.removed);

  await page.locator('input[id="ContentPlaceHolder1_wizardPageFooter_wizardPageNavigator_nextImageButton"]').click();
}

const whsForm = async (page, whsFormData) => {
  await existCaptcha(page, 'whsForm')

  await page.select('#ContentPlaceHolder1_onshoreDetails_commonWHSQuestions_previousWhsPermitVisaDropDownList', whsFormData.previousWhsPermitVisa);
  await page.select('#ContentPlaceHolder1_onshoreDetails_commonWHSQuestions_sufficientFundsHolidayDropDownList', whsFormData.sufficientFundsHoliday);
  // await page.select('#ContentPlaceHolder1_offshoreDetails_beenToNzDropDownList', whsFormData.beenToNz);
  await page.select('#ContentPlaceHolder1_onshoreDetails_requirementsQuestions_sufficientFundsOnwardTicketDropDownList', whsFormData.sufficientFundsOnwardTicket);
  await page.select('#ContentPlaceHolder1_onshoreDetails_requirementsQuestions_readRequirementsDropDownList', whsFormData.readRequirements);

  /* await page.evaluate((whsFormData) => {
    const dateInput = document.querySelector('#ContentPlaceHolder1_offshoreDetails_intendedTravelDateDatePicker_DatePicker');

    // Asigna el valor de la fecha en el formato "3 September, 1993"
    dateInput.value = whsFormData.intendedTravelDate;

    // Dispara el evento 'change' para actualizar cualquier lógica dependiente de la fecha
    const event = new Event('change', { bubbles: true });
    dateInput.dispatchEvent(event);


    const dateInputTwo = document.querySelector('#ContentPlaceHolder1_offshoreDetails_whenInNZDatePicker_DatePicker');

    // Asigna el valor de la fecha en el formato "3 September, 1993"
    dateInputTwo.value = whsFormData.whenInNZDate;

    // Dispara el evento 'change' para actualizar cualquier lógica dependiente de la fecha
    const eventTwo = new Event('change', { bubbles: true });
    dateInput.dispatchEvent(eventTwo);
  }, whsFormData); */

  await page.locator('input[id="ContentPlaceHolder1_wizardPageFooter_wizardPageNavigator_validateButton"]').click();
}

const acceptTermsConditions = async (page) => {
  await existCaptcha(page, 'submitAplication')

  await page.evaluate(() => {
    document.querySelector('#ContentPlaceHolder1_wizardPageHeader_submitSuperLink').click();
  });

  /*  await existCaptcha(page, 'acceptTermsConditions')
  */
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  await page.evaluate(() => {
    document.querySelector('#ContentPlaceHolder1_falseStatementCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_notesCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_circumstancesCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_warrantsCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_informationCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_healthCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_adviceCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_registrationCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_entitlementCheckbox').click();
    document.querySelector('#ContentPlaceHolder1_permitExpiryCheckBox').click();
    document.querySelector('#ContentPlaceHolder1_medicalInsuranceCheckBox').click();
  });

  const { solved, error } = await page.solveRecaptchas();

  if (solved) {
    console.log('Captcha solved')
    await page.locator('input[id="ContentPlaceHolder1_submitImageButton"]').click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
  }
  if (error) {
    console.log('error catchap')
    throw new Error('exist captcha when ' + 'acceptTermsConditions')
  }

  console.log('continue')
}

const payApplication = async (page, creditCardData) => {

  await page.evaluate(() => {
    document.querySelector('#ContentPlaceHolder1_payAnchor').click();
  });
  await page.waitForNavigation({ waitUntil: 'networkidle0' })

  await page.evaluate(() => {
    document.querySelector('#ContentPlaceHolder1_onlinePaymentAnchor2').click();
  });
  await existCaptcha(page, 'payApplication')

  await page.evaluate((creditCardData) => {
    //Personal
    document.getElementById('_ctl0_ContentPlaceHolder1_payerNameTextBox').value = creditCardData.creditCardName

    return true
  }, creditCardData)

  await page.locator('input[id="_ctl0_ContentPlaceHolder1_okButton"]').click();

  await existCaptcha(page, 'payApplication')

  await page.evaluate((creditCardData) => {
    //Personal
    document.getElementById('cardnumber').value = creditCardData.creditCardNumber
    document.getElementById('cardverificationcode').value = creditCardData.creditCardCVC
    document.getElementById('cardholder').value = creditCardData.creditCardName
    document.getElementById('expirydate').value = creditCardData.creditCardExpiryDate
    return true
  }, creditCardData)

  await page.click('button.payment-button');

  await new Promise(resolve => setTimeout(resolve, 300000));
  await page.screenshot({ path: 'screenshot.png' });
  return 'ok'
}

const existCaptcha = async (page, msg) => {
  console.log('validador de captcha')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  const exist = await page.evaluate(() => !!document.getElementById('ContentPlaceHolder1_preSubmitPanel'))

  if (exist) {
    console.log('exist captcha')
    const { solved, error } = await page.solveRecaptchas();
    if (solved) {
      console.log('Captcha solved')
      await page.locator('input[id="ContentPlaceHolder1_submitImageButton"]').click();
      await page.waitForNavigation({ waitUntil: 'networkidle0' })
    }
    if (error) {
      console.log('error catchap')
      throw new Error('exist captcha when ' + msg)
    }
  }
  console.log('continue')
}


module.exports = {
  personalForm,
  healthForm,
  characterForm,
  whsForm,
  acceptTermsConditions,
  payApplication,
  existCaptcha
}