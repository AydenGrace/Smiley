import {test, expect} from "@playwright/test";

test("Go to Login", async ({page}) => {
  await page.goto("http://localhost:5173/");

  await page.locator("header").getByRole("link", {name: "Connexion"}).click();

  await expect(page.getByRole("heading", {name: "Bonjour !"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Se Connecter"})).toBeVisible();
});

test("Login - Bad Credentials", async ({page}) => {
  await page.goto("http://localhost:5173/");
  await page.locator("header").getByRole("button", {name: "Connexion"}).click();
  await page.getByRole("textbox", {name: "Email"}).click();
  await page.getByRole("textbox", {name: "Email"}).fill("1324567@gmail.com");
  await page.getByRole("textbox", {name: "Mot de passe"}).click();
  await page
    .getByRole("textbox", {name: "Mot de passe"})
    .fill("Adfaofhnpm<qbfui15646152#@");
  await page.getByRole("button", {name: "Se Connecter"}).click();

  await expect(page.getByText("Identifiants invalides !")).toBeVisible();
});
