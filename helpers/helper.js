async function getActivateLink(mailslurp, inbox) {
    const email = await mailslurp.waitForLatestEmail(inbox.id);
    const linkResult = await mailslurp.emailController.getEmailLinks({ emailId: email.id });
    return await linkResult.links[0];
}

module.exports = { getActivateLink };