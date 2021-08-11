export function get_home(req, res) {
    return res.render('index/home', {});
}

export function pick_test(req, res) {
    if(!['rdt', 'pcr'].includes(req.params.test)) {
        return res.redirect('/');
    }

    return res.render('index/test-' + req.params.test, {

    });
}