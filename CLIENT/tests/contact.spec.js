import {test, expect} from "@playwright/test";

test("Contact form", async ({page}) => {
  await page.goto("http://localhost:5173/");
  await page
    .locator("header")
    .getByRole("button", {name: "Contactez Nous"})
    .click();
  await page.getByRole("textbox", {name: "Votre nom"}).click();
  await page.getByRole("textbox", {name: "Votre nom"}).fill("John Doe");
  await page.getByRole("textbox", {name: "Votre email"}).click();
  await page
    .getByRole("textbox", {name: "Votre email"})
    .fill("john.doe@gmail.com");
  await page.getByRole("textbox", {name: "Objet du message"}).click();
  await page
    .getByRole("textbox", {name: "Objet du message"})
    .fill("Email de test");
  await page.getByRole("textbox", {name: "Message", exact: true}).click();
  await page
    .getByRole("textbox", {name: "Message", exact: true})
    .fill("Ceci est un test");
  await page
    .getByRole("checkbox", {name: "En continuant, vous validez"})
    .check();
  await page.getByRole("button", {name: "Envoyer mon message"}).click();

  await expect(page.getByText("Message envoyé avec succès !")).toBeVisible();
});
