exports.LoginPage = function (req, res, next) {
    const scripts = ["/scripts/login.js"];
    const styles = ["/styles/login.css"];
  
    res.render("user/login-page", {
      layout: "user/layouts/layout",
      title: "Login",
      scripts: scripts,
      styles: styles,
    });
};

exports.ForgetPasswordPage = function(req, res, next) {
  const scripts = ["/scripts/forget-password.js"];
  const styles = ["/styles/forget-password.css"];
  
  res.render("user/forget-password-page", {
    layout: "user/layouts/layout",
    title: "Forget password",
    scripts: scripts,
    styles: styles,
  });
}