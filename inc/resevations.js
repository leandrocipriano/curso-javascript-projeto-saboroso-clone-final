var conn = require("./db");

module.exports = {

    render(req, res, results, error, success){

        res.render('reservations', {
            title: 'Reserva - Restaurante Saboroso!',
            background:'images/img_bg_2.jpg',
            greeting:'Reserve uma Mesa!',
            menus: results,
            isHome: false,
            body: req.body,
            error,
            success
        });

    },

    save(fields){

        return new Promise((resolve, reject) => {

            let date = fields.date.split('/');            
            date = `${date[2]}-${date[1]}-${date[0]}`

            conn.query(`
                INSERT INTO tb_reservations (name, email, people, date, time)
                VALUES (?, ?, ?, ?, ?)
            `, [
                fields.name,
                fields.email,
                fields.people,
                date,
                fields.time
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