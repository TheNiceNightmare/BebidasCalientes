const HttpError = require('../models/http-error');
const uuid = require('uuid');

let CONSULTAR_BEBIDASC = [
    {
        id: "p1",
        title: "Café",
        creator: "u1"
    },
    {
        id: "p2",
        title: "Chocolate cáliente",
        creator: "u1"
    },
    {
        id: "p3",
        title: "Té de jengibre",
        creator: "u2"
    }
    ]
    
const getAllBebidasC = (req, res, next)=>{
    res.json({bebidasC : CONSULTAR_BEBIDASC});
};



const getBebidasById = (req, res, next) => {    
    const bebida = CONSULTAR_BEBIDASC.find(b => {
        return b.id === req.params.pid;
    });
    if (!bebida){        
        const error = new Error(' La Bebida caliente no existe para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({bebida});
    }    
};

const getBebidaCByUsers = (req, res, next)=>{
    const bebidasC = CONSULTAR_BEBIDASC.find(b => {
        return b.creator === req.params.uid
    });    

    if (!bebidasC){
        const error = new HttpError('La bebida Caliente no existe para el id de usuario especificado', 404);
        throw error;
    }

    res.json({bebidasC});
};

const GuardarBebidac = (req, res, next)=>{
    const {title, creator} = req.body;
    const createdBebida = {
        id: uuid.v4(),
        title,
        creator
    };
    CONSULTAR_BEBIDASC.push(createdBebida);
    res.status(201).json({bebidaC:createdBebida});
};

const updateBebidasC = (req, res, next) =>{
    const { title }  = req.body;
    const bebidaCId = req.params.pid;

    const updatedBebidaC = {... CONSULTAR_BEBIDASC.find(b => b.id === bebidaCId)};
    const BebidaCIndex = CONSULTAR_BEBIDASC.findIndex(b => b.id === bebidaCId);

    updatedBebidaC.title = title;

    CONSULTAR_BEBIDASC[BebidaCIndex] = updatedBebidaC;

    res.status(200).json({bebidaC: updatedBebidaC});
};

const deleteBebidaC = (req, res, next) => {
    const BebidaCId = req.params.pid;
    CONSULTAR_BEBIDASC = CONSULTAR_BEBIDASC.filter(b => b.id !== BebidaCId)
    res.status(200).json({message: 'Bebida caliente borrada'});
};
exports.getAllBebidasC= getAllBebidasC; //
exports.getBebidasById= getBebidasById;
exports.getBebidaCByUsers= getBebidaCByUsers;
exports.GuardarBebidac = GuardarBebidac;
exports.updateBebidasC=updateBebidasC;
exports.deleteBebidaCredit= deleteBebidaC;