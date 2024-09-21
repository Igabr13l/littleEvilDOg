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

const scrape = async (user, dataClient) => {

  const { personalFormData, healthFormData, characterFormData, whsFormData } = dataClient
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

  // va hasta el formulario
  await goToForm(page, COUNTRY.GERMANY)

  try {
    await personalForm(page, personalFormData)
    await healthForm(page, healthFormData)
    await characterForm(page, characterFormData)
    await whsForm(page, whsFormData)


    await acceptTermsConditions(page)
    await payApplication(page, user)

    await new Promise((resolve) => setTimeout(resolve, 15000));

    await browser.close();

    // Terminar el proceso hijo


  } catch (error) {
    console.error(error)
    await browser.close();
  }
}

module.exports = { scrape };
