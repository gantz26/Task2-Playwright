async function getActivateLink(mailosaur, serverId, emailAddress) {
    const email = await mailosaur.messages.get(serverId, { sentTo: emailAddress });
    const activateLink = email.html.links[0].href;
    return activateLink;
}

module.exports = { getActivateLink };