const login = async (page, user) => {
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' })

  //login
  await page.type('input[name="username"]', user.username)
  await page.type('input[name="password"]', user.password)

  await page.locator('input[type="submit"]').click();

  // finish login
}

const deleteForm = async (page) => {
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  const exist = await page.evaluate(() => !!document.getElementById('ContentPlaceHolder1_existingApplicationPanel'))
  if (exist) {
    await page.locator(`#ContentPlaceHolder1_applicationList_applicationsDataGrid_deleteHyperlink_${0}`).click()
    await page.locator('#ContentPlaceHolder1_okDeleteButton').click()
    await page.locator('#ContentPlaceHolder1_homePageUrl').click()
    console.log('borrado anterior formulario')
  }
  console.log('existe formulario :', exist)
}

const goToForm = async (page, country) => {
  const countryButton = `#ContentPlaceHolder1_countryRepeater_countryDivFooter_${country}`

  await page.locator(countryButton).click()

  await page.locator('input[type=submit]').click()
}

module.exports = {
  login,
  deleteForm,
  goToForm
}