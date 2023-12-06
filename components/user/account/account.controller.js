exports.AccountPage = function (req, res, next) {
  const scripts = [];
  const styles = ["/styles/account.css"];

  res.render("user/account-page", {
    layout: "user/layouts/layout",
    title: "Account",
    scripts: scripts,
    styles: styles,
  });
};


exports.AddressPage = function (req, res, next) {
  const scripts = [];
  const styles = ["/styles/account.css"];

  res.render("user/address-page", {
    layout: "user/layouts/layout",
    title: "Addresses",
    scripts: scripts,
    styles: styles,
  });
};