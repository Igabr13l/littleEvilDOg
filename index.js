const { scrape } = require('./src/index');
const { GENDER_OPTIONS, PREFERED_TITLE_OPTIONS, COUNTRY_BIRTH_OPTIONS, COUNTRY_ADDRESS_OPTIONS, NO_YES_OPTIONS, COMUNICATION_METHOD_OPTIONS, OTHER_IDENTIFICATION_TYPE_OPTIONS } = require('./constants/index')

const personalFormData = {
  personalDetailsFormData: {
    familyName: 'Gabriel',
    givenName1: 'Ivan',
    givenName2: 'Gabriel',
    givenName3: 'Ivan',
    otherNames: 'Gabriel',
    preferedTitle: PREFERED_TITLE_OPTIONS.MR, // Mr
    /* otherTitle: 'Gabriel', */
    gender: GENDER_OPTIONS.MALE,
    dateOfBirth: '3 September, 1999',
    countryOfBirth: COUNTRY_BIRTH_OPTIONS.ARGENTINA, // Argentina

    streetNumber: '1234',
    streetName: 'calle',
    suburb: 'flowers',
    city: 'buenos aires',
    province_state: 'buenos aires',
    pin_zipCode: 'CF1423',
    country: COUNTRY_ADDRESS_OPTIONS.ARGENTINA, // Argentina

    phoneDayTime: '333',
    phoneNightTime: '333',
    mobile: '44',
    fax: '333',
    email: 'ivangabriel.2048@gmail.com',
    representedByInmigrationAgent: 'No',
    communicationMethod: COMUNICATION_METHOD_OPTIONS.EMAIL,
    hasCreditCard: NO_YES_OPTIONS.YES
  },
  identificationFormData: {
    passportNumber: '123456789',
    /* passportNumberReEnter: '123456789', */// no va porque se repite
    passportExpirationDate: '3 September, 2030',

    otherIdetinficationType: OTHER_IDENTIFICATION_TYPE_OPTIONS.NATIONAL_ID, // DNI
    dateDocumentIssued: '3 September, 2020',
    expireDateDocument: '3 September, 2030',
  },
  ocupationDetailsFormData: {
    industryActivity: 'agriculture', // Agriculture, Forestry and Fishing
    occupationWork: 'farmer', // Aquaculture Farmer
  }
}

const healthFormData = {
  renalDialysis: NO_YES_OPTIONS.NO,
  tuberculosis: NO_YES_OPTIONS.NO,

  cancer: NO_YES_OPTIONS.NO,
  heartDisease: NO_YES_OPTIONS.NO,
  disability: NO_YES_OPTIONS.NO,

  hospitalisation: NO_YES_OPTIONS.NO,
  residentailCare: NO_YES_OPTIONS.NO,

  tbRisk: NO_YES_OPTIONS.NO,
}

const characterFormData = {
  imprisonment5Years: NO_YES_OPTIONS.NO,
  imprisonment12Months: NO_YES_OPTIONS.NO,
  deported: NO_YES_OPTIONS.NO,

  charged: NO_YES_OPTIONS.NO,
  convicted: NO_YES_OPTIONS.NO,
  underInvestigation: NO_YES_OPTIONS.NO,

  excluded: NO_YES_OPTIONS.NO,
  removed: NO_YES_OPTIONS.NO,
}

const whsFormData = {
  previousWhsPermitVisa: NO_YES_OPTIONS.NO,
  sufficientFundsHoliday: NO_YES_OPTIONS.YES,
  intendedTravelDate: '1 November, 2024',
  beenToNz: NO_YES_OPTIONS.YES,
  whenInNZDate: '19 September, 2024',
  sufficientFundsOnwardTicket: NO_YES_OPTIONS.YES,
  readRequirements: NO_YES_OPTIONS.YES,
}

const user = {
  username: 'ivangabriel2048',
  password: '204824a132508796'
}

const dataClient = {
  personalFormData,
  healthFormData,
  characterFormData,
  whsFormData
}

scrape(user, dataClient)
