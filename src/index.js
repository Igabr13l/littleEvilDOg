const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const { initEnv, Config } = require('docenv');
const config = require('../docenv-config.js');
const { personalForm, healthForm, characterForm, whsForm, acceptTermsConditions, payApplication } = require('./modules/formHandlers.js');
const { login, deleteForm, goToForm } = require('./modules/basicHandlers.js');

initEnv(config);

puppeteer.use(RecaptchaPlugin({
  provider: {
    id: '2captcha',
    token: Config.APIKEY_2CAPTCHA
  }
}));

const COUNTRY = {
  ARGENTINE: 1,
  GERMANY: 13,
}

// Function to wait until next Monday at 7:00 PM
const waitUntilMondayAt7PM = () => {
  return new Promise((resolve) => {
    const now = new Date();

    // Get current day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const currentDay = now.getDay();

    // Calculate the days left until the next Monday
    const daysUntilMonday = (currentDay === 1)
      ? 0 // It's Monday today
      : ((8 - currentDay) % 7); // The number of days until next Monday (modulo 7)

    // Create a date object for next Monday at 7:00 PM (or 19:00)
    const nextMonday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysUntilMonday, // Add the days needed
      19, 0, 4, 0  // Set time to 19:00:00 (7 PM)
    );

    // Calculate the difference in milliseconds
    const timeDifferenceMs = nextMonday - now;

    // Log the waiting time for information (optional)
    console.log(`Waiting until next Monday at 7:00 PM (${nextMonday})`);

    // Use setTimeout to resolve the promise after the calculated time
    setTimeout(() => {
      resolve();  // Once the time's up, resolve the promise
    }, timeDifferenceMs);
  });
}

const scrape = async (user, dataClient) => {
  let urlPayment
  const { personalFormData, healthFormData, characterFormData, whsFormData, creditCardData } = dataClient
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://onlineservices.immigration.govt.nz/?WHS");

  await page.setViewport({ width: 1080, height: 1024 });

  await login(page, user)

  try {
    // borra el formulario anterior
    await deleteForm(page)
  } catch (error) {
    console.error(error)
  }

  await waitUntilMondayAt7PM()

  // va hasta el formulario
  await goToForm(page, COUNTRY.GERMANY)

  try {
    await personalForm(page, personalFormData)
    await healthForm(page, healthFormData)
    await characterForm(page, characterFormData)
    await whsForm(page, whsFormData)


    await acceptTermsConditions(page)
    urlPayment = await payApplication(page, creditCardData)

    await browser.close();

    // Terminar el proceso hijo
    return { urlPayment, user }

  } catch (error) {
    console.error(error)
    await browser.close();
    return { error: error.message }
  }
}

module.exports = { scrape };
