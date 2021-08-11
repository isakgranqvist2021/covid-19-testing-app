export default async function logout(req, res) {
    delete req.session.uid;
    return res.redirect("/auth/login");
}
