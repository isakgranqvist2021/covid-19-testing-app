export function get_home(req, res) {
    return res.render('index/home', {});
}

export function pick_test(req, res) {
    if(req.params.test === 'rdt') {
        return res.render('index/test-rdt', {

        });
    } else if(req.params.test === 'pcr') {
        return res.render('index/test-pcr', {

        });
    } else {
        return res.redirect('/')
    }
}