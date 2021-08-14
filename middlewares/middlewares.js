export function logs(req, res, next) {
    console.log(req.method, req.originalUrl);

    return next();
}

export function alerts(req, res, next) {
    let alert = req.session.alert;
    res.locals.alert = alert;
    delete req.session.alert;
    return next();
}

export function logged_in(req, res, next) {
    console.log(req.session);

    if (!req.session.uid) return res.redirect("/auth/login");
    return next();
}

export function logged_out(req, res, next) {
    console.log(req.session);

    if (req.session.uid) return res.redirect("/admin/dashboard");
    return next();
}
