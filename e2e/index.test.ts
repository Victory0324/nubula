const host =
  process.env.E2E_HOST || 'https://nebula-git-dev-pixelynx.vercel.app';

const email = process.env.E2E_EMAIL;
const password = process.env.E2E_PASSWORD;

// if (!email) {
//   throw new Error('E2E_EMAIL is required');
// }

// if (!password) {
//   throw new Error('E2E_PASSWORD is required');
// }

describe('e2e', () => {
  beforeAll(async () => {
    await page.goto(host);
  });

  it('should be titled "Korus"', async () => {
    await expect(page.title()).resolves.toMatch('KORUS');
  });

  // it('should be able to login', async () => {
  //   await page.type('input[type=email]', email);
  //   await page.type('input[type=password]', password);
  // });
});
