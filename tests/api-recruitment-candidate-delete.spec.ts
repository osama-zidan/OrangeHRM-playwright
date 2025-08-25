import { test, expect } from '@playwright/test';
import { LoginPage } from '../Page/LoginPage';

test.describe('OrangeHRM Recruitment API Tests', () => {
  test('should login and delete a candidate using API', async ({ page, request }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await expect(page).toHaveTitle(/OrangeHRM/);

    await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/.*dashboard/);

    const cookies = await page.context().cookies();
    const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

    console.log('Successfully logged in and obtained session cookies');

    const getCandidatesResponse = await request.get(
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC',
      {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
          'Connection': 'keep-alive',
          'Pragma': 'no-cache',
          'Referer': 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
          'Cookie': cookieHeader
        }
      }
    );

    expect(getCandidatesResponse.status()).toBe(200);
    const candidatesData = await getCandidatesResponse.json();
    console.log(`Retrieved ${candidatesData.data?.length || 0} candidates`);

    if (!candidatesData.data || candidatesData.data.length === 0) {
      console.log('No candidates found to delete');
      return;
    }

    const candidateToDelete = candidatesData.data[0];
    const candidateId = candidateToDelete.id;
    const candidateName = `${candidateToDelete.firstName} ${candidateToDelete.lastName}`;

    console.log(`Deleting candidate: ${candidateName} (ID: ${candidateId})`);

    const deleteCandidateResponse = await request.delete(
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates',
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
          'Origin': 'https://opensource-demo.orangehrmlive.com',
          'Pragma': 'no-cache',
          'Referer': 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
          'Cookie': cookieHeader
        },
        data: {
          ids: [candidateId]
        }
      }
    );

    expect(deleteCandidateResponse.status()).toBe(200);
    const deleteResponse = await deleteCandidateResponse.json();
    console.log('Delete response:', deleteResponse);

    expect(deleteResponse).toHaveProperty('data');
    console.log(`Successfully deleted candidate: ${candidateName} (ID: ${candidateId})`);

    const verifyDeletionResponse = await request.get(
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC',
      {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
          'Connection': 'keep-alive',
          'Pragma': 'no-cache',
          'Referer': 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
          'Cookie': cookieHeader
        }
      }
    );

    expect(verifyDeletionResponse.status()).toBe(200);
    const updatedCandidatesData = await verifyDeletionResponse.json();
    
    const deletedCandidateStillExists = updatedCandidatesData.data?.some(
      (candidate: any) => candidate.id === candidateId
    );
    
    expect(deletedCandidateStillExists).toBeFalsy();
    console.log(`Verified that candidate ${candidateName} (ID: ${candidateId}) was successfully deleted`);
  });
}); 