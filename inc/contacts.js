var conn = require("./db");

module.exports = {

    render(req, res, results, error, success){

        res.render('contacts', {
            title: 'Contato - Restaurante Saboroso!',
            background:'images/img_bg_3.jpg',
            greeting:'Diga um oi!',
            menus: results,
            isHome: false,
            body: req.body,
            error,
            success
        });

    },

    save(fields){

        return new Promise((resolve, reject) => {

            conn.query(`
                INSERT INTO tb_contacts (name, email, message)
                VALUES (?, ?, ?)
            `, [
                fields.name,
                fields.email,
                fields.message
            ], (err, results) => {

                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}