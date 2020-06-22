let connection = require('../config/db');
let moment = require('../config/moment');
class Ecole{

    constructor(row){
        this.row= row
    }
    get idEcole(){
        return this.row.idEcole
    }

    get nomEcole(){
        return this.row.nomEcole
    }

    get categorieEcole(){
        return this.row.categorieEcole
    }

    get communeEcole(){
        return this.row.communeEcole
    }

    get quartierEcole(){
        return this.row.quartierEcole
    }

    get avenueEcole(){
        return this.row.avenueEcole 
    }

    get numeroEcole(){
        return this.row.numeroEcole
    }

    get logoEcole(){
       return this.row.logoEcole 
    }

    get dateEcole(){
       return moment(this.row.dateEcole) 
    }

    static ajouter(nomEcole, categorieEcole, communeEcole, quartierEcole, avenueEcole, numeroEcole, logoEcole, cb){
        connection.query('INSERT INTO ecoles SET nomEcole = ?, categorieEcole =?, communeEcole =?, quartierEcole =?,avenueEcole =?,numeroEcole =?, logoEcole = ?,dateEcole=?', [nomEcole,categorieEcole,communeEcole,quartierEcole,avenueEcole,numeroEcole,logoEcole, new Date()],(err,result) =>{
            if(err) throw err 
            cb(result)
        })
    }


    static afficher (cb){
        connection.query('SELECT * FROM ecoles ORDER BY idEcole', (err, rows) =>{
            if (err) throw err
            cb(rows.map((row)=>new Ecole(row)))
        })
    }



    static supprimer(idEcole,cb){
        connection.query('DELETE FROM ecoles WHERE idEcole =?',[idEcole],(err,result)=>{
            if(err) throw err
            cb(result) 
        })
    }



    static modifier(idEcole,nomEcole, categorieEcole, communeEcole, quartierEcole, avenueEcole, numeroEcole, logoEcole, cb){
        connection.query('UPDATE ecoles SET nomEcole = ?, categorieEcole =?, communeEcole =?, quartierEcole =?,avenueEcole =?,numeroEcole =?, logoEcole = ? Where idEcole=?', [nomEcole,categorieEcole,communeEcole,quartierEcole,avenueEcole,numeroEcole,logoEcole,idEcole],(err,result) =>{
            if(err) throw err
            cb(result)
        })
    }



}
module.exports = Ecole